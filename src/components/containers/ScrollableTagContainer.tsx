'use client'

import React from 'react'
import { TagContainer } from '@/ui/components/TagContainer'
import * as SubframeUtils from '@/ui/utils'

interface ScrollableTagContainerProps {
  tags?: React.ReactNode
  className?: string
}

export function ScrollableTagContainer({ 
  tags, 
  className 
}: ScrollableTagContainerProps) {
  return (
    <TagContainer
      className={SubframeUtils.twClassNames(
        // Add scrollable styling to the base TagContainer
        "overflow-y-auto max-h-[calc(100vh-200px)]",
        className
      )}
      tags={tags}
    />
  )
}