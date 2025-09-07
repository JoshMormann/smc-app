'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { MainSearch } from '@/ui/components/MainSearch'
import { ActionBar } from '@/ui/components/ActionBar'
import { Button } from '@/ui/components/Button'
import { Avatar } from '@/ui/components/Avatar'
import { DropdownMenu } from '@/ui/components/DropdownMenu'
import { Breadcrumbs } from '@/ui/components/Breadcrumbs'
import { FeatherSearch, FeatherStar, FeatherPlus, FeatherLogOut, FeatherSettings } from '@subframe/core'
import * as SubframeCore from "@subframe/core"
import { useAuth } from '@/lib/auth/context'

interface AuthAwareMainNavigationProps {
  logo?: string
  breadcrumbs?: React.ReactNode
  className?: string
}

export function AuthAwareMainNavigation({ 
  logo = "https://res.cloudinary.com/subframe/image/upload/v1755835889/uploads/15654/omtpskog4glajk11lbwm.svg",
  breadcrumbs,
  className = ""
}: AuthAwareMainNavigationProps) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const isAuthenticated = !!user && !loading

  const handleSignOut = async () => {
    await signOut()
    router.push('/discover')
  }

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
    <div className={`flex w-full items-center justify-between px-6 py-4 ${className}`}>
      <div className="flex items-center gap-6">
        {logo && (
          <img className="h-8 w-8 flex-none object-cover" src={logo} alt="SMC Logo" />
        )}
        <div className="items-center gap-6 hidden lg:flex xl:flex 2xl:flex sm:hidden md:hidden">
          {breadcrumbs || defaultBreadcrumbs}
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-4 pl-5 grow">
        <MainSearch
          className="h-auto grow shrink-0 basis-0"
          disabled={false}
          error={false}
          variant="filled"
          label=""
          helpText=""
          icon={<FeatherSearch />}
        >
          <MainSearch.Input placeholder="Search SREF Codes..." />
        </MainSearch>
        
        <ActionBar
          authenticated={isAuthenticated}
          actions={
            isAuthenticated ? (
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar
                      variant="brand"
                      size="medium"
                      image={user?.user_metadata?.avatar_url}
                      square={false}
                    >
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                    <FeatherPlus className="text-body font-body text-default-font" />
                  </div>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="end"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon={<FeatherStar />}>
                        Favorites
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={<FeatherPlus />}>
                        Add SREF
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon={<FeatherSettings />}>
                        Settings
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem 
                        icon={<FeatherLogOut />}
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  className="h-12 w-auto flex-none"
                  variant="neutral-secondary"
                  size="large"
                  onClick={() => router.push('/auth/signin')}
                  loading={loading}
                >
                  Log In
                </Button>
                <Button 
                  className="h-12 w-auto flex-none" 
                  size="large"
                  onClick={() => router.push('/auth/signup')}
                  loading={loading}
                >
                  Get Started
                </Button>
              </div>
            )
          }
        />
      </div>
    </div>
  )
}