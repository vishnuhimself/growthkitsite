export default function Support() {
  return (
    <div className="container mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold mb-8">Support</h1>
      <div className="prose prose-slate max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            We're here to help you with any questions or issues you might have with GrowthKit.
          </p>
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Email Support</h3>
            <a href="mailto:hey@heyvish.com" className="text-primary hover:underline">
              hey@heyvish.com
            </a>
            <div className="mt-4 text-muted-foreground">
              <p>Available Monday to Friday</p>
              <p>Typical response time: 24 hours</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Before Contacting Support</h2>
          <p className="mb-4">
            To help us serve you better, please include:
          </p>
          <ul className="list-disc pl-6">
            <li>Your device model</li>
            <li>iOS version</li>
            <li>App version</li>
            <li>Clear description of the issue</li>
            <li>Steps to reproduce the problem (if applicable)</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 