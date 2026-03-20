/**
 * Core math functions for all GrowthKit calculator tools.
 * All calculations are client-safe (no server dependencies).
 */

import {
  LMSEntry,
  WHO_WEIGHT_FOR_AGE,
  WHO_HEIGHT_FOR_AGE,
  CDC_HEIGHT_FOR_AGE,
  CDC_WEIGHT_FOR_AGE,
  CDC_BMI_FOR_AGE,
  GROWTH_VELOCITY_NORMS,
} from './who-cdc-data'

// ─────────────────────────────────────────────────────────────
// Unit conversion helpers
// ─────────────────────────────────────────────────────────────

export function lbsToKg(lbs: number): number {
  return lbs * 0.453592
}

export function kgToLbs(kg: number): number {
  return kg * 2.20462
}

export function inchesToCm(inches: number): number {
  return inches * 2.54
}

export function cmToInches(cm: number): number {
  return cm / 2.54
}

export function feetInchesToCm(feet: number, inches: number): number {
  return inchesToCm(feet * 12 + inches)
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cmToInches(cm)
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return { feet, inches }
}

// ─────────────────────────────────────────────────────────────
// LMS interpolation
// ─────────────────────────────────────────────────────────────

/**
 * Given a sorted array of LMS entries for one sex, interpolate the L, M, S
 * values at a target age (in months) using linear interpolation.
 */
function interpolateLMS(
  entries: LMSEntry[],
  ageMonths: number,
  sex: 1 | 2
): { L: number; M: number; S: number } | null {
  const sexEntries = entries.filter((e) => e.sex === sex).sort((a, b) => a.age - b.age)
  if (sexEntries.length === 0) return null

  if (ageMonths <= sexEntries[0].age) return sexEntries[0]
  if (ageMonths >= sexEntries[sexEntries.length - 1].age) return sexEntries[sexEntries.length - 1]

  for (let i = 0; i < sexEntries.length - 1; i++) {
    const lo = sexEntries[i]
    const hi = sexEntries[i + 1]
    if (ageMonths >= lo.age && ageMonths <= hi.age) {
      const t = (ageMonths - lo.age) / (hi.age - lo.age)
      return {
        L: lo.L + t * (hi.L - lo.L),
        M: lo.M + t * (hi.M - lo.M),
        S: lo.S + t * (hi.S - lo.S),
      }
    }
  }
  return null
}

/**
 * Convert a measurement to a z-score using the LMS method.
 * z = ((X/M)^L - 1) / (L * S)  when L ≠ 0
 * z = ln(X/M) / S               when L = 0
 */
function lmsZScore(X: number, L: number, M: number, S: number): number {
  if (Math.abs(L) < 1e-6) {
    return Math.log(X / M) / S
  }
  return (Math.pow(X / M, L) - 1) / (L * S)
}

/**
 * Convert a z-score to a percentile (0–100) using the standard normal CDF.
 */
export function zScoreToPercentile(z: number): number {
  // Abramowitz and Stegun approximation for the normal CDF
  const sign = z < 0 ? -1 : 1
  const absZ = Math.abs(z)
  const t = 1 / (1 + 0.2316419 * absZ)
  const d = 0.3989423 * Math.exp((-absZ * absZ) / 2)
  const p =
    d * t * (0.3193815 + t * (-0.3565638 + t * (1.7814779 + t * (-1.8212560 + t * 1.3302744))))
  const cdf = 1 - p
  const percentile = sign >= 0 ? cdf * 100 : (1 - cdf) * 100
  return Math.max(0.1, Math.min(99.9, percentile))
}

// ─────────────────────────────────────────────────────────────
// Growth percentile calculations
// ─────────────────────────────────────────────────────────────

export interface PercentileResult {
  percentile: number
  zScore: number
  category: string
  categoryColor: string
  interpretation: string
}

export interface GrowthPercentileResult {
  heightPercentile: PercentileResult
  weightPercentile: PercentileResult
  bmiValue: number
  bmiPercentile: PercentileResult
  ageMonths: number
  heightCm: number
  weightKg: number
}

