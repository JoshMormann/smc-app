'use client'

import React from 'react'
import * as SubframeUtils from '@/ui/utils'
import { TagContainer } from '@/ui/components/TagContainer'

interface DynamicCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  styleReferenceCards?: React.ReactNode
  className?: string
}

const DynamicCardGrid = React.forwardRef<HTMLDivElement, DynamicCardGridProps>(
  function DynamicCardGrid(
    { styleReferenceCards, className, ...otherProps }: DynamicCardGridProps,
    ref
  ) {
    return styleReferenceCards ? (
      <div
        className={`w-full rounded-t-lg bg-neutral-border px-3 pt-3 columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-x-4 ${className || ''}`}
        ref={ref}
        {...otherProps}
      >
        {styleReferenceCards}
      </div>
    ) : null
  }
)

interface DynamicStyleReferenceGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  styleReferenceCards?: React.ReactNode
  tags?: React.ReactNode
  tagsVisible?: boolean
  className?: string
}

const DynamicStyleReferenceGallery = React.forwardRef<
  HTMLDivElement,
  DynamicStyleReferenceGalleryProps
>(function DynamicStyleReferenceGallery(
  {
    styleReferenceCards,
    tags,
    tagsVisible = false,
    className,
    ...otherProps
  }: DynamicStyleReferenceGalleryProps,
  ref
) {
  return (
    <div
      className={`group/777d7078 flex h-full w-full grow items-start gap-5 transition ease-in-out duration-700 ${className || ''}`}
      ref={ref}
      {...otherProps}
    >
      <DynamicCardGrid styleReferenceCards={styleReferenceCards} />
      <TagContainer
        className={SubframeUtils.twClassNames("hidden", { flex: tagsVisible })}
        tags={tags}
      />
    </div>
  )
})

export { DynamicStyleReferenceGallery }