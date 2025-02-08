interface RelatedBMILinksProps {
  currentHeight: string
  currentWeight: number
}

export function RelatedBMILinks({ currentHeight, currentWeight }: RelatedBMILinksProps) {
  const [feet, inches] = currentHeight.split('-').map(Number)
  
  // Common height variations (±2 inches)
  const heightVariations = [
    { feet: feet, inches: inches - 2 },
    { feet: feet, inches: inches - 1 },
    { feet: feet, inches: inches + 1 },
    { feet: feet, inches: inches + 2 },
  ].map(h => {
    // Handle inch overflow/underflow
    if (h.inches >= 12) {
      h.feet++
      h.inches -= 12
    } else if (h.inches < 0) {
      h.feet--
      h.inches += 12
    }
    return `${h.feet}-${h.inches}`
  }).filter(h => {
    // Filter out invalid heights
    const [f, i] = h.split('-').map(Number)
    return f >= 4 && f <= 7 // Common height range
  })

  // Common weight variations (±10%)
  const weightVariations = [
    Math.round(currentWeight * 0.9),
    Math.round(currentWeight * 0.95),
    Math.round(currentWeight * 1.05),
    Math.round(currentWeight * 1.1),
  ]

  return (
    <section className="mt-12 p-6 bg-slate-50 rounded-xl">
      <h2 className="text-xl font-semibold mb-6">Related BMI Calculations</h2>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* Similar Heights */}
        <div>
          <h3 className="font-medium text-sm text-slate-600 mb-3">Similar Heights</h3>
          <ul className="grid gap-2">
            {heightVariations.map(height => (
              <li key={height}>
                <a 
                  href={`/bmi/${height}-${currentWeight}-lbs`}
                  className="text-primary hover:underline text-sm"
                >
                  BMI for {height.replace('-', "'")}″ at {currentWeight} lbs
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Similar Weights */}
        <div>
          <h3 className="font-medium text-sm text-slate-600 mb-3">Similar Weights</h3>
          <ul className="grid gap-2">
            {weightVariations.map(weight => (
              <li key={weight}>
                <a 
                  href={`/bmi/${currentHeight}-${weight}-lbs`}
                  className="text-primary hover:underline text-sm"
                >
                  BMI for {currentHeight.replace('-', "'")}″ at {weight} lbs
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Common BMI Pages */}
        <div className="md:col-span-2">
          <h3 className="font-medium text-sm text-slate-600 mb-3">Important Links</h3>
          <ul className="grid gap-2 md:grid-cols-2">
            <li>
              <a href="/bmi/calculator" className="text-primary hover:underline text-sm">
                BMI Calculator
              </a>
            </li>
            <li>
              <a href="/bmi/chart" className="text-primary hover:underline text-sm">
                BMI Chart
              </a>
            </li>
            <li>
              <a href="/bmi/ranges" className="text-primary hover:underline text-sm">
                BMI Categories & Ranges
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
} 