function getWeightCategory(percentile: number): { category: string; color: string; interpretation: string } {
  if (percentile < 5) return {
    category: 'Underweight',
    color: 'blue',
    interpretation: 'Below the 5th percentile. Consider discussing with your pediatrician.'
  }
  if (percentile < 85) return {
    category: 'Healthy Weight',
    color: 'green',
    interpretation: 'Within the healthy range (5th–85th percentile). Keep up the great work!'
  }
  if (percentile < 95) return {
    category: 'Overweight',
    color: 'yellow',
    interpretation: 'Between the 85th and 95th percentile. A healthy lifestyle is key.'
  }
  return {
    category: 'Obese',
    color: 'red',
    interpretation: 'At or above the 95th percentile. A pediatrician visit is recommended.'
  }
}

function getHeightCategory(percentile: number): { category: string; color: string; interpretation: string } {
  if (percentile < 3) return {
    category: 'Very Short',
    color: 'blue',
    interpretation: 'Below the 3rd percentile. A pediatrician visit is recommended.'
  }
  if (percentile < 15) return {
    category: 'Short',
    color: 'yellow',
    interpretation: 'Below average for age. Worth monitoring over time.'
  }
  if (percentile <= 85) return {
    category: 'Average Height',
    color: 'green',
    interpretation: 'Within the normal range — this is where most children fall.'
  }
  if (percentile <= 97) return {
    category: 'Tall',
    color: 'green',
    interpretation: 'Above average height for their age — often a sign of good nutrition.'
  }
  return {
    category: 'Very Tall',
    color: 'blue',
    interpretation: 'Above the 97th percentile. Usually genetic, but worth monitoring.'
  }
}

/**
 * Calculate height, weight, and BMI percentiles for a child.
 * @param ageYears - age in decimal years (e.g. 2.5 for 2 years 6 months)
 * @param sex - 1 = male, 2 = female
 * @param heightCm - height in cm
 * @param weightKg - weight in kg
 */
export function calcGrowthPercentile(
  ageYears: number,
  sex: 1 | 2,
  heightCm: number,
  weightKg: number
): GrowthPercentileResult | null {
  const ageMonths = ageYears * 12
  const isWHO = ageMonths <= 24

  const heightTable = isWHO ? WHO_HEIGHT_FOR_AGE : CDC_HEIGHT_FOR_AGE
  const weightTable = isWHO ? WHO_WEIGHT_FOR_AGE : CDC_WEIGHT_FOR_AGE

  const hLMS = interpolateLMS(heightTable, ageMonths, sex)
  const wLMS = interpolateLMS(weightTable, ageMonths, sex)

  if (!hLMS || !wLMS) return null

  const hZ = lmsZScore(heightCm, hLMS.L, hLMS.M, hLMS.S)
  const wZ = lmsZScore(weightKg, wLMS.L, wLMS.M, wLMS.S)

  const hPct = zScoreToPercentile(hZ)
  const wPct = zScoreToPercentile(wZ)

  // BMI
  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)

  const bmiLMS = ageMonths >= 24 ? interpolateLMS(CDC_BMI_FOR_AGE, ageMonths, sex) : null
  let bmiPct = 0
  let bmiZ = 0
  if (bmiLMS) {
    bmiZ = lmsZScore(bmi, bmiLMS.L, bmiLMS.M, bmiLMS.S)
    bmiPct = zScoreToPercentile(bmiZ)
  } else {
    // For infants, use a simplified WFL (weight-for-length) approximation
    bmiPct = wPct
    bmiZ = wZ
  }

  const hCat = getHeightCategory(hPct)
  const wCat = getWeightCategory(wPct)
  const bmiCat = getWeightCategory(bmiPct)

  return {
    heightPercentile: { percentile: hPct, zScore: hZ, category: hCat.category, categoryColor: hCat.color, interpretation: hCat.interpretation },
    weightPercentile: { percentile: wPct, zScore: wZ, category: wCat.category, categoryColor: wCat.color, interpretation: wCat.interpretation },
    bmiValue: bmi,
    bmiPercentile: { percentile: bmiPct, zScore: bmiZ, category: bmiCat.category, categoryColor: bmiCat.color, interpretation: bmiCat.interpretation },
    ageMonths,
    heightCm,
    weightKg,
  }
}

