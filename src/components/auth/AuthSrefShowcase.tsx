'use client'

import React, { useState, useEffect } from 'react'
import { Avatar } from '@/ui/components/Avatar'
import { SampleUserProfile } from '@/ui/components/SampleUserProfile'
import { getRandomSrefData, RandomSrefData } from '@/lib/auth/random-sref'

interface AuthSrefShowcaseProps {
  className?: string
}

export function AuthSrefShowcase({ className }: AuthSrefShowcaseProps) {
  const [srefData, setSrefData] = useState<RandomSrefData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRandomSref = async () => {
      try {
        setLoading(true)
        const data = await getRandomSrefData()
        setSrefData(data)
      } catch (error) {
        console.error('Error fetching random SREF data:', error)
        // Set fallback data
        setSrefData({
          code_value: '1234567890',
          sv_version: 6,
          title: 'Demo Style',
          image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
          creator_name: 'Demo User',
          creator_avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Demo%20User&backgroundColor=random'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRandomSref()
  }, [])

  if (loading || !srefData) {
    return (
      <div className="flex grow shrink-0 basis-0 items-center justify-center self-stretch bg-brand-primary-600 px-12 py-12">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-white/20 rounded-full mb-8"></div>
          <div className="w-48 h-4 bg-white/20 rounded mb-2"></div>
          <div className="w-32 h-4 bg-white/20 rounded"></div>
        </div>
      </div>
    )
  }

  const backgroundStyle = srefData.image_url
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${srefData.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {}

  return (
    <div 
      className={`flex grow shrink-0 basis-0 items-center justify-center self-stretch px-12 py-12 ${className || ''}`}
      style={backgroundStyle}
    >
      <SampleUserProfile
        avatar={
          <Avatar
            size="x-large"
            image={srefData.creator_avatar || undefined}
          >
            {srefData.creator_name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </Avatar>
        }
        name={srefData.creator_name}
        title="Style Creator"
        sref={srefData.code_value}
        sv={srefData.sv_version.toString()}
      />
    </div>
  )
}