'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { DefaultPageLayout } from '@/ui/layouts/DefaultPageLayout'
import { DynamicStyleReferenceGallery } from '@/components/galleries/DynamicStyleReferenceGallery'
import { InteractiveStylereferenceCard } from '@/components/cards/InteractiveStylereferenceCard'
import { Button } from '@/ui/components/Button'
import { Breadcrumbs } from '@/ui/components/Breadcrumbs'
import { User } from '@supabase/supabase-js'
import { SearchableMainNavigation } from '@/components/navigation/SearchableMainNavigation'
import { AuthAwareSideBarNavigation } from '@/components/navigation/AuthAwareSideBarNavigation'
import { copyToClipboard, formatSrefForCopy } from '@/lib/utils/clipboard'
import { showToast } from '@/lib/utils/toast'
import { toggleFavorite, checkIfFavorited } from '@/lib/favorites'

type Variant = 'preview-1' | 'preview-2' | 'preview-3' | 'preview-4'

interface SrefCode {
  id: string
  code_value: string
  sv_version: string
  title: string
  copy_count: number
  upvotes: number
  downvotes: number
  save_count: number
  created_at: string
  code_images: Array<{
    id: string
    image_url: string
    position: number
  }>
  code_tags: Array<{
    id: string
    tag: string
  }>
}

interface DiscoverPageProps {
  user: User | null
  initialSrefCodes: SrefCode[]
}

