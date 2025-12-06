import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: December 2024
        </p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using the AI Collective Kenya platform, you accept and agree to be bound by 
              these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Membership</h2>
            
            <h3 className="text-xl font-semibold mb-2 mt-4">2.1 Eligibility</h3>
            <p className="text-muted-foreground">
              You must be at least 16 years old to create an account. By registering, you represent that 
              all information provided is accurate and current.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">2.2 Account Responsibilities</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Provide accurate and complete registration information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Community Guidelines</h2>
            
            <h3 className="text-xl font-semibold mb-2 mt-4">3.1 Acceptable Use</h3>
            <p className="text-muted-foreground mb-2">You agree to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Use the platform for lawful purposes only</li>
              <li>Respect other community members</li>
              <li>Contribute positively to discussions and events</li>
              <li>Maintain professional and courteous communication</li>
              <li>Respect intellectual property rights</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">3.2 Prohibited Activities</h3>
            <p className="text-muted-foreground mb-2">You may not:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Post spam, harassment, or offensive content</li>
              <li>Impersonate others or misrepresent affiliations</li>
              <li>Share false or misleading information</li>
              <li>Attempt to gain unauthorized access to the platform</li>
              <li>Use automated systems (bots) without permission</li>
              <li>Collect user data without consent</li>
              <li>Engage in commercial solicitation without approval</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Content and Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold mb-2 mt-4">4.1 Your Content</h3>
            <p className="text-muted-foreground">
              You retain ownership of content you post. By posting, you grant AI Collective Kenya a 
              non-exclusive, worldwide license to use, display, and distribute your content for platform 
              operations and community purposes.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">4.2 Platform Content</h3>
            <p className="text-muted-foreground">
              All platform content, design, and functionality are owned by AI Collective Kenya or its 
              licensors and are protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Events and Activities</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Event information is provided for convenience and may change</li>
              <li>Registration does not guarantee attendance at capacity-limited events</li>
              <li>You are responsible for your conduct at community events</li>
              <li>AI Collective Kenya reserves the right to refuse service or entry</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Privacy and Data Protection</h2>
            <p className="text-muted-foreground">
              Your use of the platform is also governed by our Privacy Policy. Please review it to 
              understand how we collect, use, and protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Disclaimers</h2>
            
            <h3 className="text-xl font-semibold mb-2 mt-4">7.1 Platform Availability</h3>
            <p className="text-muted-foreground">
              The platform is provided "as is" without warranties. We do not guarantee uninterrupted 
              or error-free service.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">7.2 Third-Party Content</h3>
            <p className="text-muted-foreground">
              We are not responsible for content posted by users or accuracy of third-party information.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">7.3 External Links</h3>
            <p className="text-muted-foreground">
              Links to external websites are provided for convenience. We are not responsible for their 
              content or practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, AI Collective Kenya shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages arising from your use 
              of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Account Termination</h2>
            
            <h3 className="text-xl font-semibold mb-2 mt-4">9.1 By You</h3>
            <p className="text-muted-foreground">
              You may close your account at any time by contacting us or using account settings.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">9.2 By Us</h3>
            <p className="text-muted-foreground">
              We may suspend or terminate your account for violations of these terms, illegal activity, 
              or at our discretion with notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may modify these terms at any time. Significant changes will be communicated via email 
              or platform notification. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Governing Law</h2>
            <p className="text-muted-foreground">
              These terms are governed by the laws of Kenya. Disputes shall be resolved in Kenyan courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Contact Information</h2>
            <p className="text-muted-foreground mb-2">
              For questions about these Terms of Service:
            </p>
            <ul className="list-none pl-0 text-muted-foreground space-y-1">
              <li><strong>Email:</strong> legal@aicollectivekenya.org (update with actual email)</li>
              <li><strong>WhatsApp:</strong> <a href="https://chat.whatsapp.com/H6YPQcfWQvBG81rCyKEL3J" className="text-primary hover:underline">Community Group</a></li>
            </ul>
          </section>

          <section className="bg-slate-100 p-6 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold mb-3">Acknowledgment</h2>
            <p className="text-muted-foreground">
              By registering for AI Collective Kenya, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-8 border-t">
          <Link href="/privacy">
            <Button variant="link">View Privacy Policy →</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
