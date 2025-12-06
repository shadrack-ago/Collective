import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: December 2024
        </p>

        <div className="prose prose-slate max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground">
              AI Collective Kenya ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our community platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-2 mt-4">2.1 Information You Provide</h3>
            <p className="text-muted-foreground mb-2">When you register for our platform, we collect:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Full Name</strong> - To personalize your experience and identify you in our community</li>
              <li><strong>Email Address</strong> - For account authentication, communication, and event notifications</li>
              <li><strong>Organization</strong> (optional) - To understand our community composition</li>
              <li><strong>Role/Title</strong> (optional) - To better connect you with relevant opportunities</li>
              <li><strong>Profile Information</strong> (optional) - Bio, avatar, and other profile details you choose to add</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Login timestamps and activity logs</li>
              <li>Device information and browser type</li>
              <li>IP address for security purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-2">We use your information to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Provide Services</strong> - Create and manage your account, provide access to platform features</li>
              <li><strong>Communication</strong> - Send event notifications, community updates, and important announcements</li>
              <li><strong>Community Building</strong> - Connect you with other AI enthusiasts and relevant opportunities</li>
              <li><strong>Improve Platform</strong> - Analyze usage patterns to enhance user experience</li>
              <li><strong>Security</strong> - Protect against unauthorized access and ensure platform integrity</li>
              <li><strong>Legal Compliance</strong> - Meet legal obligations and enforce our terms of service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold mb-2 mt-4">4.1 Within the Community</h3>
            <p className="text-muted-foreground">
              Your name and profile information may be visible to other registered members of AI Collective Kenya 
              to facilitate networking and community engagement.
            </p>

            <h3 className="text-xl font-semibold mb-2 mt-4">4.2 With Third Parties</h3>
            <p className="text-muted-foreground mb-2">We share data with:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Supabase</strong> - Our database and authentication provider</li>
              <li><strong>Service Providers</strong> - Hosting and infrastructure services</li>
              <li><strong>Legal Authorities</strong> - When required by law or to protect rights</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">4.3 We Never</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Sell your personal information to third parties</li>
              <li>Use your email for spam or unsolicited marketing</li>
              <li>Share your data without your consent (except as legally required)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information for as long as your account is active or as needed to provide 
              services. You can request account deletion at any time by contacting us. After deletion, we may 
              retain certain information for legal compliance, dispute resolution, and fraud prevention.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground mb-2">You have the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li><strong>Access</strong> - Request a copy of your personal data</li>
              <li><strong>Update</strong> - Modify your profile information at any time</li>
              <li><strong>Delete</strong> - Request deletion of your account and data</li>
              <li><strong>Opt-out</strong> - Unsubscribe from event notifications (while maintaining account access)</li>
              <li><strong>Portability</strong> - Request your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Encrypted data transmission (HTTPS/SSL)</li>
              <li>Secure password hashing and authentication</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and monitoring</li>
              <li>Data backup and recovery procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              We use essential cookies for authentication and session management. We do not use tracking 
              cookies or third-party analytics that compromise your privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our platform is not intended for users under 16 years of age. We do not knowingly collect 
              information from children. If we learn we have collected information from a child under 16, 
              we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. International Data Transfers</h2>
            <p className="text-muted-foreground">
              Your data may be processed and stored outside Kenya. We ensure appropriate safeguards are in 
              place when transferring data internationally.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">11. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of significant changes 
              via email or platform notification. Your continued use of the platform after changes constitutes 
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">12. Contact Us</h2>
            <p className="text-muted-foreground mb-2">
              For questions about this Privacy Policy or to exercise your rights, contact us:
            </p>
            <ul className="list-none pl-0 text-muted-foreground space-y-1">
              <li><strong>Email:</strong> privacy@aicollectivekenya.org (update with actual email)</li>
              <li><strong>WhatsApp:</strong> <a href="https://chat.whatsapp.com/H6YPQcfWQvBG81rCyKEL3J" className="text-primary hover:underline">Community Group</a></li>
              <li><strong>Address:</strong> Nairobi, Kenya (update with actual address if needed)</li>
            </ul>
          </section>

          <section className="bg-slate-100 p-6 rounded-lg mt-8">
            <h2 className="text-2xl font-semibold mb-3">Your Consent</h2>
            <p className="text-muted-foreground">
              By registering for and using AI Collective Kenya's platform, you acknowledge that you have read, 
              understood, and agree to this Privacy Policy. You consent to the collection, use, and processing 
              of your personal information as described herein.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-8 border-t">
          <Link href="/terms">
            <Button variant="link">View Terms of Service →</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
