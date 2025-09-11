'use client'

import React, { useState, useEffect } from 'react'
import { DialogLayout } from '@/ui/layouts/DialogLayout'
import { SaveSrefCodeDialog } from '@/ui/components/SaveSrefCodeDialog'
import { Button } from '@/ui/components/Button'
import { showToast } from '@/lib/utils/toast'

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

  const handleSave = async (formData: Record<string, unknown>) => {
    setIsLoading(true)
    
    try {
      const payload = {
        code_value: formData.code_value,
        sv_version: formData.sv_version || '6',
        title: formData.title,
        tags: formData.tags || [],
        images: formData.images || []
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
    <DialogLayout open={isOpen} onOpenChange={onClose}>
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* For now, we'll use a simple form since the SaveSrefCodeDialog is complex to integrate */}
        <div className="bg-default-background p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-heading-2 font-heading-2 text-default-font">
              {isEditMode ? 'Edit SREF Code' : 'Create SREF Code'}
            </h2>
            <Button
              variant="neutral-tertiary"
              size="medium"
              onClick={onClose}
              disabled={isLoading}
            >
              ×
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-body font-body text-subtext-color">
              {isEditMode 
                ? 'Edit functionality will be implemented in the next phase.'
                : 'Create functionality will be implemented in the next phase.'
              }
            </p>
            
            {isEditMode && srefCode && (
              <div className="space-y-2">
                <p><strong>Title:</strong> {srefCode.title}</p>
                <p><strong>Code:</strong> {srefCode.code_value}</p>
                <p><strong>Version:</strong> SV {srefCode.sv_version}</p>
                <p><strong>Tags:</strong> {srefCode.code_tags.map(t => t.tag).join(', ') || 'None'}</p>
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button
                variant="neutral-primary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              
              {isEditMode && (
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? 'Deleting...' : 'Delete'}
                </Button>
              )}
              
              <Button
                variant="brand-primary"
                onClick={() => handleSave({})}
                disabled={isLoading}
              >
                {isLoading 
                  ? (isEditMode ? 'Updating...' : 'Creating...') 
                  : (isEditMode ? 'Update' : 'Create')
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DialogLayout>
  )
}