// ─────────────────────────────────────────────────────────────
// BMI calculations (adult)
// ─────────────────────────────────────────────────────────────

export interface AdultBMIResult {
  bmi: number
  category: string
  categoryColor: string
  interpretation: string
  healthyWeightRangeKg: { min: number; max: number }
}

export function calcAdultBMI(heightCm: number, weightKg: number): AdultBMIResult {
  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)

  let category: string
  let categoryColor: string
  let interpretation: string

  if (bmi < 18.5) {
    category = 'Underweight'
    categoryColor = 'blue'
    interpretation = 'A BMI below 18.5 may indicate insufficient nutrition. Consider consulting your doctor.'
  } else if (bmi < 25) {
    category = 'Normal Weight'
    categoryColor = 'green'
    interpretation = 'Your BMI is in the healthy range. Keep up your healthy habits!'
  } else if (bmi < 30) {
    category = 'Overweight'
    categoryColor = 'yellow'
    interpretation = 'A BMI of 25–30 is considered overweight. Small lifestyle changes can help.'
  } else if (bmi < 35) {
    category = 'Obese (Class I)'
    categoryColor = 'orange'
    interpretation = 'A BMI of 30–35 is Class I obesity. A healthcare provider can help create a plan.'
  } else if (bmi < 40) {
    category = 'Obese (Class II)'
    categoryColor = 'red'
    interpretation = 'Class II obesity. Medical guidance is strongly recommended.'
  } else {
    category = 'Obese (Class III)'
    categoryColor = 'red'
    interpretation = 'Class III (severe) obesity. Please consult a healthcare provider.'
  }

  const healthyWeightMin = 18.5 * heightM * heightM
  const healthyWeightMax = 24.9 * heightM * heightM

  return {
    bmi,
    category,
    categoryColor,
    interpretation,
    healthyWeightRangeKg: { min: healthyWeightMin, max: healthyWeightMax },
  }
}

// ─────────────────────────────────────────────────────────────
// Child height prediction
// ─────────────────────────────────────────────────────────────

export interface HeightPredictionResult {
  predictedCm: number
  rangeLowCm: number
  rangeHighCm: number
  midParentalCm: number
  method: string
}

/**
 * Predict a child's adult height using the mid-parental height method.
 * More accurate than the Khamis-Roche method when child measurements are not provided.
 * @param motherHeightCm
 * @param fatherHeightCm
 * @param sex - 1 = male, 2 = female
 */
export function predictHeightMidParental(
  motherHeightCm: number,
  fatherHeightCm: number,
  sex: 1 | 2
): HeightPredictionResult {
  const genderAdjustment = sex === 1 ? 6.5 : -6.5
  const midParental = (motherHeightCm + fatherHeightCm) / 2 + genderAdjustment

  return {
    predictedCm: midParental,
    rangeLowCm: midParental - 8.5,
    rangeHighCm: midParental + 8.5,
    midParentalCm: midParental,
    method: 'Mid-Parental Height',
  }
}

/**
 * Refined prediction when child's current measurements are available.
 * Uses a simplified Khamis-Roche-inspired approach.
 */
