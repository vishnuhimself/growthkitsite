import Image from 'next/image'

export function Logo() {
  return (
    <div className="relative w-8 h-8 rounded-md overflow-hidden">
      <Image
        src="/GrowthKitLogo.webp"
        alt="GrowthKit Logo"
        width={32}
        height={32}
        className="object-cover"
        priority
        quality={100}
      />
    </div>
  )
} 