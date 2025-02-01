import Image from 'next/image'

interface FeatureCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  isReversed?: boolean
}

export function FeatureCard({ title, description, imageSrc, imageAlt, isReversed = false }: FeatureCardProps) {
  return (
    <div className={`flex flex-col gap-4 ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-center`}>
      <div className="flex-1 space-y-2">
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h3>
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-[350px] aspect-[9/16]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            quality={95}
          />
        </div>
      </div>
    </div>
  )
} 