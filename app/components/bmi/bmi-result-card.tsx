interface BMIResultCardProps {
  bmi: number
  category: string
}

export function BMIResultCard({ bmi, category }: BMIResultCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-muted-foreground">Your BMI</h3>
          <p className="text-4xl font-bold">{bmi}</p>
        </div>
        <div className="text-right">
          <h3 className="text-lg font-medium text-muted-foreground">Category</h3>
          <p className="text-2xl font-semibold">{category}</p>
        </div>
      </div>
    </div>
  )
} 