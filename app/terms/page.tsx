import { Metadata } from 'next'
import TermsPage from '@/staging/Terms'

export const metadata: Metadata = {
  title: 'Terms & Conditions - SREF Mining Co',
  description: 'Terms and conditions for using SREF Mining Company platform and services.',
}

export default function Terms() {
  return <TermsPage />
}