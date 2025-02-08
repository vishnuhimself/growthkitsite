import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { calculateBMIDetails } from '@/app/lib/bmi-utils'
import { BMICalculator } from '@/app/components/bmi/bmi-calculator'
import { BMIMeter } from '@/app/components/bmi/bmi-meter'
import { HealthImplications } from '@/app/components/bmi/health-implications'
import { WeightRangeInfo } from '@/app/components/bmi/weight-range-info'
import { RecommendationsSection } from '@/app/components/bmi/recommendations-section'
import { TrackWithGrowthKitCTA } from '@/app/components/bmi/track-with-growthkit-cta'
import { BMIDistribution } from '@/app/components/bmi/bmi-distribution'
import { 
  getAllPossibleCombinations, 
  isValidHeight, 
  isValidWeight,
  getNearestValidWeight,
  isReasonableWeight,
  heightWeightRanges
} from '@/app/lib/height-weight-config'
import { trackDynamicPage } from '@/app/lib/actions'
import { HealthRiskAssessment } from '@/app/components/bmi/health-risk-assessment'
import { WeightChangeImpact } from '@/app/components/bmi/weight-change-impact'
import { BMIFAQSection } from '@/app/components/bmi/bmi-faq-section'
import { RelatedBMILinks } from '@/app/components/bmi/related-bmi-pages'
import { SourcesSection } from '@/app/components/bmi/sources-section'

interface BMIPageProps {
  params: {
    slug: string
  }
}

function parseSlug(slug: string): { height: string; weight: number } | null {
  try {
    const parts = slug.split('-')
    const height = `${parts[0]}-${parts[1]}`
    const weight = parseInt(parts[2])
    return { height, weight }
  } catch {
    return null
  }
}

export const dynamicParams = true // available in production

export async function generateStaticParams() {
  const combinations = getAllPossibleCombinations()
  
  return combinations.map(({ height, weight }) => ({
    slug: `${height}-${weight}-lbs`
  }))
}

export async function generateMetadata({ params }: BMIPageProps): Promise<Metadata> {
  const parsed = parseSlug(params.slug)
  if (!parsed) throw new Error('Invalid URL format')

  const { height, weight } = parsed
  const { bmi, category, heightInFeet, weightInLbs } = await calculateBMIDetails(height, `${weight}-lbs`)

  return {
    title: `BMI for ${heightInFeet}, ${weightInLbs} lbs Male and Female`,
    description: `Calculate and understand BMI for someone ${heightInFeet} tall and weighing ${weightInLbs} lbs. Your BMI is ${bmi}, which is considered ${category}. Get personalized health insights and recommendations.`,
    keywords: [
      `${heightInFeet} ${weightInLbs} pounds bmi`,
      'bmi calculator',
      'body mass index',
      'healthy weight calculator',
      'weight health check',
      'bmi chart',
      `${category} bmi range`,
      'weight tracking'
    ],
    openGraph: {
      title: `BMI for ${heightInFeet}, ${weightInLbs} lbs Male and Female`,
      description: `Calculate and understand BMI for someone ${heightInFeet} tall and weighing ${weightInLbs} lbs. Your BMI is ${bmi}, which is considered ${category}. Get personalized health insights and recommendations.`,
      type: 'website',
    }
  }
}

export default async function BMIPage({ params }: BMIPageProps) {
  const parsed = parseSlug(params.slug)
  if (!parsed) redirect('/bmi')

  const { height, weight } = parsed

  // Validate height
  if (!isValidHeight(height)) {
    redirect('/bmi')
  }

  // Validate weight - only redirect if completely unreasonable
  if (!isReasonableWeight(weight)) {
    const validWeight = getNearestValidWeight(height, weight)
    redirect(`/bmi/${height}-${validWeight}-lbs`)
  }

  // Calculate BMI and details
  const { 
    bmi,
    category,
    heightInCm,
    heightInFeet,
    weightInKg,
    weightInLbs,
    healthyWeightRange,
    recommendations
  } = await calculateBMIDetails(height, `${weight}-lbs`)

  // Track dynamic page generation if outside static range
  const range = heightWeightRanges[height]
  if (!range || weight > range.max || weight < range.min) {
    await trackDynamicPage(height, weight)
  }

  return (
    <article className="container mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-bold mb-6">
        BMI for {heightInFeet}, {weightInLbs} lbs Male and Female
      </h1>

      <BMICalculator 
        initialHeight={height}
        initialWeight={`${weight}-lbs`}
        currentBMI={bmi}
      />

      <BMIMeter bmi={bmi} category={category} />

      <TrackWithGrowthKitCTA />

      <BMIDistribution bmi={bmi} />

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Understanding Your BMI</h2>
        <p>At {heightInFeet} ({heightInCm}cm) and {weightInLbs}lbs ({weightInKg}kg), 
           your BMI is {bmi}. This places you in the {category} category.</p>
        
        <HealthImplications category={category} />
        <WeightRangeInfo range={healthyWeightRange} currentWeight={weightInLbs} />
        <RecommendationsSection items={recommendations} />
      </section>

      <WeightChangeImpact 
        height={height}
        currentWeight={weightInLbs}
        currentBMI={bmi}
      />

      <HealthRiskAssessment category={category} />

      {/* FAQ Section */}
      <BMIFAQSection />

      {/* Related BMI Pages */}
      <RelatedBMILinks 
        currentHeight={height}
        currentWeight={weightInLbs}
      />

      {/* Sources & References */}
      <SourcesSection />

    </article>
  )
} 