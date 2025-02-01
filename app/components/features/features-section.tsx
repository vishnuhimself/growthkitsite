import Image from 'next/image'

export function FeaturesSection() {
  return (
    <section 
      id="features" 
      className="relative w-full bg-slate-50 scroll-mt-20"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16">
          <div className="col-span-full mb-2">
            <h2 className="text-4xl font-bold tracking-tight text-center">Powerful Features for Everyone</h2>
          </div>
          
          {/* Multiple Profiles */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/GrowthKit-Profiles.webp"
                  alt="Profile management screen"
                  fill
                  className="object-contain"
                  quality={95}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Multiple Profiles, One App</h3>
                <p className="text-muted-foreground">
                  Track growth data for your entire family in one place. Create and manage profiles for everyone, 
                  making it easy to maintain comprehensive health records for the whole family.
                </p>
              </div>
            </div>
          </div>

          {/* Smart Dashboard */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/GrowthKit-Dashboard.webp"
                  alt="Dashboard screen"
                  fill
                  className="object-contain"
                  quality={95}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Dashboard</h3>
                <p className="text-muted-foreground">
                  Get a quick overview of all your important data. Add measurements, view insights, 
                  and manage profiles - all from one intuitive dashboard designed for efficiency.
                </p>
              </div>
            </div>
          </div>

          {/* Beautiful Charts */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/GrowthKit-Charts.webp"
                  alt="Growth tracking charts and analytics"
                  fill
                  className="object-contain"
                  quality={95}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Advanced Analytics & Beautiful Charts</h3>
                <p className="text-muted-foreground">
                  Visualize growth patterns with our stunning interactive charts. Track everything from height velocity 
                  to BMI trends with precision. Make informed decisions with comprehensive data visualization that's both 
                  beautiful and insightful.
                </p>
              </div>
            </div>
          </div>

          {/* Dark Mode */}
          <div className="bg-[#0A0A0A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/GrowthKit-Darkmode.webp"
                  alt="Elegant dark mode interface"
                  fill
                  className="object-contain"
                  quality={95}
                />
              </div>
              <div className="text-white">
                <h3 className="text-xl font-semibold mb-2">Stunning Dark Mode</h3>
                <p className="text-gray-300">
                  Experience the elegance of our thoughtfully crafted dark mode. Easy on the eyes, perfect for 
                  late-night check-ins, and absolutely gorgeous. Every pixel is optimized for both aesthetics and comfort.
                </p>
              </div>
            </div>
          </div>

          {/* Insights Snapshot */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/GrowthKit-Insights-Snapshot.webp"
                  alt="Comprehensive insights dashboard"
                  fill
                  className="object-contain"
                  quality={95}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Insights at a Glance</h3>
                <p className="text-muted-foreground">
                  Get instant access to comprehensive growth metrics. From velocity tracking to BMI calculations, 
                  our intelligent insights provide a complete picture of growth progress in one beautiful dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Measurement System */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/GrowthKit-Measurement-System.webp"
                  alt="Flexible measurement system options"
                  fill
                  className="object-contain"
                  quality={95}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Global Measurement Support</h3>
                <p className="text-muted-foreground">
                  Switch seamlessly between metric and imperial systems. Whether you think in centimeters or inches, 
                  pounds or kilograms, GrowthKit adapts to your preferred way of tracking. Perfect for users worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 