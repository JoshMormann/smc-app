'use client'

import React from 'react'
// import { useRouter } from 'next/navigation'
import { ActionBar } from '@/ui/components/ActionBar'
import { useAuth } from '@/lib/auth/context'

interface AuthAwareActionBarProps {
  className?: string
}

export function AuthAwareActionBar({ className }: AuthAwareActionBarProps) {
  const { user, loading } = useAuth()
  const isAuthenticated = !!user && !loading

  // TODO: Add click handlers when ActionBar component supports onClick props
  return (
    <ActionBar 
      authenticated={isAuthenticated}
      className={className}
    />
  )
}