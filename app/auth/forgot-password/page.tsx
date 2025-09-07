'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Avatar } from '@/ui/components/Avatar'
import { Button } from '@/ui/components/Button'
import { LinkButton } from '@/ui/components/LinkButton'
import { SampleUserProfile } from '@/ui/components/SampleUserProfile'
import { TextField } from '@/ui/components/TextField'
import { useAuth } from '@/lib/auth/context'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { resetPassword } = useAuth()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const { error } = await resetPassword(email)
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    
    setLoading(false)
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
                  We&apos;ve sent password reset instructions to {email}. Please check your email and follow the link to reset your password.
                </span>
              </div>
              
              <div className="flex flex-wrap items-start gap-2">
                <span className="text-body font-body text-subtext-color">
                  Remember your password?
                </span>
                <Link href="/auth/signin">
                  <LinkButton variant="brand">
                    Sign In
                  </LinkButton>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex grow shrink-0 basis-0 items-center justify-center gap-12 self-stretch bg-brand-primary-600 px-12 py-12">
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
                Reset your password
              </span>
              <span className="text-body font-body text-subtext-color text-center">
                Enter the email address associated with your account and we&apos;ll send you a link to reset your password
              </span>
            </div>
            
            {error && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleResetPassword} className="flex w-full flex-col items-start justify-center gap-6">
              <TextField
                className="h-auto w-full flex-none"
                label="Email address"
                helpText=""
              >
                <TextField.Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </TextField>
              
              <Button
                className="h-11 w-full flex-none"
                size="large"
                type="submit"
                loading={loading}
              >
                Send reset instructions
              </Button>
            </form>
            
            <div className="flex flex-wrap items-start gap-2">
              <span className="text-body font-body text-subtext-color">
                Remember your password?
              </span>
              <Link href="/auth/signin">
                <LinkButton variant="brand">
                  Sign In
                </LinkButton>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex grow shrink-0 basis-0 items-center justify-center gap-12 self-stretch bg-brand-primary-600 px-12 py-12">
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