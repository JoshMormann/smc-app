# Error Handling Guide

## Error Boundary Strategy

### Global Error Boundary
- Wrap app in error boundary for unhandled errors
- Log errors to monitoring service
- Show user-friendly fallback UI

### Route-Level Error Handling
```typescript
// app/error.tsx
'use client'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Component-Level Error Boundaries
```typescript
// components/ErrorBoundary.tsx
import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Log to monitoring service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong with this component</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

## API Route Error Patterns

### Standardized API Response Format
```typescript
// lib/api-types.ts
export type ApiResponse<T> = {
  ok: boolean
  data?: T
  error?: string
  code?: string
}

export type ApiError = {
  ok: false
  error: string
  code?: string
}
```

### Route Handler Pattern
```typescript
// app/api/sref-codes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ApiResponse } from '@/lib/api-types'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { code, title, tags } = body

    // Validate input
    if (!code || !title) {
      return NextResponse.json(
        { ok: false, error: 'Code and title are required', code: 'VALIDATION_ERROR' },
        { status: 400 }
      )
    }

    // Database operation
    const { data, error } = await supabase
      .from('sref_codes')
      .insert({ code, title, user_id: user.id })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { ok: false, error: 'Failed to create SREF code', code: 'DATABASE_ERROR' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { ok: false, error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    )
  }
}
```

## Supabase Error Handling

### RLS Error Handling
```typescript
// lib/supabase/errors.ts
export function handleSupabaseError(error: any): string {
  if (error.code === 'PGRST301') {
    return 'You do not have permission to perform this action'
  }
  
  if (error.code === '23505') {
    return 'This item already exists'
  }
  
  if (error.code === '23503') {
    return 'Referenced item does not exist'
  }
  
  if (error.message?.includes('JWT expired')) {
    return 'Your session has expired. Please sign in again'
  }
  
  return 'An unexpected error occurred'
}
```

### Connection Error Handling
```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Add error handling middleware
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      // Handle sign out
      window.location.href = '/'
    }
  })

  return supabase
}
```

## Client-Side Error Handling

### React Query Error Handling
```typescript
// hooks/useSrefCodes.ts
import { useQuery } from '@tanstack/react-query'
import { fetchSrefCodes } from '@/lib/api'

export function useSrefCodes() {
  return useQuery({
    queryKey: ['sref-codes'],
    queryFn: fetchSrefCodes,
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error.status >= 400 && error.status < 500) {
        return false
      }
      return failureCount < 3
    },
    onError: (error) => {
      console.error('Failed to fetch SREF codes:', error)
      // Show toast notification
    }
  })
}
```

### Form Error Handling
```typescript
// components/SrefForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function SrefForm() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    try {
      setSubmitError(null)
      const response = await fetch('/api/sref-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      
      if (!result.ok) {
        throw new Error(result.error)
      }

      // Success handling
    } catch (error) {
      setSubmitError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {submitError && (
        <div className="error-message">
          {submitError}
        </div>
      )}
      
      {errors.title && (
        <div className="field-error">
          {errors.title.message}
        </div>
      )}
      
      {/* Form fields */}
    </form>
  )
}
```

## User-Facing Error Messages

### Error Message Standards
```typescript
// lib/error-messages.ts
export const ERROR_MESSAGES = {
  // Authentication
  AUTH_REQUIRED: 'Please sign in to continue',
  AUTH_EXPIRED: 'Your session has expired. Please sign in again',
  
  // Validation
  VALIDATION_ERROR: 'Please check your input and try again',
  REQUIRED_FIELD: 'This field is required',
  
  // Database
  DATABASE_ERROR: 'Something went wrong. Please try again',
  NOT_FOUND: 'The requested item was not found',
  DUPLICATE_ENTRY: 'This item already exists',
  
  // Network
  NETWORK_ERROR: 'Connection failed. Please check your internet connection',
  TIMEOUT_ERROR: 'Request timed out. Please try again',
  
  // Generic
  INTERNAL_ERROR: 'An unexpected error occurred. Please try again',
  UNKNOWN_ERROR: 'Something went wrong. Please contact support if this continues'
} as const

export function getErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error
  }
  
  if (error?.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code]
  }
  
  if (error?.message) {
    return error.message
  }
  
  return ERROR_MESSAGES.UNKNOWN_ERROR
}
```

### Toast Notifications
```typescript
// components/Toast.tsx
import { useState, useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose: () => void
}

export function Toast({ message, type, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  )
}
```

## Monitoring and Logging

### Error Logging
```typescript
// lib/logger.ts
interface LogEntry {
  level: 'error' | 'warn' | 'info' | 'debug'
  message: string
  error?: Error
  context?: Record<string, any>
  timestamp: string
}

export function logError(error: Error, context?: Record<string, any>) {
  const logEntry: LogEntry = {
    level: 'error',
    message: error.message,
    error,
    context,
    timestamp: new Date().toISOString()
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', logEntry)
  }

  // Send to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // Send to Sentry, LogRocket, etc.
    // monitoringService.captureException(error, { extra: context })
  }
}
```

### Performance Monitoring
```typescript
// lib/performance.ts
export function measurePerformance(name: string, fn: () => Promise<any>) {
  return async (...args: any[]) => {
    const start = performance.now()
    try {
      const result = await fn(...args)
      const duration = performance.now() - start
      
      if (duration > 1000) {
        console.warn(`Slow operation: ${name} took ${duration}ms`)
      }
      
      return result
    } catch (error) {
      const duration = performance.now() - start
      console.error(`Failed operation: ${name} failed after ${duration}ms`, error)
      throw error
    }
  }
}
```

## Testing Error Scenarios

### Error Boundary Testing
```typescript
// __tests__/ErrorBoundary.test.tsx
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

test('catches and displays error', () => {
  render(
    <ErrorBoundary>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  )
  
  expect(screen.getByText('Something went wrong with this component')).toBeInTheDocument()
})
```

### API Error Testing
```typescript
// __tests__/api/sref-codes.test.ts
import { POST } from '@/app/api/sref-codes/route'

test('returns error for missing authentication', async () => {
  const request = new Request('http://localhost/api/sref-codes', {
    method: 'POST',
    body: JSON.stringify({ code: 'test', title: 'Test' })
  })

  const response = await POST(request)
  const data = await response.json()

  expect(response.status).toBe(401)
  expect(data.ok).toBe(false)
  expect(data.error).toBe('Authentication required')
})
```

## Recovery Strategies

### Retry Logic
```typescript
// lib/retry.ts
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxAttempts) {
        throw lastError
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }

  throw lastError!
}
```

### Fallback Strategies
```typescript
// components/SrefGrid.tsx
export function SrefGrid() {
  const { data, error, isLoading } = useSrefCodes()

  if (isLoading) {
    return <SrefGridSkeleton />
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Unable to load SREF codes</h3>
        <p>Please check your connection and try again</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="empty-state">
        <h3>No SREF codes found</h3>
        <p>Be the first to add a SREF code!</p>
      </div>
    )
  }

  return (
    <div className="sref-grid">
      {data.map(sref => (
        <SrefCard key={sref.id} sref={sref} />
      ))}
    </div>
  )
}
```
