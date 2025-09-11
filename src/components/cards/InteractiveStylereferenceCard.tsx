'use client'

import React, { useState } from 'react'
import { StylereferenceCard } from '@/ui/components/StylereferenceCard'
import { IconButton } from '@/ui/components/IconButton'
import { FeatherHeart, FeatherHeartPlus, FeatherX, FeatherCopy } from '@subframe/core'

interface InteractiveStylereferenceCardProps {
  srefTitle?: React.ReactNode
  srefValue?: React.ReactNode
  svValue?: React.ReactNode
  tags?: React.ReactNode
  images?: React.ReactNode
  variant?: "preview-4" | "preview-3" | "preview-2" | "preview-1" | "favorites-empty" | "library-save"
  isFavorited?: boolean
  onCopy?: () => void
  onFavorite?: () => void
  onTagClick?: (tag: string) => void
  className?: string
}

export function InteractiveStylereferenceCard({
  srefTitle,
  srefValue,
  svValue,
  tags,
  images,
  variant = "preview-4",
  isFavorited = false,
  onCopy,
  onFavorite,
  className
}: InteractiveStylereferenceCardProps) {
  const [isHoveringHeart, setIsHoveringHeart] = useState(false)
  
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Define clickable areas based on button positions
    const heartButtonArea = { x: 8, y: 8, width: 48, height: 48 } // top-2 left-2 w-12 h-12
    const copyButtonArea = { x: rect.width - 56, y: 8, width: 48, height: 48 } // top-2 right-2 w-12 h-12
    
    // Check if clicked in heart button area
    if (x >= heartButtonArea.x && x <= heartButtonArea.x + heartButtonArea.width &&
        y >= heartButtonArea.y && y <= heartButtonArea.y + heartButtonArea.height) {
      e.stopPropagation()
      onFavorite?.()
      return
    }
    
    // Check if clicked in copy button area
    if (x >= copyButtonArea.x && x <= copyButtonArea.x + copyButtonArea.width &&
        y >= copyButtonArea.y && y <= copyButtonArea.y + copyButtonArea.height) {
      e.stopPropagation()
      onCopy?.()
      return
    }
    
    // Check if clicked on a tag button
    if (target.closest('button') && !target.closest('[data-card-click]')) {
      return // Let the tag button handle it
    }
    
    // Default: copy action for clicking anywhere else on the card
    onCopy?.()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Check if hovering over heart area
    const heartButtonArea = { x: 8, y: 8, width: 48, height: 48 }
    const isInHeartArea = x >= heartButtonArea.x && x <= heartButtonArea.x + heartButtonArea.width &&
                         y >= heartButtonArea.y && y <= heartButtonArea.y + heartButtonArea.height
    
    setIsHoveringHeart(isInHeartArea)
  }

  const handleMouseLeave = () => {
    setIsHoveringHeart(false)
  }

  // Determine which heart icon to show
  const getHeartIcon = () => {
    if (!isFavorited) {
      // Not favorited: HeartPlus → Heart on hover
      return isHoveringHeart ? <FeatherHeart /> : <FeatherHeartPlus />
    } else {
      // Favorited: Heart → X on hover (to remove)
      return isHoveringHeart ? <FeatherX /> : <FeatherHeart />
    }
  }
  
  return (
    <div 
      className={`relative group/interactive ${className || ''}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-card-click
    >
      <div className="[&_.group\/f31138e0>div>button]:!hidden">
        <StylereferenceCard
          srefTitle={srefTitle}
          srefValue={srefValue}
          svValue={svValue}
          variant={variant}
          tags={tags}
          images={images}
        />
      </div>
      
      {/* Custom heart IconButton - clean like original */}
      <IconButton
        className="absolute top-2 left-2 opacity-0 group-hover/interactive:opacity-100 group-hover/f31138e0:opacity-100 transition-opacity z-30 pointer-events-none"
        variant="neutral-tertiary"
        size="large"
        icon={getHeartIcon()}
        loading={false}
        disabled={false}
        style={{ color: isFavorited ? '#ef4444' : undefined }}
      />
      
      {/* Copy IconButton - clean like original */}
      <IconButton
        className="absolute top-2 right-2 opacity-0 group-hover/interactive:opacity-100 group-hover/f31138e0:opacity-100 transition-opacity z-30 pointer-events-none"
        variant="neutral-tertiary"
        size="large"
        icon={<FeatherCopy />}
        loading={false}
        disabled={false}
      />
    </div>
  )
}