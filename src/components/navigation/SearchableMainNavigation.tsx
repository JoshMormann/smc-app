'use client'

import React, { useState, useCallback } from 'react'
import { IconButton } from '@/ui/components/IconButton'
import { FeatherSearch, FeatherListFilter } from '@subframe/core'
import * as SubframeCore from '@subframe/core'
import * as SubframeUtils from '@/ui/utils'
import { AuthAwareActionBar } from './AuthAwareActionBar'
import { useDebounce } from '@/lib/hooks/useDebounce'

interface SearchableMainNavigationProps {
  logo?: string
  breadcrumbs?: React.ReactNode
  onSearchChange?: (searchTerm: string) => void
  onFilterToggle?: () => void
  isFilterActive?: boolean
  className?: string
}

export function SearchableMainNavigation({ 
  logo = "https://res.cloudinary.com/subframe/image/upload/v1755835889/uploads/15654/omtpskog4glajk11lbwm.svg",
  breadcrumbs,
  onSearchChange,
  onFilterToggle,
  isFilterActive = false,
  className
}: SearchableMainNavigationProps) {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Debounce search to avoid excessive filtering
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Call the parent's search handler when debounced value changes
  React.useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, onSearchChange])

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  const handleFilterClick = useCallback(() => {
    if (onFilterToggle) {
      onFilterToggle()
    }
  }, [onFilterToggle])

  // Create custom search component that mimics MainSearch but with clickable filter button
  return (
    <div className={SubframeUtils.twClassNames(
      "flex w-full items-center justify-between px-6 py-4",
      className
    )}>
      <div className="flex items-center gap-6">
        {logo ? (
          <img className="h-8 w-8 flex-none object-cover" src={logo} alt="Logo" />
        ) : null}
        {breadcrumbs ? (
          <div className="items-center gap-6 hidden lg:flex xl:flex 2xl:flex sm:hidden md:hidden">
            {breadcrumbs}
          </div>
        ) : null}
      </div>
      
      <div className="flex items-center justify-center gap-4 pl-5 grow">
        {/* Custom search component with clickable filter */}
        <label className="group/search flex flex-col items-start gap-1 h-auto grow shrink-0 basis-0">
          <div className={SubframeUtils.twClassNames(
            "flex w-full items-center gap-1 rounded-md border border-solid border-neutral-100 bg-neutral-border px-2 py-1.5",
            "group-hover/search:border group-hover/search:border-solid group-hover/search:border-neutral-border",
            "group-focus-within/search:bg-default-background group-focus-within/search:border group-focus-within/search:border-solid group-focus-within/search:border-brand"
          )}>
            <SubframeCore.IconWrapper className="text-large-button font-large-button text-subtext-color">
              <FeatherSearch />
            </SubframeCore.IconWrapper>
            
            <div className="flex grow shrink-0 basis-0 flex-col items-start self-stretch px-1">
              <input
                className="h-full w-full border-none bg-transparent py-0.5 text-heading-2---light font-heading-2---light text-subtext-color outline-none placeholder:text-neutral-400"
                placeholder="Search SREF Codes..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <IconButton
              disabled={false}
              variant={isFilterActive ? "brand-primary" : "neutral-tertiary"}
              size="medium"
              icon={<FeatherListFilter />}
              loading={false}
              onClick={handleFilterClick}
            />
          </div>
        </label>
        
        <div className="flex items-center justify-center gap-4">
          <AuthAwareActionBar />
        </div>
      </div>
    </div>
  )
}