interface BMIPercentileData {
  bmi: number
  percentile: number
}

// Data from CDC NHANES 2015-2018 for adults 20+ years
// Source: https://www.cdc.gov/nchs/data/nhsr/nhsr154-508.pdf
export const bmiDistributionData: BMIPercentileData[] = [
  { bmi: 18.5, percentile: 2.3 },
  { bmi: 20.0, percentile: 7.8 },
  { bmi: 22.5, percentile: 22.4 },
  { bmi: 25.0, percentile: 42.1 },
  { bmi: 27.5, percentile: 60.3 },
  { bmi: 30.0, percentile: 74.2 },
  { bmi: 32.5, percentile: 83.7 },
  { bmi: 35.0, percentile: 89.8 },
  { bmi: 37.5, percentile: 93.6 },
  { bmi: 40.0, percentile: 95.9 }
]

export function getBMIPercentile(bmi: number): number {
  // Handle edge cases
  if (bmi <= 18.5) return 2.3
  if (bmi >= 40) return 95.9

  // Find the two closest data points
  let lowerIndex = 0
  for (let i = 0; i < bmiDistributionData.length - 1; i++) {
    if (bmiDistributionData[i].bmi <= bmi && bmiDistributionData[i + 1].bmi > bmi) {
      lowerIndex = i
      break
    }
  }

  // Linear interpolation between points
  const lower = bmiDistributionData[lowerIndex]
  const upper = bmiDistributionData[lowerIndex + 1]
  
  const percentage = (bmi - lower.bmi) / (upper.bmi - lower.bmi)
  return lower.percentile + (upper.percentile - lower.percentile) * percentage
}

export function getDistributionDescription(percentile: number): string {
  if (percentile <= 5) return 'lower than 95% of adults'
  if (percentile <= 15) return 'lower than 85% of adults'
  if (percentile <= 25) return 'lower than 75% of adults'
  if (percentile <= 50) return 'lower than average'
  if (percentile <= 75) return 'higher than average'
  if (percentile <= 85) return 'higher than 75% of adults'
  if (percentile <= 95) return 'higher than 85% of adults'
  return 'higher than 95% of adults'
} 