export function predictHeightWithChild(
  motherHeightCm: number,
  fatherHeightCm: number,
  childHeightCm: number,
  childAgeYears: number,
  sex: 1 | 2
): HeightPredictionResult {
  const midParental = predictHeightMidParental(motherHeightCm, fatherHeightCm, sex)

  // Regression blend: weight midparental more heavily for younger children,
  // current height more for older children (approaching adult height)
  const ageWeight = Math.min(childAgeYears / 18, 1)
  const midParentalWeight = 1 - ageWeight * 0.5

  // Estimate remaining growth based on CDC averages
  const remainingGrowthFactor = sex === 1
    ? Math.max(0, (18 - childAgeYears) * 2.2)
    : Math.max(0, (16 - childAgeYears) * 1.8)

  const projected = childHeightCm + remainingGrowthFactor
  const predicted = midParentalWeight * midParental.predictedCm + (1 - midParentalWeight) * projected

  return {
    predictedCm: predicted,
    rangeLowCm: predicted - 8,
    rangeHighCm: predicted + 8,
    midParentalCm: midParental.predictedCm,
    method: 'Mid-Parental Height + Current Growth',
  }
}

// ─────────────────────────────────────────────────────────────
// Growth velocity
// ─────────────────────────────────────────────────────────────

export interface GrowthVelocityResult {
  cmPerYear: number
  status: 'normal' | 'low' | 'high'
  statusLabel: string
  statusColor: string
  normalMin: number
  normalMax: number
  ageGroupLabel: string
  interpretation: string
}

export interface Measurement {
  date: string // ISO string
  heightCm: number
  ageYears?: number
}

export function calcGrowthVelocity(
  m1: Measurement,
  m2: Measurement,
  sex: 1 | 2
): GrowthVelocityResult {
  const date1 = new Date(m1.date)
  const date2 = new Date(m2.date)
  const daysDiff = Math.abs((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))
  const yearsDiff = daysDiff / 365.25

  const heightDiff = Math.abs(m2.heightCm - m1.heightCm)
  const cmPerYear = yearsDiff > 0 ? heightDiff / yearsDiff : 0

  // Use the average age to find the correct norm band
  const avgAgeMonths = ((m1.ageYears ?? 0) + (m2.ageYears ?? 0)) * 6

  const norm = GROWTH_VELOCITY_NORMS.find(
    (n) => avgAgeMonths >= n.ageMinMonths && avgAgeMonths < n.ageMaxMonths
  ) ?? GROWTH_VELOCITY_NORMS[GROWTH_VELOCITY_NORMS.length - 1]

  let status: 'normal' | 'low' | 'high'
  let statusLabel: string
  let statusColor: string
  let interpretation: string

  if (cmPerYear < norm.normalMin) {
    status = 'low'
    statusLabel = 'Below Normal'
    statusColor = 'yellow'
    interpretation = `Growth rate of ${cmPerYear.toFixed(1)} cm/year is below the expected ${norm.normalMin}–${norm.normalMax} cm/year for this age. If this persists, consult your pediatrician.`
  } else if (cmPerYear > norm.normalMax) {
    status = 'high'
    statusLabel = 'Above Normal'
    statusColor = 'blue'
    interpretation = `Growth rate of ${cmPerYear.toFixed(1)} cm/year is above the typical ${norm.normalMin}–${norm.normalMax} cm/year — this could indicate a growth spurt or (rarely) a hormonal factor.`
  } else {
    status = 'normal'
    statusLabel = 'Normal'
    statusColor = 'green'
    interpretation = `Growth rate of ${cmPerYear.toFixed(1)} cm/year is within the healthy range of ${norm.normalMin}–${norm.normalMax} cm/year for this age group.`
  }

  return {
    cmPerYear,
    status,
    statusLabel,
    statusColor,
    normalMin: norm.normalMin,
    normalMax: norm.normalMax,
    ageGroupLabel: norm.label,
    interpretation,
  }
}

// ─────────────────────────────────────────────────────────────
// Ideal weight range for children
// ─────────────────────────────────────────────────────────────

export interface IdealWeightResult {
  minKg: number
  maxKg: number
  currentStatus?: { category: string; color: string; interpretation: string }
  bmi?: number
}

/**
 * Calculate healthy weight range for a child based on the 5th–85th BMI percentile.
 */
