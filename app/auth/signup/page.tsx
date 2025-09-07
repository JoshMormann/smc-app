'use client'

import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Avatar } from '@/ui/components/Avatar'
import { Button } from '@/ui/components/Button'
import { LinkButton } from '@/ui/components/LinkButton'
import { OAuthSocialButton } from '@/ui/components/OAuthSocialButton'
import { TextField } from '@/ui/components/TextField'
import { SampleUserProfile } from '@/ui/components/SampleUserProfile'
import { useAuth } from '@/lib/auth/context'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { signUp, signInWithProvider } = useAuth()
  // const router = useRouter()

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const { error } = await signUp(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    
    setLoading(false)
  }

  const handleOAuthSignUp = async (provider: 'google' | 'discord') => {
    setError('')
    const { error } = await signInWithProvider(provider)
    if (error) {
      setError(error.message)
    }
  }

  if (success) {
    return (
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-start mobile:flex-col mobile:flex-wrap mobile:gap-0">
          <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-6 self-stretch px-12 py-12">
            <img
              className="h-12 flex-none object-cover"
              src="https://res.cloudinary.com/subframe/image/upload/v1755835889/uploads/15654/omtpskog4glajk11lbwm.svg"
              alt="SMC Logo"
            />
            <div className="flex w-full max-w-[448px] flex-col items-center justify-center gap-8">
              <div className="flex w-full flex-col items-center justify-center gap-2">
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Check your email
                </span>
                <span className="text-body font-body text-subtext-color text-center">
                  We&apos;ve sent a confirmation link to {email}. Please check your email and click the link to activate your account.
                </span>
              </div>
              
              <div className="flex flex-wrap items-start gap-2">
                <span className="text-body font-body text-subtext-color">
                  Already have an account?
                </span>
                <Link href="/auth/signin">
                  <LinkButton variant="brand">
                    Sign In
                  </LinkButton>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex grow shrink-0 basis-0 flex-col items-center gap-12 self-stretch bg-brand-primary-600 px-12 py-12">
            <SampleUserProfile
              avatar={
                <Avatar
                  size="x-large"
                  image="https://res.cloudinary.com/subframe/image/upload/v1756175238/uploads/15654/au2s2ji3wvgintuos9ql.jpg"
                >
                  HW
                </Avatar>
              }
              name="Josh Jackson"
              title="Founder, SMC"
              sref="1234567890"
              sv="6"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-start bg-default-background">
      <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-start mobile:flex-col mobile:flex-wrap mobile:gap-0">
        <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-6 self-stretch px-12 py-12">
          <img
            className="h-12 flex-none object-cover"
            src="https://res.cloudinary.com/subframe/image/upload/v1755835889/uploads/15654/omtpskog4glajk11lbwm.svg"
            alt="SMC Logo"
          />
          <div className="flex w-full max-w-[448px] flex-col items-center justify-center gap-8">
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Sign up to start mining stylistic gold
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1">
                <span className="text-body font-body text-subtext-color">
                  By signing up you agree to the
                </span>
                <Link href="/terms">
                  <LinkButton variant="brand">
                    Terms of Service
                  </LinkButton>
                </Link>
                <span className="text-body font-body text-subtext-color">
                  and
                </span>
                <Link href="/privacy">
                  <LinkButton variant="brand">
                    Privacy Policy
                  </LinkButton>
                </Link>
              </div>
            </div>
            
            {error && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex w-full flex-col items-start justify-center gap-2">
              <OAuthSocialButton
                className="h-10 w-full flex-none"
                logo="https://res.cloudinary.com/subframe/image/upload/v1711417516/shared/z0i3zyjjqkobzuaecgno.svg"
                onClick={() => handleOAuthSignUp('google')}
              >
                Sign up with Google
              </OAuthSocialButton>
              <OAuthSocialButton
                className="h-10 w-full flex-none"
                logo="https://res.cloudinary.com/subframe/image/upload/v1711417557/shared/mzkntataoyfxy54okty4.png"
                onClick={() => handleOAuthSignUp('discord')}
              >
                Sign up with Discord
              </OAuthSocialButton>
            </div>
            
            <div className="flex w-full items-center gap-2">
              <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />
              <span className="text-body font-body text-subtext-color">
                or continue with email
              </span>
              <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />
            </div>
            
            <form onSubmit={handleEmailSignUp} className="flex w-full flex-col items-start justify-center gap-6">
              <TextField
                className="h-auto w-full flex-none"
                label="Email address"
                helpText=""
              >
                <TextField.Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </TextField>
              
              <TextField
                className="h-auto w-full flex-none"
                label="Password"
                helpText=""
              >
                <TextField.Input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </TextField>
              
              <Button
                className="h-11 w-full flex-none"
                size="large"
                type="submit"
                loading={loading}
              >
                Continue
              </Button>
            </form>
            
            <div className="flex flex-wrap items-start gap-2">
              <span className="text-body font-body text-subtext-color">
                Already have an account?
              </span>
              <Link href="/auth/signin">
                <LinkButton variant="brand">
                  Sign In
                </LinkButton>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex grow shrink-0 basis-0 flex-col items-center gap-12 self-stretch bg-brand-primary-600 px-12 py-12">
          <SampleUserProfile
            avatar={
              <Avatar
                size="x-large"
                image="https://res.cloudinary.com/subframe/image/upload/v1756175238/uploads/15654/au2s2ji3wvgintuos9ql.jpg"
              >
                HW
              </Avatar>
            }
            name="Josh Jackson"
            title="Founder, SMC"
            sref="1234567890"
            sv="6"
          />
        </div>
      </div>
    </div>
  )
}