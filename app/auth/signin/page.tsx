'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/ui/components/Button'
import { LinkButton } from '@/ui/components/LinkButton'
import { OAuthSocialButton } from '@/ui/components/OAuthSocialButton'
import { TextField } from '@/ui/components/TextField'
import { ToggleGroup } from '@/ui/components/ToggleGroup'
import { useAuth } from '@/lib/auth/context'
import { AuthSrefShowcase } from '@/components/auth/AuthSrefShowcase'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { signIn, signInWithProvider } = useAuth()
  const router = useRouter()

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      router.push('/discover')
    }
    
    setLoading(false)
  }

  const handleOAuthSignIn = async (provider: 'google' | 'discord') => {
    setError('')
    const { error } = await signInWithProvider(provider)
    if (error) {
      setError(error.message)
    }
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
                Sign in to your account
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1">
                <span className="text-body font-body text-subtext-color">
                  Don&apos;t have an account?
                </span>
                <Link href="/auth/signup">
                  <LinkButton variant="brand">
                    Sign up
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
                onClick={() => handleOAuthSignIn('google')}
              >
                Sign in with Google
              </OAuthSocialButton>
              <OAuthSocialButton
                className="h-10 w-full flex-none"
                logo="https://res.cloudinary.com/subframe/image/upload/v1711417557/shared/mzkntataoyfxy54okty4.png"
                onClick={() => handleOAuthSignIn('discord')}
              >
                Sign in with Discord
              </OAuthSocialButton>
            </div>
            
            <div className="flex w-full items-center gap-2">
              <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />
              <span className="text-body font-body text-subtext-color">
                or continue with email
              </span>
              <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />
            </div>
            
            <form onSubmit={handleEmailSignIn} className="flex w-full flex-col items-start justify-center gap-6">
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
              
              <TextField
                className="h-auto w-full flex-none"
                label="Password"
                helpText=""
              >
                <TextField.Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </TextField>
              
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <ToggleGroup value={rememberMe} onValueChange={setRememberMe}>
                    <ToggleGroup.Item icon={null} value="remember">
                      Remember me
                    </ToggleGroup.Item>
                  </ToggleGroup>
                </div>
                <Link href="/auth/forgot-password">
                  <LinkButton variant="brand">
                    Forgot password?
                  </LinkButton>
                </Link>
              </div>
              
              <Button
                className="h-11 w-full flex-none"
                size="large"
                type="submit"
                loading={loading}
              >
                Sign in
              </Button>
            </form>
          </div>
        </div>
        
        <AuthSrefShowcase />
      </div>
    </div>
  )
}