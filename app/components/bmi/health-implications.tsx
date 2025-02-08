interface HealthImplicationsProps {
  category: string
}

export function HealthImplications({ category }: HealthImplicationsProps) {
  const implications = {
    'Underweight': 'Being underweight may indicate nutritional deficiencies and could affect your immune system. It\'s important to ensure you\'re getting adequate nutrients.',
    'Normal weight': 'Your weight is within a healthy range. This reduces your risk of various health conditions and supports overall wellbeing.',
    'Overweight': 'Being overweight may increase your risk of cardiovascular disease and other health conditions. Small lifestyle changes can help you reach a healthier weight.',
    'Obese': 'Obesity increases risks of several health conditions including heart disease, diabetes, and joint problems. Consider consulting healthcare professionals for guidance.'
  }

  return (
    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Health Implications</h3>
      <p className="text-muted-foreground">{implications[category as keyof typeof implications]}</p>
    </div>
  )
} 