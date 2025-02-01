'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Download, Sparkles } from 'lucide-react'

export function HeroSection() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features')
    featuresSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="w-full pt-32 pb-12 md:pt-24 md:py-12 lg:py-10 min-h-screen flex items-center">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-6 md:w-5/12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl">
              Track Your{' '}
              <br className="block md:hidden" />
              <span className="relative inline-flex flex-col my-2">
                <span className="relative z-10 bg-[#0A0A0A] px-6 py-2 text-white rounded-lg">
                  Growth
                  <ArrowUpRight strokeWidth={3} className="absolute -top-2 -right-2 w-8 h-8 text-black bg-white drop-shadow-lg border border-grey rounded-full p-1" />
                </span>
              </span>
              {' '}Journey
              <br className="hidden md:block" />
              {' '}with Confidence
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              The complete solution for monitoring{' '}
              <span className="font-semibold text-foreground">height</span>,{' '}
              <span className="font-semibold text-foreground">weight</span>, and{' '}
              <span className="font-semibold text-foreground">BMI</span>.{' '}
              Keep your health records organized, visualized, and always accessible.
            </p>
            <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
              <Link
                href="#download"
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span>Download Now</span>
              </Link>
              <button
                onClick={scrollToFeatures}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-input bg-background px-8 text-base font-medium transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                <span>Explore Features</span>
              </button>
            </div>
          </div>
          <div className="md:w-7/12 md:-mr-24">
            <div className="relative h-[400px] md:h-[600px] lg:h-[800px] w-full rounded-2xl">
              <Image
                src="/GrowthKit-Hero.webp"
                alt="GrowthKit App Interface showing growth tracking features"
                fill
                className="object-contain scale-110"
                priority={true}
                quality={90}
                sizes="(max-width: 768px) 100vw, 58.333333%"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 