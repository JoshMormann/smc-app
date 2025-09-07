'use client'

import React from 'react'
import { DefaultPageLayout } from '@/ui/layouts/DefaultPageLayout'
import { MainNavigation } from '@/ui/components/MainNavigation'
import { SideBarNavigation } from '@/ui/components/SideBarNavigation'
import { StyleReferenceGallery } from '@/ui/components/StyleReferenceGallery'
import { StylereferenceCard } from '@/ui/components/StylereferenceCard'
import { Button } from '@/ui/components/Button'
import { IconButton } from '@/ui/components/IconButton'
import { Breadcrumbs } from '@/ui/components/Breadcrumbs'
import { FeatherCompass, FeatherHeart, FeatherLibraryBig, FeatherMenu } from '@subframe/core'
import { User } from '@supabase/supabase-js'

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
  const isAuthenticated = !!user

  const handleSrefAction = (action: 'like' | 'copy', srefId: string) => {
    if (!isAuthenticated) {
      // Show auth modal
      console.log('Show auth modal for action:', action)
      return
    }
    
    // Handle authenticated action
    console.log('Perform action:', action, 'on SREF:', srefId)
  }

  const handleTagClick = (tag: string) => {
    console.log('Filter by tag:', tag)
  }

  const handleNavigation = (page: 'discover' | 'favorites' | 'library') => {
    if (page === 'favorites' || page === 'library') {
      if (!isAuthenticated) {
        console.log('Show auth modal for protected page:', page)
        return
      }
    }
    
    // Navigate to page
    console.log('Navigate to:', page)
  }

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <MainNavigation
          logo="https://res.cloudinary.com/subframe/image/upload/v1755835889/uploads/15654/omtpskog4glajk11lbwm.svg"
          authenticated={isAuthenticated}
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
        />
        
        <div className="flex w-full items-start gap-5 px-5 grow">
          <SideBarNavigation
            mainActions={
              <>
                <IconButton
                  variant="brand-primary"
                  size="large"
                  icon={<FeatherCompass />}
                  onClick={() => handleNavigation('discover')}
                />
                <IconButton
                  size="large"
                  icon={<FeatherHeart />}
                  onClick={() => handleNavigation('favorites')}
                />
                <IconButton
                  size="large"
                  icon={<FeatherLibraryBig />}
                  onClick={() => handleNavigation('library')}
                />
              </>
            }
            bottomAction={
              <IconButton
                size="large"
                icon={<FeatherMenu />}
                onClick={() => console.log('Open settings menu')}
              />
            }
          />
          
          <StyleReferenceGallery
            cards={
              <>
                {initialSrefCodes.map((sref, index) => (
                  <StylereferenceCard
                    key={sref.id}
                    srefValue={sref.code_value}
                    svValue={sref.sv_version}
                    variant={index % 4 === 0 ? 'preview-1' : index % 4 === 1 ? 'preview-2' : index % 4 === 2 ? 'preview-3' : 'preview-1'}
                    tags={
                      <>
                        {sref.code_tags.map((tag) => (
                          <Button
                            key={tag.id}
                            variant="neutral-secondary"
                            size="small"
                            onClick={() => handleTagClick(tag.tag)}
                          >
                            {tag.tag}
                          </Button>
                        ))}
                      </>
                    }
                    images={
                      <>
                        {sref.code_images.map((image, imgIndex) => (
                          <img
                            key={image.id}
                            className={`w-full grow shrink-0 basis-0 object-contain ${
                              imgIndex === 0 ? 'row-span-4 col-span-4 row-start-1' :
                              imgIndex === 1 ? 'row-span-4 col-span-4 row-start-5' :
                              imgIndex === 2 ? 'row-span-2 col-span-2 row-start-9' :
                              'row-span-2 col-span-2 row-start-9'
                            }`}
                            src={image.image_url}
                            alt={`SREF ${sref.title} image ${imgIndex + 1}`}
                          />
                        ))}
                      </>
                    }
                    onLike={() => handleSrefAction('like', sref.id)}
                    onCopy={() => handleSrefAction('copy', sref.id)}
                  />
                ))}
              </>
            }
          />
        </div>
      </div>
    </DefaultPageLayout>
  )
}