export function calcIdealWeightChild(
  ageYears: number,
  sex: 1 | 2,
  heightCm: number,
  currentWeightKg?: number
): IdealWeightResult | null {
  const ageMonths = ageYears * 12
  if (ageMonths < 24) return null

  const bmiTable = CDC_BMI_FOR_AGE
  const lms = interpolateLMS(bmiTable, ageMonths, sex)
  if (!lms) return null

  // Invert the LMS formula to get weight from BMI percentile
  // BMI = M * (1 + L*S*z)^(1/L)  (when L ≠ 0)
  function bmiAtZScore(z: number): number {
    if (Math.abs(lms!.L) < 1e-6) return lms!.M * Math.exp(lms!.S * z)
    return lms!.M * Math.pow(1 + lms!.L * lms!.S * z, 1 / lms!.L)
  }

  // z-scores for 5th (z=-1.645) and 85th (z=1.036) percentile
  const bmiMin = bmiAtZScore(-1.645)
  const bmiMax = bmiAtZScore(1.036)

  const heightM = heightCm / 100
  const minKg = bmiMin * heightM * heightM
  const maxKg = bmiMax * heightM * heightM

  let currentStatus: IdealWeightResult['currentStatus']
  let bmi: number | undefined
  if (currentWeightKg) {
    bmi = currentWeightKg / (heightM * heightM)
    const bmiLMS = interpolateLMS(bmiTable, ageMonths, sex)
    if (bmiLMS) {
      const bmiZ = lmsZScore(bmi, bmiLMS.L, bmiLMS.M, bmiLMS.S)
      const pct = zScoreToPercentile(bmiZ)
      currentStatus = getWeightCategory(pct)
    }
  }

  return { minKg, maxKg, currentStatus, bmi }
}

// ─────────────────────────────────────────────────────────────
// Premature baby corrected age
// ─────────────────────────────────────────────────────────────

export interface CorrectedAgeResult {
  chronologicalWeeks: number
  weeksEarly: number
  correctedWeeks: number
  correctedMonths: number
  correctedYears: number
  chronologicalMonths: number
  useCorrectedUntilDate: Date
  stillUseCorrected: boolean
  chronologicalAgeLabel: string
  correctedAgeLabel: string
}

export function calcCorrectedAge(
  birthDate: Date,
  gestationalAgeWeeks: number,
  today: Date = new Date()
): CorrectedAgeResult {
  const weeksEarly = Math.max(0, 40 - gestationalAgeWeeks)
  const chronologicalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
  const chronologicalWeeks = Math.floor(chronologicalDays / 7)
  const chronologicalMonths = chronologicalDays / 30.4375

  const correctedDays = Math.max(0, chronologicalDays - weeksEarly * 7)
  const correctedWeeks = Math.floor(correctedDays / 7)
  const correctedMonths = correctedDays / 30.4375
  const correctedYears = correctedMonths / 12

  // Use corrected age until the child's 2nd birthday (corrected)
  const useCorrectedUntilDate = new Date(birthDate)
  useCorrectedUntilDate.setDate(useCorrectedUntilDate.getDate() + weeksEarly * 7)
  useCorrectedUntilDate.setFullYear(useCorrectedUntilDate.getFullYear() + 2)

  const stillUseCorrected = today < useCorrectedUntilDate

  function ageLabel(months: number): string {
    const yrs = Math.floor(months / 12)
    const mos = Math.floor(months % 12)
    const wks = Math.floor((months % 1) * 4.33)
    if (yrs === 0 && mos === 0) return `${Math.floor(chronologicalDays / 7)} weeks`
    if (yrs === 0) return `${mos} month${mos !== 1 ? 's' : ''} ${wks > 0 ? `${wks} week${wks !== 1 ? 's' : ''}` : ''}`.trim()
    return `${yrs} year${yrs !== 1 ? 's' : ''} ${mos > 0 ? `${mos} month${mos !== 1 ? 's' : ''}` : ''}`.trim()
  }

  return {
    chronologicalWeeks,
    weeksEarly,
    correctedWeeks,
    correctedMonths,
    correctedYears,
    chronologicalMonths,
    useCorrectedUntilDate,
    stillUseCorrected,
    chronologicalAgeLabel: ageLabel(chronologicalMonths),
    correctedAgeLabel: ageLabel(correctedMonths),
  }
}

