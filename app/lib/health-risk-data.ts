import { AlertTriangle, Heart, Activity, Brain, Scale, Apple, Bone, Shield, Battery } from 'lucide-react'

interface HealthRisk {
  id: string
  name: string
  description: string
  details: string[]
  icon: typeof AlertTriangle | typeof Heart | typeof Bone | typeof Shield | typeof Battery
  severity: 'low' | 'moderate' | 'high'
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obese'
}

// Evidence-based health risks from WHO and CDC data
export const healthRisks: HealthRisk[] = [
  // Underweight Risks
  {
    id: 'immune',
    name: 'Weakened Immune System',
    description: 'Higher risk of infections and slower recovery from illness',
    details: [
      'Reduced white blood cell production',
      'Compromised immune response',
      'Longer healing time for wounds',
      'Increased susceptibility to common infections'
    ],
    icon: Shield,
    severity: 'high',
    category: 'Underweight'
  },
  {
    id: 'bone',
    name: 'Bone Health',
    description: 'Increased risk of osteoporosis and bone fractures',
    details: [
      'Reduced bone density',
      'Increased risk of osteoporosis',
      'Higher risk of bone fractures'
    ],
    icon: Bone,
    severity: 'high',
    category: 'Underweight'
  },
  {
    id: 'nutrition',
    name: 'Nutritional Deficiencies',
    description: 'Risk of vitamin and mineral deficiencies affecting overall health',
    details: [
      'Vitamin D deficiency',
      'Iron deficiency',
      'Calcium deficiency',
      'Zinc deficiency'
    ],
    icon: Apple,
    severity: 'moderate',
    category: 'Underweight'
  },

  // Normal Weight - Positive Health Indicators
  {
    id: 'heart-health',
    name: 'Good Heart Health',
    description: 'Lower risk of cardiovascular diseases',
    details: [
      'Lower risk of heart disease',
      'Lower risk of stroke',
      'Lower risk of high blood pressure'
    ],
    icon: Heart,
    severity: 'low',
    category: 'Normal weight'
  },
  {
    id: 'metabolic',
    name: 'Healthy Metabolism',
    description: 'Better blood sugar control and metabolic function',
    details: [
      'Better blood sugar control',
      'Improved metabolic function',
      'Lower risk of type 2 diabetes'
    ],
    icon: Activity,
    severity: 'low',
    category: 'Normal weight'
  },

  // Overweight Risks
  {
    id: 'cardiovascular',
    name: 'Cardiovascular Risk',
    description: 'Increased risk of high blood pressure and heart disease',
    details: [
      'Increased risk of heart disease',
      'Increased risk of stroke',
      'Increased risk of high blood pressure'
    ],
    icon: Heart,
    severity: 'moderate',
    category: 'Overweight'
  },
  {
    id: 'diabetes',
    name: 'Type 2 Diabetes Risk',
    description: 'Higher chance of developing insulin resistance',
    details: [
      'Increased risk of type 2 diabetes',
      'Increased risk of metabolic syndrome',
      'Increased risk of high blood sugar levels'
    ],
    icon: Activity,
    severity: 'moderate',
    category: 'Overweight'
  },

  // Obese Risks
  {
    id: 'severe-cardiovascular',
    name: 'High Cardiovascular Risk',
    description: 'Significantly increased risk of heart disease and stroke',
    details: [
      'Increased risk of heart disease',
      'Increased risk of stroke',
      'Increased risk of high blood pressure'
    ],
    icon: Heart,
    severity: 'high',
    category: 'Obese'
  },
  {
    id: 'severe-diabetes',
    name: 'Diabetes Risk',
    description: 'High risk of type 2 diabetes and metabolic syndrome',
    details: [
      'Increased risk of type 2 diabetes',
      'Increased risk of metabolic syndrome',
      'Increased risk of high blood sugar levels'
    ],
    icon: Activity,
    severity: 'high',
    category: 'Obese'
  },
  {
    id: 'joint',
    name: 'Joint Problems',
    description: 'Increased stress on joints, higher risk of osteoarthritis',
    details: [
      'Increased stress on joints',
      'Higher risk of osteoarthritis',
      'Increased risk of joint pain'
    ],
    icon: Activity,
    severity: 'high',
    category: 'Obese'
  }
]

export function getHealthRisks(category: string) {
  return healthRisks.filter(risk => risk.category === category)
}

export function getSeverityColor(severity: HealthRisk['severity']) {
  switch (severity) {
    case 'low':
      return 'text-green-600 bg-green-50'
    case 'moderate':
      return 'text-orange-600 bg-orange-50'
    case 'high':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-slate-600 bg-slate-50'
  }
} 