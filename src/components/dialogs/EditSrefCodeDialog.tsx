'use client'

import React, { useState, useEffect } from 'react'
import { DialogLayout } from '@/ui/layouts/DialogLayout'
import { SaveSrefCodeDialog } from '@/ui/components/SaveSrefCodeDialog'
import { Button } from '@/ui/components/Button'
import { IconButton } from '@/ui/components/IconButton'
import { TextField } from '@/ui/components/TextField'
import { TextArea } from '@/ui/components/TextArea'
import { Select } from '@/ui/components/Select'
import { showToast } from '@/lib/utils/toast'
import { FeatherX, FeatherPlus, FeatherUploadCloud, FeatherChevronLeft, FeatherChevronRight } from '@subframe/core'
import { NumberedExampleImageCard } from '@/ui/components/NumberedExampleImageCard'

interface SrefCode {
  id: string
  code_value: string
  sv_version: string
  title: string
  code_tags: Array<{
    id: string
    tag: string
  }>
  code_images: Array<{
    id: string
    image_url: string
    position: number
  }>
}

interface ImageData {
  id?: string
  url: string
  position: number
  file?: File // For new uploads
}

interface EditSrefCodeDialogProps {
  isOpen: boolean
  onClose: () => void
  srefCode?: SrefCode | null // null for create mode
  onSave: (updatedCode: SrefCode) => void
}