// ─────────────────────────────────────────────────────────────
// Weight loss goal calculator
// ─────────────────────────────────────────────────────────────

export interface WeightLossResult {
  bmr: number
  tdee: number
  dailyDeficit: number
  weeklyLossKg: number
  weeksToGoal: number
  targetDate: Date
  isGoalSafe: boolean
  bmiCurrent: AdultBMIResult
  bmiGoal: AdultBMIResult
  recommendation: string
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

export function calcWeightLoss(
  currentWeightKg: number,
  goalWeightKg: number,
  heightCm: number,
  ageYears: number,
  sex: 1 | 2,
  activityLevel: string
): WeightLossResult {
  // Mifflin-St Jeor BMR
  const bmr =
    sex === 1
      ? 10 * currentWeightKg + 6.25 * heightCm - 5 * ageYears + 5
      : 10 * currentWeightKg + 6.25 * heightCm - 5 * ageYears - 161

  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.375
  const tdee = bmr * multiplier

  // Safe deficit: 500 cal/day → ~0.45 kg/week, 1000 cal/day → ~0.9 kg/week
  const weightDiffKg = currentWeightKg - goalWeightKg
  const isGoalSafe = goalWeightKg < currentWeightKg

  const recommendedDeficit = isGoalSafe ? Math.min(1000, Math.max(300, tdee * 0.2)) : 0
  const dailyDeficit = recommendedDeficit
  const weeklyLossKg = (dailyDeficit * 7) / 7700 // 7700 kcal ≈ 1 kg fat
  const weeksToGoal = weeklyLossKg > 0 ? Math.abs(weightDiffKg) / weeklyLossKg : 0

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + Math.round(weeksToGoal * 7))

  const bmiCurrent = calcAdultBMI(heightCm, currentWeightKg)
  const bmiGoal = calcAdultBMI(heightCm, goalWeightKg)

  let recommendation = ''
  if (!isGoalSafe) {
    recommendation = 'Your goal weight is higher than your current weight. To gain weight healthily, focus on a small calorie surplus and strength training.'
  } else if (weeklyLossKg > 1) {
    recommendation = `At ${dailyDeficit.toFixed(0)} cal/day deficit you could lose about ${(weeklyLossKg * 1000 / 1000).toFixed(2)} kg/week. This is at the upper safe limit — consider a slightly lower deficit for sustainable progress.`
  } else {
    recommendation = `A daily deficit of ${dailyDeficit.toFixed(0)} calories will help you lose about ${(weeklyLossKg * 1000 / 1000).toFixed(2)} kg/week — a safe, sustainable rate.`
  }

  return {
    bmr,
    tdee,
    dailyDeficit,
    weeklyLossKg,
    weeksToGoal,
    targetDate,
    isGoalSafe,
    bmiCurrent,
    bmiGoal,
    recommendation,
  }
}

// ─────────────────────────────────────────────────────────────
// Formatting helpers
// ─────────────────────────────────────────────────────────────

export function formatPercentile(p: number): string {
  if (p < 1) return '<1st'
  if (p > 99) return '>99th'
  const rounded = Math.round(p)
  if (rounded === 1) return '1st'
  if (rounded === 2) return '2nd'
  if (rounded === 3) return '3rd'
  return `${rounded}th`
}

export function formatHeight(cm: number, isMetric: boolean): string {
  if (isMetric) return `${cm.toFixed(1)} cm`
  const { feet, inches } = cmToFeetInches(cm)
  return `${feet}'${inches}"`
}

export function formatWeight(kg: number, isMetric: boolean): string {
  if (isMetric) return `${kg.toFixed(1)} kg`
  return `${kgToLbs(kg).toFixed(1)} lbs`
}
