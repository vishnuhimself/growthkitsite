interface RecommendationsSectionProps {
  items: string[]
}

export function RecommendationsSection({ items }: RecommendationsSectionProps) {
  return (
    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
} 