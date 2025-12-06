import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>
            We've sent you a confirmation email
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Please check your inbox and click the confirmation link to verify your account.
          </p>
          <p className="text-sm text-muted-foreground">
            Don't forget to check your spam folder if you don't see the email.
          </p>
          <div className="pt-4">
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
