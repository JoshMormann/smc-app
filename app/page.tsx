import { redirect } from 'next/navigation'

// Redirect root to discover page
export default function HomePage() {
  redirect('/discover')
}
