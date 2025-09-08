'use client'

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ActionBar } from '@/ui/components/ActionBar'
import { useAuth } from '@/lib/auth/context'

interface AuthAwareActionBarProps {
  className?: string
}

export function AuthAwareActionBar({ className }: AuthAwareActionBarProps) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const isAuthenticated = !!user && !loading
  const actionBarRef = useRef<HTMLDivElement>(null)

  const handleClick = async (event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    const button = target.closest('button')
    
    // Handle buttons first
    if (button) {
      const buttonText = button.textContent?.trim()
      
      // Handle unauthenticated state buttons
      if (!isAuthenticated) {
        event.preventDefault()
        if (buttonText === 'Log In') {
          router.push('/auth/signin')
        } else if (buttonText === 'Get Started') {
          router.push('/auth/signup')
        }
        return
      }

      // Handle authenticated state buttons
      if (buttonText === 'Add') {
        event.preventDefault()
        console.log('Add SREF clicked')
        // TODO: Implement add SREF functionality
        return
      }
    }

    // Handle dropdown menu items
    const menuItem = target.closest('[role="menuitem"]')
    if (menuItem) {
      const itemText = menuItem.textContent?.trim()
      console.log('Menu item clicked:', itemText)
      
      // Prevent default behavior and stop propagation
      event.preventDefault()
      event.stopPropagation()
      
      switch (itemText) {
        case 'Profile':
          console.log('Profile clicked')
          // TODO: Navigate to profile page
          break
        case 'Account Settings':
          console.log('Settings clicked')
          // TODO: Navigate to settings page
          break
        case 'Log Out':
          console.log('Signing out...')
          try {
            await signOut()
            console.log('Sign out completed, redirecting...')
            router.push('/discover')
          } catch (error) {
            console.error('Sign out error:', error)
          }
          break
      }
    }
  }

  return (
    <div ref={actionBarRef} onClick={handleClick}>
      <ActionBar 
        authenticated={isAuthenticated}
        className={className}
      />
    </div>
  )
}