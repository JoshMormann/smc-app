import { Metadata } from 'next'
import PrivacyPage from '@/staging/Privacy'

export const metadata: Metadata = {
  title: 'Privacy Policy - SREF Mining Co',
  description: 'Our privacy policy and how we protect your data while you discover and save SREF codes.',
}

export default function Privacy() {
  return <PrivacyPage />
}