export function DiscoverPage({ user, initialSrefCodes }: DiscoverPageProps) {
  const router = useRouter()
  const isAuthenticated = !!user
  
  // State for managing favorites, search, and filtering
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isTagCloudVisible, setIsTagCloudVisible] = useState<boolean>(false)

  // Load user's favorites on mount
  useEffect(() => {
    if (!isAuthenticated || !user) return
    
    const loadFavorites = async () => {
      const favSet = new Set<string>()
      
      for (const sref of initialSrefCodes) {
        const isFavorited = await checkIfFavorited(sref.id, user.id)
        if (isFavorited) {
          favSet.add(sref.id)
        }
      }
      
      setFavorites(favSet)
    }
    
    loadFavorites()
  }, [isAuthenticated, user, initialSrefCodes])

  const handleSrefAction = async (action: 'like' | 'copy', sref: SrefCode) => {
    if (action === 'copy') {
      // Copy functionality now requires authentication
      if (!isAuthenticated) {
        router.push('/auth/signin')
        return
      }
      
      const formattedCode = formatSrefForCopy(sref.code_value, sref.sv_version)
      const success = await copyToClipboard(formattedCode)
      
      if (success) {
        showToast(`Copied: ${formattedCode}`, { type: 'success' })
        
        // Increment copy count in database (fire and forget)
        fetch(`/api/sref/${sref.id}/copy`, { method: 'POST' })
          .catch(error => console.error('Failed to update copy count:', error))
      } else {
        showToast('Failed to copy code', { type: 'error' })
      }
      return
    }
    
    if (action === 'like') {
      if (!isAuthenticated || !user) {
        // For like/save actions, redirect to sign in
        router.push('/auth/signin')
        return
      }
      
      // Handle favorite toggle
      const result = await toggleFavorite(sref.id, user.id)
      
      if (result.success) {
        // Update local favorites state
        const newFavorites = new Set(favorites)
        if (result.isFavorited) {
          newFavorites.add(sref.id)
        } else {
          newFavorites.delete(sref.id)
        }
        setFavorites(newFavorites)
        
        showToast(result.message, { 
          type: 'success',
          duration: 2000
        })
      } else {
        showToast(result.message, { type: 'error' })
      }
      
      return
    }
  }

  // Memoized filtered codes based on search term and active tag
  const filteredSrefCodes = useMemo(() => {
    let filtered = initialSrefCodes

    // Apply search filter first
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(sref => {
        // Check title match
        const titleMatch = sref.title.toLowerCase().includes(searchLower)
        
        // Check SREF code number match (extract numbers from code_value)
        const codeMatch = sref.code_value.includes(searchTerm.trim())
        
        // Check tag matches
        const tagMatch = sref.code_tags.some(tag => 
          tag.tag.toLowerCase().includes(searchLower)
        )
        
        return titleMatch || codeMatch || tagMatch
      })
    }

    // Apply tag filter on top of search results
    if (activeTag) {
      filtered = filtered.filter(sref => 
        sref.code_tags.some(codeTag => codeTag.tag === activeTag)
      )
    }

    return filtered
  }, [initialSrefCodes, searchTerm, activeTag])

  // Extract unique tags from currently filtered codes for the tag cloud
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    filteredSrefCodes.forEach(sref => {
      sref.code_tags.forEach(tag => {
        tagSet.add(tag.tag)
      })
    })
    return Array.from(tagSet).sort()
  }, [filteredSrefCodes])

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }

  const handleFilterToggle = () => {
    setIsTagCloudVisible(!isTagCloudVisible)
  }

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      // If clicking the same tag, clear filter
      setActiveTag(null)
    } else {
      // Filter by new tag
      setActiveTag(tag)
    }
  }

  const getVariantForCount = (count: number): Variant => {
    if (count <= 1) return 'preview-1'
    if (count === 2) return 'preview-2'
    if (count === 3) return 'preview-3'
    return 'preview-4'
  }

  const renderImagesForVariant = (sref: SrefCode) => {
    const images = [...(sref.code_images || [])]
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .slice(0, 4)

    const common = 'w-full h-full grow shrink-0 basis-0 object-cover aspect-square overflow-clip'

    switch (images.length) {
      case 1:
        return (
          <img
            key={images[0].id}
            className={`${common} row-span-4 col-span-4 row-start-1`}
            src={images[0].image_url}
            alt={`SREF ${sref.title} image 1`}
          />
        )
      case 2:
        return (
          <>
            <img
              key={images[0].id}
              className={`${common} row-span-4 col-span-4 row-start-1`}
              src={images[0].image_url}
              alt={`SREF ${sref.title} image 1`}
            />
            <img
              key={images[1].id}
              className={`${common} row-span-4 col-span-4 row-start-5`}
              src={images[1].image_url}
              alt={`SREF ${sref.title} image 2`}
            />
          </>
        )
      case 3:
        return (
          <>
            <img
              key={images[0].id}
              className={`${common} row-span-4 col-span-4 row-start-1`}
              src={images[0].image_url}
              alt={`SREF ${sref.title} image 1`}
            />
            <img
              key={images[1].id}
              className={`${common} row-span-2 col-span-2 row-start-5`}
              src={images[1].image_url}
              alt={`SREF ${sref.title} image 2`}
            />
            <img
              key={images[2].id}
              className={`${common} row-span-2 col-span-2 row-start-5`}
              src={images[2].image_url}
              alt={`SREF ${sref.title} image 3`}
            />
          </>
        )
      default:
        return (
          <>
            <img
              key={images[0].id}
              className={`${common} row-span-4 col-span-4 row-start-1`}
              src={images[0].image_url}
              alt={`SREF ${sref.title} image 1`}
            />
            <img
              key={images[1].id}
              className={`${common} row-span-4 col-span-4 row-start-5`}
              src={images[1].image_url}
              alt={`SREF ${sref.title} image 2`}
            />
            <img
              key={images[2].id}
              className={`${common} row-span-2 col-span-2 row-start-9`}
              src={images[2].image_url}
              alt={`SREF ${sref.title} image 3`}
            />
            <img
              key={images[3].id}
              className={`${common} row-span-2 col-span-2 row-start-9`}
              src={images[3].image_url}
              alt={`SREF ${sref.title} image 4`}
            />
          </>
        )
    }
  }

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <SearchableMainNavigation 
          breadcrumbs={
            <Breadcrumbs>
              <Breadcrumbs.Item main="top-nav">
                SREF Mining Company
              </Breadcrumbs.Item>
              <Breadcrumbs.Divider />
              <Breadcrumbs.Item main="top-nav-active-true">
                Discover
              </Breadcrumbs.Item>
            </Breadcrumbs>
          }
          onSearchChange={handleSearchChange}
          onFilterToggle={handleFilterToggle}
          isFilterActive={isTagCloudVisible}
        />
        
        <div className="flex w-full items-start gap-5 px-5 grow">
          <AuthAwareSideBarNavigation />
          
          <DynamicStyleReferenceGallery
            tagsVisible={isTagCloudVisible}
            tags={
              <>
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={activeTag === tag ? "brand-primary" : "neutral-secondary"}
                    size="small"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </>
            }
            styleReferenceCards={
              <>
                {filteredSrefCodes.map((sref) => {
                  const variant = getVariantForCount(sref.code_images?.length || 0)
                  const isFavorited = favorites.has(sref.id)
                  
                  return (
                    <div key={sref.id} className="break-inside-avoid mb-4 relative">
                      <InteractiveStylereferenceCard
                        srefTitle={sref.title}
                        srefValue={sref.code_value}
                        svValue={sref.sv_version}
                        variant={variant}
                        isFavorited={isFavorited}
                        onCopy={() => handleSrefAction('copy', sref)}
                        onFavorite={() => handleSrefAction('like', sref)}
                        tags={
                          <>
                            {sref.code_tags.map((tag) => (
                              <Button
                                key={tag.id}
                                variant={activeTag === tag.tag ? "brand-primary" : "neutral-secondary"}
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleTagClick(tag.tag)
                                }}
                              >
                                {tag.tag}
                              </Button>
                            ))}
                          </>
                        }
                        images={renderImagesForVariant(sref)}
                      />
                    </div>
                  )
                })}
                {filteredSrefCodes.length === 0 && (searchTerm || activeTag) && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-heading-3 font-heading-3 text-subtext-color mb-2">
                      {searchTerm && activeTag 
                        ? `No SREFs found for "${searchTerm}" with tag "${activeTag}"`
                        : searchTerm 
                        ? `No SREFs found for "${searchTerm}"`
                        : `No SREFs found for tag "${activeTag}"`
                      }
                    </p>
                    <div className="flex gap-2 justify-center">
                      {searchTerm && (
                        <Button 
                          variant="neutral-secondary" 
                          onClick={() => setSearchTerm('')}
                        >
                          Clear search
                        </Button>
                      )}
                      {activeTag && (
                        <Button 
                          variant="neutral-secondary" 
                          onClick={() => setActiveTag(null)}
                        >
                          Clear tag filter
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </>
            }
          />
        </div>
      </div>
    </DefaultPageLayout>
  )
}
