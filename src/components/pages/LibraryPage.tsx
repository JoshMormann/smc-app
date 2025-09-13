'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { DefaultPageLayout } from '@/ui/layouts/DefaultPageLayout'
import { DynamicStyleReferenceGallery } from '@/components/galleries/DynamicStyleReferenceGallery'
import { InteractiveStylereferenceCard } from '@/components/cards/InteractiveStylereferenceCard'
import { Button } from '@/ui/components/Button'
import { IconButton } from '@/ui/components/IconButton'
import { Breadcrumbs } from '@/ui/components/Breadcrumbs'
import { FeatherPlus } from '@subframe/core'
import { User } from '@supabase/supabase-js'
import { SearchableMainNavigation } from '@/components/navigation/SearchableMainNavigation'
import { AuthAwareSideBarNavigation } from '@/components/navigation/AuthAwareSideBarNavigation'
import { EditSrefCodeDialog } from '@/components/dialogs/EditSrefCodeDialog'
import { copyToClipboard, formatSrefForCopy } from '@/lib/utils/clipboard'
import { showToast } from '@/lib/utils/toast'

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

interface LibraryPageProps {
  user: User
  initialSrefCodes: SrefCode[]
}

export function LibraryPage({ user, initialSrefCodes }: LibraryPageProps) {
  const router = useRouter()
  
  // State for managing library codes, search, and filtering  
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [isTagCloudVisible, setIsTagCloudVisible] = useState<boolean>(false)
  const [currentSrefCodes, setCurrentSrefCodes] = useState<SrefCode[]>(initialSrefCodes)
  
  // Edit dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
  const [selectedSrefCode, setSelectedSrefCode] = useState<SrefCode | null>(null)

  // Memoized filtered codes based on search term and active tag
  const filteredSrefCodes = useMemo(() => {
    let filtered = currentSrefCodes

    // Apply search filter first
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(sref => {
        // Check title match
        const titleMatch = sref.title.toLowerCase().includes(searchLower)
        
        // Check SREF code number match
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
  }, [currentSrefCodes, searchTerm, activeTag])

  // Extract unique tags from currently filtered codes for the tag cloud
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>()
    filteredSrefCodes.forEach(sref => {
      sref.code_tags?.forEach(tag => {
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

  const handleSrefAction = async (action: 'edit' | 'copy', sref: SrefCode) => {
    if (action === 'copy') {
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
    
    if (action === 'edit') {
      // Open edit dialog with pre-populated data
      setSelectedSrefCode(sref)
      setIsEditDialogOpen(true)
      return
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
            key={images[0]?.id}
            className={`${common} row-span-4 col-span-4 row-start-1`}
            src={images[0]?.image_url}
            alt={`SREF ${sref.title} image 1`}
          />
        )
      case 2:
        return (
          <>
            <img
              key={images[0]?.id}
              className={`${common} row-span-4 col-span-4 row-start-1`}
              src={images[0]?.image_url}
              alt={`SREF ${sref.title} image 1`}
            />
            <img
              key={images[1]?.id}
              className={`${common} row-span-4 col-span-4 row-start-5`}
              src={images[1]?.image_url}
              alt={`SREF ${sref.title} image 2`}
            />
          </>
        )
      case 3:
        return (
          <>
            <img
              key={images[0]?.id}
              className={`${common} row-span-4 col-span-4 row-start-1`}
              src={images[0]?.image_url}
              alt={`SREF ${sref.title} image 1`}
            />
            <img
              key={images[1]?.id}
              className={`${common} row-span-2 col-span-2 row-start-5`}
              src={images[1]?.image_url}
              alt={`SREF ${sref.title} image 2`}
            />
            <img
              key={images[2]?.id}
              className={`${common} row-span-2 col-span-2 row-start-5`}
              src={images[2]?.image_url}
              alt={`SREF ${sref.title} image 3`}
            />
          </>
        )
      default:
        return (
          <>
            <img
              key={images[0]?.id}
              className={`${common} row-span-4 col-span-4 row-start-1`}
              src={images[0]?.image_url}
              alt={`SREF ${sref.title} image 1`}
            />
            <img
              key={images[1]?.id}
              className={`${common} row-span-4 col-span-4 row-start-5`}
              src={images[1]?.image_url}
              alt={`SREF ${sref.title} image 2`}
            />
            <img
              key={images[2]?.id}
              className={`${common} row-span-2 col-span-2 row-start-9`}
              src={images[2]?.image_url}
              alt={`SREF ${sref.title} image 3`}
            />
            <img
              key={images[3]?.id}
              className={`${common} row-span-2 col-span-2 row-start-9`}
              src={images[3]?.image_url}
              alt={`SREF ${sref.title} image 4`}
            />
          </>
        )
    }
  }

  // Empty state when no library codes exist
  if (currentSrefCodes.length === 0) {
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
                  Library
                </Breadcrumbs.Item>
              </Breadcrumbs>
            }
            onSearchChange={handleSearchChange}
            onFilterToggle={handleFilterToggle}
            isFilterActive={false} // Disabled when empty
          />
          
          <div className="flex w-full items-start gap-5 px-5 grow">
            <AuthAwareSideBarNavigation />
            
            <div className="flex grow shrink-0 basis-0 items-center justify-center">
              <div className="text-center py-12 max-w-md">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-heading-2 font-heading-2 text-default-font mb-4">
                  Your Library is Empty
                </h2>
                <p className="text-body font-body text-subtext-color mb-6">
                  Start building your personal SREF collection by creating your first code.
                </p>
                <Button 
                  onClick={() => {
                    // Open create dialog
                    setSelectedSrefCode(null)
                    setIsEditDialogOpen(true)
                  }}
                  size="large"
                >
                  Create Your First SREF
                </Button>
                
                <Button 
                  variant="neutral-secondary"
                  onClick={() => router.push('/discover')}
                  size="medium"
                >
                  Browse Discover
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DefaultPageLayout>
    )
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
                Library
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
                  
                  return (
                    <div key={sref.id} className="break-inside-avoid mb-4 relative">
                      <InteractiveStylereferenceCard
                        srefTitle={sref.title}
                        srefValue={sref.code_value}
                        svValue={sref.sv_version}
                        variant={variant}
                        mode="edit" // Use edit mode for library
                        onCopy={() => handleSrefAction('copy', sref)}
                        onEdit={() => handleSrefAction('edit', sref)}
                        tags={
                          <>
                            {sref.code_tags?.map((tag) => (
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
                        ? `No codes found for "${searchTerm}" with tag "${activeTag}"`
                        : searchTerm 
                        ? `No codes found for "${searchTerm}"`
                        : `No codes found for tag "${activeTag}"`
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

      {/* Edit/Create Dialog */}
      <EditSrefCodeDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setSelectedSrefCode(null)
        }}
        srefCode={selectedSrefCode}
        onSave={handleSrefCodeSave}
      />

      {/* Floating Action Button for creating new SREF codes */}
      {currentSrefCodes.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <IconButton
            size="large"
            variant="brand-primary"
            icon={<FeatherPlus />}
            onClick={() => {
              setSelectedSrefCode(null)
              setIsEditDialogOpen(true)
            }}
            className="shadow-lg hover:shadow-xl transition-shadow w-14 h-14"
          />
        </div>
      )}
    </DefaultPageLayout>
  )

  function handleSrefCodeSave(updatedCode: SrefCode) {
    if (!updatedCode) {
      // Handle deletion - refresh the page or refetch data
      router.refresh()
      return
    }

    if (selectedSrefCode) {
      // Update existing code
      setCurrentSrefCodes(prev => 
        prev.map(code => 
          code.id === updatedCode.id ? updatedCode : code
        )
      )
    } else {
      // Add new code
      setCurrentSrefCodes(prev => [updatedCode, ...prev])
    }
  }
}