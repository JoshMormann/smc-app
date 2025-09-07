'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Avatar } from '@/ui/components/Avatar'
import { Button } from '@/ui/components/Button'
import { LinkButton } from '@/ui/components/LinkButton'
import { SampleUserProfile } from '@/ui/components/SampleUserProfile'
import { TextField } from '@/ui/components/TextField'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if we have the proper session for password reset
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        // If no session, redirect to forgot password page
        router.push('/auth/forgot-password')
      }
    }
    
    checkSession()
  }, [router, supabase.auth])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.updateUser({
      password: password
    })
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      // Redirect to sign in page after a short delay
      setTimeout(() => {
        router.push('/auth/signin')
      }, 2000)
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
                  Password updated successfully
                </span>
                <span className="text-body font-body text-subtext-color text-center">
                  Your password has been reset. You&apos;ll be redirected to the sign in page shortly.
                </span>
              </div>
              
              <div className="flex flex-wrap items-start gap-2">
                <span className="text-body font-body text-subtext-color">
                  Return to
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
                Create new password
              </span>
              <span className="text-body font-body text-subtext-color text-center">
                Create a new password for your account. Ensure it&apos;s strong and unique.
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
                label="New password"
                helpText="Use at least 8 characters with a mix of letters, numbers, and symbols"
              >
                <TextField.Input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </TextField>
              
              <TextField
                className="h-auto w-full flex-none"
                label="Confirm new password"
                helpText="Re-enter your new password to confirm"
              >
                <TextField.Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </TextField>
              
              <Button
                className="h-11 w-full flex-none"
                size="large"
                type="submit"
                loading={loading}
              >
                Reset password
              </Button>
            </form>
            
            <div className="flex flex-wrap items-start gap-2">
              <span className="text-body font-body text-subtext-color">
                Return to
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