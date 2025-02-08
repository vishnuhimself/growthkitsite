export function SourcesSection() {
  return (
    <section className="mt-12 p-6 bg-slate-50 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Sources & References</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-slate-600 mb-2">Health Organizations</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a 
                href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                WHO: Obesity and Overweight Fact Sheet
              </a>
            </li>
            <li>
              <a 
                href="https://www.cdc.gov/bmi/faq/?CDC_AAref_Val=https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CDC: Adult Body Mass Index
              </a>
            </li>
            <li>
              <a 
                href="https://www.nhlbi.nih.gov/health/educational/lose_wt/BMI/bmicalc.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                NIH: BMI Calculator and Health Weight Ranges
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-sm text-slate-600 mb-2">Research & Guidelines</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a 
                href="https://www.who.int/publications/i/item/9789241514873"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                WHO: Guidelines on Physical Activity and Sedentary Behaviour
              </a>
            </li>
            <li>
              <a 
                href="https://www.cdc.gov/healthyweight/losing_weight/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CDC: Healthy Weight Loss and Management
              </a>
            </li>
          </ul>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </section>
  )
} 