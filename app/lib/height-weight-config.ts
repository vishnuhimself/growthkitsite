// All possible heights from 4'0" to 6'11"
export const heightRanges = Array.from({ length: 36 }, (_, i) => {
  const totalInches = 48 + i // Start from 4'0" (48 inches)
  const feet = Math.floor(totalInches / 12)
  const inches = totalInches % 12
  return `${feet}-${inches}`
})

interface WeightRange {
  min: number
  max: number
}

// Weight ranges based on height
export const heightWeightRanges: Record<string, WeightRange> = {
  // 4'0" to 4'11"
  "4-0": { min: 70, max: 160 },
  "4-1": { min: 70, max: 165 },
  "4-2": { min: 70, max: 170 },
  "4-3": { min: 75, max: 175 },
  "4-4": { min: 75, max: 180 },
  "4-5": { min: 80, max: 185 },
  "4-6": { min: 80, max: 190 },
  "4-7": { min: 85, max: 195 },
  "4-8": { min: 85, max: 200 },
  "4-9": { min: 90, max: 205 },
  "4-10": { min: 90, max: 210 },
  "4-11": { min: 95, max: 215 },

  // 5'0" to 5'11"
  "5-0": { min: 95, max: 220 },
  "5-1": { min: 100, max: 225 },
  "5-2": { min: 100, max: 230 },
  "5-3": { min: 105, max: 235 },
  "5-4": { min: 105, max: 240 },
  "5-5": { min: 110, max: 245 },
  "5-6": { min: 110, max: 250 },
  "5-7": { min: 115, max: 255 },
  "5-8": { min: 115, max: 260 },
  "5-9": { min: 120, max: 265 },
  "5-10": { min: 120, max: 270 },
  "5-11": { min: 125, max: 275 },

  // 6'0" to 6'11"
  "6-0": { min: 125, max: 280 },
  "6-1": { min: 130, max: 285 },
  "6-2": { min: 130, max: 290 },
  "6-3": { min: 135, max: 295 },
  "6-4": { min: 135, max: 300 },
  "6-5": { min: 140, max: 305 },
  "6-6": { min: 140, max: 310 },
  "6-7": { min: 145, max: 315 },
  "6-8": { min: 145, max: 320 },
  "6-9": { min: 150, max: 325 },
  "6-10": { min: 150, max: 330 },
  "6-11": { min: 155, max: 335 }
}

export function isValidHeight(height: string): boolean {
  return heightRanges.includes(height)
}

// Add new function to check if weight is within reasonable limits
export function isReasonableWeight(weight: number): boolean {
  return weight >= 50 && weight <= 500 // Reasonable min/max limits
}

// Modify the validation in page.tsx
export function isValidWeight(height: string, weight: number): boolean {
  // First check if it's within static range
  const range = heightWeightRanges[height]
  if (!range) return false
  
  // If within static range, return true
  if (weight >= range.min && weight <= range.max) return true
  
  // If outside static range but reasonable, allow it
  return isReasonableWeight(weight)
}

export function getWeightRange(height: string): WeightRange | null {
  return heightWeightRanges[height] || null
}

export function getAllPossibleCombinations() {
  const combinations: Array<{ height: string; weight: number }> = []

  for (const height of heightRanges) {
    const range = heightWeightRanges[height]
    if (range) {
      for (let weight = range.min; weight <= range.max; weight++) {
        combinations.push({ height, weight })
      }
    }
  }

  return combinations
}

// For validation and redirection
export function getNearestValidWeight(height: string, weight: number): number {
  const range = heightWeightRanges[height]
  if (!range) return weight
  
  if (weight < range.min) return range.min
  if (weight > range.max) return range.max
  
  return weight
} 