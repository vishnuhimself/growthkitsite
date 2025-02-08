interface WeightChange {
  change: number      // in lbs
  timeframe: string   // recommended timeframe
  isHealthy: boolean  // based on CDC guidelines for safe weight change
}

// CDC and NHS guidelines recommend 1-2 lbs per week as safe weight change
export function getWeightChangeRanges(currentWeight: number, targetBMI: number): WeightChange[] {
  const changes: number[] = [-20, -10, -5, 5, 10, 20]
  
  return changes.map(change => ({
    change,
    timeframe: getRecommendedTimeframe(Math.abs(change)),
    isHealthy: isHealthyWeightChange(change)
  }))
}

function getRecommendedTimeframe(weightChange: number): string {
  // Based on safe rate of 1-2 lbs per week
  const minWeeks = Math.ceil(weightChange / 2)
  const maxWeeks = Math.ceil(weightChange)
  
  if (minWeeks < 4) return `${minWeeks}-${maxWeeks} weeks`
  if (minWeeks < 12) return `${Math.ceil(minWeeks/4)}-${Math.ceil(maxWeeks/4)} months`
  return `${Math.ceil(minWeeks/12)}-${Math.ceil(maxWeeks/12)} years`
}

function isHealthyWeightChange(change: number): boolean {
  // Max recommended change per CDC is 1-2 lbs per week
  return Math.abs(change) <= 24 // ~3 months at 2 lbs/week
} 