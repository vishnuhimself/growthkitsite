interface BMIDetails {
  bmi: number
  category: string
  heightInCm: number
  heightInFeet: string
  weightInKg: number
  weightInLbs: number
  healthyWeightRange: {
    min: number
    max: number
  }
  recommendations: string[]
}

export function calculateBMI(heightInInches: number, weightInLbs: number): number {
  const heightInMeters = (heightInInches * 2.54) / 100
  const weightInKg = weightInLbs * 0.453592
  return Number((weightInKg / (heightInMeters * heightInMeters)).toFixed(1))
}

export function calculateBMIDetails(height: string, weight: string): BMIDetails {
  // Convert height from format "5-3" to inches (63 inches)
  const [feet, inches] = height.split('-').map(Number)
  const heightInInches = (feet * 12) + inches
  const heightInCm = heightInInches * 2.54
  const heightInMeters = heightInCm / 100

  // Convert weight from format "150-lbs" to number
  const weightInLbs = parseInt(weight.split('-')[0])
  const weightInKg = weightInLbs * 0.453592

  // Calculate BMI using the shared function
  const bmi = calculateBMI(heightInInches, weightInLbs)

  // Determine BMI category
  const category = getBMICategory(bmi)

  // Calculate healthy weight range for this height
  const healthyWeightRange = {
    min: Number((18.5 * heightInMeters * heightInMeters * 2.20462).toFixed(1)),
    max: Number((24.9 * heightInMeters * heightInMeters * 2.20462).toFixed(1))
  }

  return {
    bmi,
    category,
    heightInCm: Math.round(heightInCm),
    heightInFeet: `${feet}'${inches}"`,
    weightInKg: Math.round(weightInKg),
    weightInLbs,
    healthyWeightRange,
    recommendations: getRecommendations(category)
  }
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

function getRecommendations(category: string): string[] {
  const recommendations = {
    'Underweight': [
      'Consider consulting with a healthcare provider',
      'Focus on nutrient-dense foods',
      'Add strength training to build muscle mass',
      'Track your progress regularly'
    ],
    'Normal weight': [
      'Maintain your healthy lifestyle',
      'Regular exercise (150 minutes per week)',
      'Balanced diet with plenty of vegetables',
      'Regular health check-ups'
    ],
    'Overweight': [
      'Gradually increase physical activity',
      'Focus on portion control',
      'Track your daily food intake',
      'Set realistic weight loss goals'
    ],
    'Obese': [
      'Consult with healthcare professionals',
      'Start with low-impact exercises',
      'Make sustainable dietary changes',
      'Consider keeping a health journal'
    ]
  }
  return recommendations[category as keyof typeof recommendations] || []
} 