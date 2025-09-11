import { Metadata } from 'next'
import FaqPage from '@/staging/Faq'

export const metadata: Metadata = {
  title: 'FAQ - SREF Mining Co',
  description: 'Frequently asked questions about SREF codes, MidJourney style references, and using our platform.',
}

export default function FAQ() {
  return <FaqPage />
}