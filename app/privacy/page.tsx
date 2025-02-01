export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            At GrowthKit, we take your privacy seriously. This Privacy Policy explains how we handle your data 
            in our height, weight, and BMI tracking application. We believe in complete transparency and user control over personal data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Collection and Storage</h2>
          <p className="mb-4">
            GrowthKit is designed with privacy at its core. All data is stored locally on your device:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Height measurements</li>
            <li>Weight measurements</li>
            <li>Profile information</li>
            <li>BMI calculations</li>
            <li>App preferences</li>
          </ul>
          <p>
            We do not collect, transmit, or store any of your data on external servers. All information remains 
            exclusively on your device and under your control.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">No Account Required</h2>
          <p>
            GrowthKit operates without user accounts or registration. You can start using the app immediately 
            without providing any personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p>
            Your data is secured by your device's built-in security features. Since all data is stored locally, 
            it benefits from your device's encryption and security measures.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <p>
            While GrowthKit can be used to track children's growth, all data management must be done by parents 
            or legal guardians. We do not knowingly collect any personal information from children.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Backup and Deletion</h2>
          <p className="mb-4">
            You have complete control over your data:
          </p>
          <ul className="list-disc pl-6">
            <li>All data can be exported for backup</li>
            <li>Data can be completely deleted from the app at any time</li>
            <li>Uninstalling the app removes all associated data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p>
            GrowthKit does not integrate with any third-party services or analytics platforms. We do not share 
            any data with external parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">App Permissions</h2>
          <p className="mb-4">
            GrowthKit requires minimal device permissions:
          </p>
          <ul className="list-disc pl-6">
            <li>Storage access (for local data storage only)</li>
            <li>No access to contacts, location, or other sensitive information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to Privacy Policy</h2>
          <p>
            Any updates to this privacy policy will be reflected in the app and on our website. Users will be 
            notified of significant changes through app updates.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about our privacy policy or data handling practices, please contact us at:
            <br />
            <a href="mailto:hey@heyvish.com" className="text-primary hover:underline">
              hey@heyvish.com
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Compliance</h2>
          <p>
            This privacy policy complies with the requirements of the Apple App Store and Google Play Store. 
            We are committed to protecting your privacy and maintaining the security of your personal information.
          </p>
        </section>
      </div>
    </div>
  )
} 