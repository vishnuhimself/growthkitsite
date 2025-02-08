interface RelatedBMICalculationsProps {
  currentHeight: string
  currentWeight: string
}

export function RelatedBMICalculations({ currentHeight, currentWeight }: RelatedBMICalculationsProps) {
  return (
    <section className="mt-12 p-6 bg-slate-50 rounded-xl">
      <h2 className="text-xl font-semibold mb-6">Related BMI Calculations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Similar Heights */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-slate-600">Similar Heights</h3>
          <ul className="space-y-1">
            {['-2', '-1', '+1', '+2'].map(inch => (
              <li key={inch} className="text-sm">
                <a href="#" className="text-primary hover:underline">
                  {getRelatedHeight(currentHeight, parseInt(inch))}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Similar Weights */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-slate-600">Similar Weights</h3>
          <ul className="space-y-1">
            {['-10', '-5', '+5', '+10'].map(lbs => (
              <li key={lbs} className="text-sm">
                <a href="#" className="text-primary hover:underline">
                  {getRelatedWeight(currentWeight, parseInt(lbs))} lbs
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function getRelatedHeight(height: string, change: number): string {
  const [feet, inches] = height.split('-').map(Number)
  let newInches = inches + change
  let newFeet = feet

  if (newInches >= 12) {
    newFeet++
    newInches -= 12
  } else if (newInches < 0) {
    newFeet--
    newInches += 12
  }

  return `${newFeet}'${newInches}"`
}

function getRelatedWeight(weight: string, change: number): number {
  return parseInt(weight) + change
} 