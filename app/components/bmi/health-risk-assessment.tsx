import { getHealthRisks, getSeverityColor } from '@/app/lib/health-risk-data'
import { cn } from '@/app/lib/utils'

interface HealthRiskAssessmentProps {
  category: string
}

export function HealthRiskAssessment({ category }: HealthRiskAssessmentProps) {
  const risks = getHealthRisks(category)

  return (
    <section className="mt-12 p-6 bg-slate-50 rounded-xl">
      <h2 className="text-xl font-semibold mb-6">Health Risk Assessment</h2>
      
      <div className="grid gap-4">
        {risks.map(risk => (
          <div 
            key={risk.id}
            className="bg-white rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className={cn(
                "shrink-0 p-2 rounded-full",
                getSeverityColor(risk.severity)
              )}>
                <risk.icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h3 className="font-medium">{risk.name}</h3>
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit",
                    getSeverityColor(risk.severity)
                  )}>
                    {risk.severity} risk
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  {risk.description}
                </p>
                {risk.details && (
                  <ul className="mt-2 space-y-1">
                    {risk.details.map((detail, index) => (
                      <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="text-sm text-slate-500 mt-2">
          <p>* Based on WHO and CDC health risk assessments for different BMI categories</p>
        </div>
      </div>
    </section>
  )
} 