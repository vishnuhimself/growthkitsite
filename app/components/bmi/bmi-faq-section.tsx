export function BMIFAQSection() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">What is BMI?</h3>
          <p className="text-slate-600">
            Body Mass Index (BMI) is a simple measure that uses your height and weight to work out if your weight is healthy.
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">How is BMI calculated?</h3>
          <p className="text-slate-600">
            BMI is calculated by dividing your weight in kilograms by your height in meters squared. The formula is: BMI = kg/m².
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">What are BMI categories?</h3>
          <p className="text-slate-600">
            BMI ranges are: Underweight (under 18.5), Normal weight (18.5 to 24.9), Overweight (25 to 29.9), and Obese (30 or greater).
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Is BMI accurate for everyone?</h3>
          <p className="text-slate-600">
            BMI is not a perfect measure. It may not be suitable for athletes, elderly people, or during pregnancy. Consult healthcare professionals for personalized advice.
          </p>
        </div>
      </div>
    </section>
  )
} 