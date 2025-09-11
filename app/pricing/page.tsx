import { Metadata } from 'next'
import PricingPage from '@/staging/Pricing'

export const metadata: Metadata = {
  title: 'Pricing - SREF Mining Co',
  description: 'Choose the perfect plan for your creative needs. From free miners to professional prospectors.',
}

export default function Pricing() {
  return <PricingPage />
}