'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Download, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const messages = [
  {
    text: "Track your kids' growth journey",
    icon: "👶"
  },
  {
    text: "Monitor your fitness progress",
    icon: "🚀"
  },
  {
    text: "Track your weight loss journey",
    icon: "💪"
  },
  {
    text: "Keep your family's vitals in check",
    icon: "👨‍👩‍👧‍👦"
  }
]

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 4000) // Change message every 4 seconds

    return () => clearInterval(timer)
  }, [])

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features')
    featuresSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="w-full pt-32 pb-12 md:pt-24 md:py-12 lg:py-10 min-h-screen flex items-center">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-6 md:w-5/12">
            <div className="relative h-[180px] sm:h-[240px] md:h-[280px]"> {/* Container for animated text */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl">
                    <span className="text-6xl mb-4 block">{messages[currentIndex].icon}</span>
                    {messages[currentIndex].text}
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-xl md:text-2xl leading-relaxed">
              The complete <span className="font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">kit</span> for monitoring BMI, Height, and Weight. 
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