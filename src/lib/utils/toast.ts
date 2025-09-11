// Simple toast notification system
// Note: This is a basic implementation. For production, consider using react-hot-toast or similar

export interface ToastOptions {
  duration?: number
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
  type?: 'success' | 'error' | 'warning' | 'info'
}

export function showToast(message: string, options: ToastOptions = {}) {
  const {
    duration = 3000,
    position = 'top-right',
    type = 'success'
  } = options

  // Create toast element
  const toast = document.createElement('div')
  toast.className = getToastClasses(type, position)
  toast.textContent = message
  
  // Position styles
  const positionStyles = getPositionStyles(position)
  Object.assign(toast.style, positionStyles)
  
  // Add to DOM
  document.body.appendChild(toast)
  
  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = '1'
    toast.style.transform = 'translateY(0) scale(1)'
  })
  
  // Remove after duration
  setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transform = 'translateY(-20px) scale(0.95)'
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast)
      }
    }, 200)
  }, duration)
}

function getToastClasses(type: string, position: string): string {
  const baseClasses = 'fixed z-50 px-4 py-3 rounded-md font-medium text-sm shadow-lg transition-all duration-200 ease-out opacity-0 transform translate-y-2 scale-95 pointer-events-none'
  
  const typeClasses = {
    success: 'bg-success-500 text-white',
    error: 'bg-error-500 text-white', 
    warning: 'bg-warning-500 text-black',
    info: 'bg-information-500 text-white'
  }
  
  return `${baseClasses} ${typeClasses[type] || typeClasses.success}`
}

function getPositionStyles(position: string): Partial<CSSStyleDeclaration> {
  const positions = {
    'top-right': { top: '20px', right: '20px' },
    'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
    'top-left': { top: '20px', left: '20px' },
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
    'bottom-left': { bottom: '20px', left: '20px' }
  }
  
  return positions[position] || positions['top-right']
}