export function EditSrefCodeDialog({
  isOpen,
  onClose,
  srefCode,
  onSave
}: EditSrefCodeDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isEditMode = !!srefCode

  // Form state
  const [title, setTitle] = useState('')
  const [codeValue, setCodeValue] = useState('')
  const [svVersion, setSvVersion] = useState('6')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [images, setImages] = useState<ImageData[]>([])
  const [isDragging, setIsDragging] = useState(false)

  // Initialize form when srefCode changes
  useEffect(() => {
    if (srefCode) {
      setTitle(srefCode.title)
      setCodeValue(srefCode.code_value)
      // Normalize SV version to just the number
      const normalizedVersion = srefCode.sv_version?.toString().replace(/[^\d]/g, '') || '6'
      setSvVersion(normalizedVersion)
      setTags(srefCode.code_tags.map(tag => tag.tag))
      // Sort images by position and ensure sequential positions starting from 1
      const sortedImages = srefCode.code_images
        .sort((a, b) => a.position - b.position)
        .map((img, index) => ({
          id: img.id,
          url: img.image_url,
          position: index + 1
        }))
      setImages(sortedImages)
    } else {
      // Reset for create mode
      setTitle('')
      setCodeValue('')
      setSvVersion('6')
      setTags([])
      setImages([])
    }
    setNewTag('')
  }, [srefCode])

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  // Image management functions
  const handleImageUpload = (files: FileList) => {
    const newImages: ImageData[] = []
    const maxPosition = images.length > 0 ? Math.max(...images.map(img => img.position)) : 0

    Array.from(files).slice(0, 4 - images.length).forEach((file, index) => {
      if (file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
        const url = URL.createObjectURL(file)
        newImages.push({
          url,
          position: maxPosition + index + 1,
          file
        })
      }
    })

    setImages([...images, ...newImages])
  }

  const handleRemoveImage = (position: number) => {
    const filteredImages = images.filter(img => img.position !== position)
    // Renumber positions to be sequential
    const reorderedImages = filteredImages.map((img, index) => ({
      ...img,
      position: index + 1
    }))
    setImages(reorderedImages)
  }

  const moveImage = (fromPosition: number, toPosition: number) => {
    if (fromPosition === toPosition) return
    
    const imagesCopy = [...images]
    const fromIndex = imagesCopy.findIndex(img => img.position === fromPosition)
    
    if (fromIndex === -1) return
    
    // Remove the image from its current position
    const [movedImage] = imagesCopy.splice(fromIndex, 1)
    
    // Find where to insert it (adjust for array index vs position)
    const insertIndex = toPosition - 1
    
    // Insert at the new position
    imagesCopy.splice(insertIndex, 0, movedImage)
    
    // Renumber all positions to be sequential starting from 1
    const reorderedImages = imagesCopy.map((img, index) => ({
      ...img,
      position: index + 1
    }))
    
    setImages(reorderedImages)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleImageUpload(files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files)
    }
  }

  const handleSave = async () => {
    if (!title.trim() || !codeValue.trim()) {
      showToast('Title and SREF code are required', { type: 'error' })
      return
    }

    setIsLoading(true)
    
    try {
      // For now, only include images that are not file uploads (existing URLs)
      // TODO: Implement image upload endpoint for new file uploads
      const imageData = images
        .filter(img => !img.file) // Only existing images with URLs
        .map(img => ({
          url: img.url,
          position: img.position
        }))
      
      const payload = {
        code_value: codeValue.trim(),
        sv_version: svVersion,
        title: title.trim(),
        tags: tags,
        images: imageData
      }

      // Show warning if there are file uploads that won't be saved
      const fileUploads = images.filter(img => img.file)
      if (fileUploads.length > 0) {
        showToast(`Note: ${fileUploads.length} uploaded images will not be saved yet. Image upload feature coming soon!`, { type: 'info' })
      }

      let response
      if (isEditMode && srefCode) {
        // Update existing SREF code
        response = await fetch(`/api/sref-codes/${srefCode.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      } else {
        // Create new SREF code
        response = await fetch('/api/sref-codes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save SREF code')
      }

      const result = await response.json()
      
      if (result.ok) {
        showToast(
          isEditMode ? 'SREF code updated successfully!' : 'SREF code created successfully!',
          { type: 'success' }
        )
        onSave(result.data)
        onClose()
      } else {
        throw new Error(result.error || 'Failed to save SREF code')
      }
    } catch (error) {
      console.error('Error saving SREF code:', error)
      showToast(
        error instanceof Error ? error.message : 'Failed to save SREF code',
        { type: 'error' }
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!isEditMode || !srefCode) return

    const confirmed = window.confirm(
      'Are you sure you want to delete this SREF code? This action cannot be undone.'
    )

    if (!confirmed) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/sref-codes/${srefCode.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete SREF code')
      }

      const result = await response.json()
      
      if (result.ok) {
        showToast('SREF code deleted successfully!', { type: 'success' })
        // Trigger a refresh by calling onSave with null
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSave(null as any)
        onClose()
      } else {
        throw new Error(result.error || 'Failed to delete SREF code')
      }
    } catch (error) {
      console.error('Error deleting SREF code:', error)
      showToast(
        error instanceof Error ? error.message : 'Failed to delete SREF code',
        { type: 'error' }
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DialogLayout className="absolute z-50" open={isOpen} onOpenChange={onClose}>
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-default-background rounded-lg">
          {/* Custom header with close button */}
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 className="text-heading-2 font-heading-2 text-default-font">
              {isEditMode ? 'Edit SREF Code' : 'Save SREF Code'}
            </h2>
            <IconButton 
              size="large" 
              icon={<FeatherX />} 
              onClick={onClose}
              disabled={isLoading}
            />
          </div>

          <div className="px-6">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Settings
            </span>
          </div>

          {/* Title and Version row */}
          <div className="flex w-full items-center gap-2 px-6 pt-4">
            <TextField
              className="h-auto grow shrink-0 basis-0"
              variant="filled"
              label="Title"
              helpText=""
            >
              <TextField.Input 
                placeholder="e.g., Comic Book Style" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
            </TextField>
            <Select 
              variant="filled" 
              label="Version" 
              placeholder="Select version" 
              helpText=""
              value={svVersion}
              onValueChange={setSvVersion}
              disabled={isLoading}
            >
              <Select.Item value="6">SV 6</Select.Item>
              <Select.Item value="4">SV 4</Select.Item>
            </Select>
          </div>

          {/* SREF Code input */}
          <div className="px-6 pt-4">
            <TextArea
              className="h-auto w-full flex-none"
              variant="filled"
              label="SREF Code(s)"
              helpText="Enter your SREF code(s) as you plan to use them in your prompt"
            >
              <TextArea.Input
                className="h-auto min-h-[96px] w-full flex-none"
                placeholder="--sref 1234567890 0987654321"
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value)}
                disabled={isLoading}
              />
            </TextArea>
          </div>

          {/* Divider */}
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border mx-6 my-4" />

          {/* Tags section */}
          <div className="px-6">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Tags
            </span>
          </div>

          <div className="px-6 pt-4">
            <TextField
              className="h-auto w-full flex-none"
              variant="filled"
              label="Add Tags"
              helpText=""
              iconRight={<FeatherPlus />}
            >
              <TextField.Input 
                placeholder="e.g., oil painting" 
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag()
                  }
                }}
                disabled={isLoading}
              />
            </TextField>
          </div>

          {/* Existing tags */}
          {tags.length > 0 && (
            <div className="px-6 pt-4">
              <div className="flex w-full flex-wrap items-start gap-2">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center gap-1 bg-neutral-100 rounded-md px-2 py-1">
                    <span className="text-body font-body text-default-font">
                      {tag}
                    </span>
                    <IconButton
                      size="small"
                      icon={<FeatherX />}
                      onClick={() => handleRemoveTag(tag)}
                      disabled={isLoading}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border mx-6 my-4" />

          {/* Images section */}
          <div className="px-6">
            <span className="text-heading-3 font-heading-3 text-default-font">
              Example Images
            </span>
          </div>

          {/* Image display */}
          <div className="px-6 pt-4">
            <div className="flex w-full items-start gap-2 flex-wrap">
              {/* Show existing and new images */}
              {Array.from({ length: 4 }, (_, index) => {
                const image = images.find(img => img.position === index + 1)
                return (
                  <div key={index} className="relative group">
                    <NumberedExampleImageCard 
                      number={String(index + 1)}
                      className={image ? "cursor-pointer" : ""}
                      style={{
                        backgroundImage: image ? `url(${image.url})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                      onClick={() => {
                        if (image) {
                          // TODO: Handle image click (replace or preview)
                        } else {
                          // Trigger file input
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = 'image/*'
                          input.onchange = (e) => {
                            const target = e.target as HTMLInputElement
                            if (target.files) {
                              handleImageUpload(target.files)
                            }
                          }
                          input.click()
                        }
                      }}
                    />
                    {image && (
                      <>
                        {/* Remove button - only visible on hover */}
                        <IconButton
                          size="small"
                          icon={<FeatherX className="text-white" />}
                          onClick={() => handleRemoveImage(image.position)}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          disabled={isLoading}
                        />
                        
                        {/* Reorder buttons - only visible on hover */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {image.position > 1 && (
                            <IconButton
                              size="small"
                              icon={<FeatherChevronLeft className="text-white" />}
                              onClick={() => moveImage(image.position, image.position - 1)}
                              className="bg-gray-500 hover:bg-gray-600"
                              disabled={isLoading}
                            />
                          )}
                          {image.position < images.length && (
                            <IconButton
                              size="small"
                              icon={<FeatherChevronRight className="text-white" />}
                              onClick={() => moveImage(image.position, image.position + 1)}
                              className="bg-gray-500 hover:bg-gray-600"
                              disabled={isLoading}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* File upload drop zone */}
          <div className="px-6 pt-4">
            <div 
              className={`flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed px-6 py-6 cursor-pointer transition-colors ${
                isDragging 
                  ? 'border-brand-primary-700 bg-brand-primary-50' 
                  : 'border-brand-primary-600'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => {
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = 'image/*'
                input.multiple = true
                input.onchange = (e) => {
                  const target = e.target as HTMLInputElement
                  if (target.files) {
                    handleImageUpload(target.files)
                  }
                }
                input.click()
              }}
            >
              <FeatherUploadCloud className="text-heading-2 font-heading-2 text-brand-primary-700" />
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-body font-body text-default-font text-center">
                  Click to select files or drag to upload
                </span>
                <span className="text-caption font-caption text-subtext-color text-center">
                  Up to {4 - images.length} files, max file size 5MB
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 pt-2">
            <span className="text-caption font-caption text-subtext-color">
              Drag and drop to reorder images. The first 3 images will be shown in the card preview.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex w-full items-center justify-between gap-2 p-6">
            {isEditMode && (
              <Button
                className="h-11"
                variant="destructive-secondary"
                size="large"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </Button>
            )}

            <Button 
              className="h-11 grow shrink-0 basis-0" 
              size="large"
              onClick={handleSave}
              disabled={isLoading || !title.trim() || !codeValue.trim()}
            >
              {isLoading 
                ? (isEditMode ? 'Updating...' : 'Saving...') 
                : (isEditMode ? 'Update SREF Code' : 'Save SREF Code')
              }
            </Button>
          </div>
        </div>
      </div>
    </DialogLayout>
  )
}