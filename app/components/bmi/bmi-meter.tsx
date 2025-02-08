'use client'

interface BMIMeterProps {
  bmi: number
  category: string
}

export function BMIMeter({ bmi, category }: BMIMeterProps) {
  // Calculate position (0-100%)
  const getPosition = (bmi: number) => {
    // BMI ranges
    const min = 15  // Minimum BMI to show
    const max = 40  // Maximum BMI to show
    const range = max - min
    
    // Calculate percentage position
    const position = ((bmi - min) / range) * 100
    // Clamp between 0 and 100
    return Math.max(0, Math.min(100, position))
  }

  const position = getPosition(bmi)
  
  // Determine if we're near the edges (first or last 15%)
  const isNearStart = position < 15
  const isNearEnd = position > 85

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-sm mb-8">
      <div className="space-y-8">
        {/* BMI Result Card */}
        <div className="flex items-center justify-between p-6 border rounded-xl">
          <div>
            <span className="text-sm text-slate-600">Your BMI</span>
            <div className="text-4xl font-bold mt-1">{bmi.toFixed(1)}</div>
          </div>
          <div className="text-right">
            <span className="text-sm text-slate-600">Category</span>
            <div className="text-2xl font-semibold mt-1">{category}</div>
          </div>
        </div>

        {/* BMI Scale Container */}
        <div className="relative pb-6">
          {/* Scale Numbers */}
          <div className="relative w-full flex justify-between px-[3.5%] text-sm text-slate-600 mb-2">
            <span>15</span>
            <span>20</span>
            <span>25</span>
            <span>30</span>
            <span>35</span>
            <span>40</span>
          </div>

          {/* Color Bar */}
          <div className="h-6 rounded-full overflow-hidden">
            <div className="h-full flex">
              <div className="flex-1 bg-[#F6D55C]" style={{ flex: '3.5' }} />
              <div className="flex-1 bg-[#4CAF50]" style={{ flex: '6.4' }} />
              <div className="flex-1 bg-[#ED6C02]" style={{ flex: '5.1' }} />
              <div className="flex-1 bg-[#EF4444]" style={{ flex: '10' }} />
            </div>
          </div>

          {/* Indicator */}
          <div 
            className={`absolute transition-all duration-500 flex flex-col items-center
              ${isNearStart ? 'items-start translate-x-0 left-0 pl-1' : 
                isNearEnd ? 'items-end translate-x-0 right-0 pr-1' : 
                '-bottom-8 translate-x-[-50%]'}`}
            style={{ 
              left: isNearStart || isNearEnd ? undefined : `${position}%`,
              bottom: isNearStart || isNearEnd ? '-2.5rem' : undefined
            }}
          >
            <span 
              className="text-3xl" 
              role="img" 
              aria-label="pointing up"
            >
              ☝️
            </span>
            <span className="text-xs text-slate-600 mt-0.5 whitespace-nowrap">
              {isNearStart ? 'Start of scale' : 
               isNearEnd ? 'End of scale' : 
               'You are here'}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center pt-10">
          <div className="space-y-1">
            <span className="font-medium text-[#B39C30]">Underweight</span>
            <span className="block text-sm text-slate-600">&lt;18.5</span>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-[#2E7D32]">Normal</span>
            <span className="block text-sm text-slate-600">18.5-24.9</span>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-[#B55B02]">Overweight</span>
            <span className="block text-sm text-slate-600">25-29.9</span>
          </div>
          <div className="space-y-1">
            <span className="font-medium text-[#B91C1C]">Obese</span>
            <span className="block text-sm text-slate-600">30+</span>
          </div>
        </div>
      </div>
    </div>
  )
} 