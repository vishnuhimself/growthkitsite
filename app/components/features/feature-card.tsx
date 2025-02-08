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
            quality={75}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMj4xLy0vLi44QT4+OEA2PS0uRk1HRVNWW1ZbOENjZF9iXFdZW1v/2wBDARUXFx4aHR4eHVtSPzJbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1v/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  )
} 