'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { SideBarNavigation } from '@/ui/components/SideBarNavigation'
import { IconButton } from '@/ui/components/IconButton'
import { FeatherCompass, FeatherHeart, FeatherLibraryBig, FeatherLogOut, FeatherLogIn } from '@subframe/core'
import { useAuth } from '@/lib/auth/context'

interface AuthAwareSideBarNavigationProps {
  className?: string
}

export function AuthAwareSideBarNavigation({ className }: AuthAwareSideBarNavigationProps) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isAuthenticated = !!user && !loading

  const handleNavigation = (page: 'discover' | 'favorites' | 'library') => {
    if (page === 'favorites' || page === 'library') {
      if (!isAuthenticated) {
        router.push('/auth/signin')
        return
      }
      router.push(`/${page}`)
    } else if (page === 'discover') {
      router.push('/discover')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/discover')
  }

  const handleAuth = () => {
    if (isAuthenticated) {
      handleSignOut()
    } else {
      router.push('/auth/signin')
    }
  }

  const isActive = (path: string) => {
    if (path === 'discover') {
      return pathname === '/discover' || pathname === '/'
    }
    return pathname.startsWith(`/${path}`)
  }

  return (
    <SideBarNavigation
      className={className}
      mainActions={
        <>
          <IconButton
            variant={isActive('discover') ? "brand-primary" : "default"}
            size="large"
            icon={<FeatherCompass />}
            onClick={() => handleNavigation('discover')}
          />
          <IconButton
            variant={isActive('favorites') ? "brand-primary" : "default"}
            size="large"
            icon={<FeatherHeart />}
            onClick={() => handleNavigation('favorites')}
            disabled={!isAuthenticated}
            className={!isAuthenticated ? 'opacity-50' : ''}
          />
          <IconButton
            variant={isActive('library') ? "brand-primary" : "default"}
            size="large"
            icon={<FeatherLibraryBig />}
            onClick={() => handleNavigation('library')}
            disabled={!isAuthenticated}
            className={!isAuthenticated ? 'opacity-50' : ''}
          />
        </>
      }
      bottomAction={
        <IconButton
          size="large"
          icon={isAuthenticated ? <FeatherLogOut /> : <FeatherLogIn />}
          onClick={handleAuth}
          loading={loading}
          title={isAuthenticated ? 'Sign Out' : 'Sign In'}
        />
      }
    />
  )
}