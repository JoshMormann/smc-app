'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { SideBarNavigation } from '@/ui/components/SideBarNavigation'
import { IconButton } from '@/ui/components/IconButton'
import { DropdownMenu } from '@/ui/components/DropdownMenu'
import { FeatherCompass, FeatherHeart, FeatherLibraryBig, FeatherMenu } from '@subframe/core'
import * as SubframeCore from '@subframe/core'
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


  const isActive = (path: string) => {
    if (path === 'discover') {
      return pathname === '/discover' || pathname === '/'
    }
    return pathname.startsWith(`/${path}`)
  }

  const isMenuActive = () => {
    const menuPaths = ['/about', '/pricing', '/faq', '/privacy', '/terms']
    return menuPaths.some(path => pathname === path)
  }

  const handleMenuClick = (page: 'about' | 'pricing' | 'faq' | 'privacy' | 'terms') => {
    router.push(`/${page}`)
  }

  return (
    <SideBarNavigation
      className={className}
      mainActions={
        <>
          <IconButton
            variant={isActive('discover') ? "brand-primary" : "neutral-primary"}
            size="large"
            icon={<FeatherCompass />}
            onClick={() => handleNavigation('discover')}
          />
          <IconButton
            variant={isActive('favorites') ? "brand-primary" : "neutral-primary"}
            size="large"
            icon={<FeatherHeart />}
            onClick={() => handleNavigation('favorites')}
            disabled={!isAuthenticated}
            className={!isAuthenticated ? 'opacity-50' : ''}
          />
          <IconButton
            variant={isActive('library') ? "brand-primary" : "neutral-primary"}
            size="large"
            icon={<FeatherLibraryBig />}
            onClick={() => handleNavigation('library')}
            disabled={!isAuthenticated}
            className={!isAuthenticated ? 'opacity-50' : ''}
          />
        </>
      }
      bottomAction={
        <SubframeCore.DropdownMenu.Root>
          <SubframeCore.DropdownMenu.Trigger asChild>
            <IconButton
              variant={isMenuActive() ? "brand-primary" : "neutral-primary"}
              size="large"
              icon={<FeatherMenu />}
            />
          </SubframeCore.DropdownMenu.Trigger>
          <SubframeCore.DropdownMenu.Content align="center" side="top" sideOffset={8}>
            <DropdownMenu>
              <DropdownMenu.DropdownItem 
                onClick={() => handleMenuClick('about')}
                icon={null}
                className={pathname === '/about' ? 'bg-brand-primary-50 text-brand-primary-600 font-medium' : ''}
              >
                About Us
              </DropdownMenu.DropdownItem>
              <DropdownMenu.DropdownItem 
                onClick={() => handleMenuClick('pricing')}
                icon={null}
                className={pathname === '/pricing' ? 'bg-brand-primary-50 text-brand-primary-600 font-medium' : ''}
              >
                Pricing
              </DropdownMenu.DropdownItem>
              <DropdownMenu.DropdownItem 
                onClick={() => handleMenuClick('faq')}
                icon={null}
                className={pathname === '/faq' ? 'bg-brand-primary-50 text-brand-primary-600 font-medium' : ''}
              >
                FAQ
              </DropdownMenu.DropdownItem>
              <DropdownMenu.DropdownDivider />
              <DropdownMenu.DropdownItem 
                onClick={() => handleMenuClick('privacy')}
                icon={null}
                className={pathname === '/privacy' ? 'bg-brand-primary-50 text-brand-primary-600 font-medium' : ''}
              >
                Privacy Policy
              </DropdownMenu.DropdownItem>
              <DropdownMenu.DropdownItem 
                onClick={() => handleMenuClick('terms')}
                icon={null}
                className={pathname === '/terms' ? 'bg-brand-primary-50 text-brand-primary-600 font-medium' : ''}
              >
                Terms & Conditions
              </DropdownMenu.DropdownItem>
            </DropdownMenu>
          </SubframeCore.DropdownMenu.Content>
        </SubframeCore.DropdownMenu.Root>
      }
    />
  )
}