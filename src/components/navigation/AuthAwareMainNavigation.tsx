'use client'

import React from 'react'
import { MainNavigation } from '@/ui/components/MainNavigation'
import { Breadcrumbs } from '@/ui/components/Breadcrumbs'
import { AuthAwareActionBar } from './AuthAwareActionBar'

interface AuthAwareMainNavigationProps {
  logo?: string
  breadcrumbs?: React.ReactNode
  className?: string
}

export function AuthAwareMainNavigation({ 
  logo = "https://res.cloudinary.com/subframe/image/upload/v1755835889/uploads/15654/omtpskog4glajk11lbwm.svg",
  breadcrumbs,
  className
}: AuthAwareMainNavigationProps) {
  // Default breadcrumbs if none provided
  const defaultBreadcrumbs = (
    <Breadcrumbs>
      <Breadcrumbs.Item main="top-nav">
        SREF Mining Company
      </Breadcrumbs.Item>
      <Breadcrumbs.Divider />
      <Breadcrumbs.Item main="top-nav-active-true">
        Discover
      </Breadcrumbs.Item>
    </Breadcrumbs>
  )

  return (
    <MainNavigation
      logo={logo}
      breadcrumbs={breadcrumbs || defaultBreadcrumbs}
      actions={<AuthAwareActionBar />}
      className={className}
    />
  )
}