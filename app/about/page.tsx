import { Metadata } from 'next'
import AboutPage from '@/staging/About'

export const metadata: Metadata = {
  title: 'About Us - SREF Mining Co',
  description: 'Learn more about SREF Mining Company and our mission to help creators discover the perfect MidJourney style references.',
}

export default function About() {
  return <AboutPage />
}