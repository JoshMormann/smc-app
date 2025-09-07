import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LibraryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-default-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-heading-2 font-heading-2 text-default-font mb-4">
          Library Coming Soon
        </h1>
        <p className="text-body font-body text-subtext-color">
          Your personal SREF library will appear here.
        </p>
      </div>
    </div>
  )
}