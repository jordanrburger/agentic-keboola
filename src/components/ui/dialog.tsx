import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/app/lib/utils' // Utility for combining class names

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogTitle = DialogPrimitive.Title

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg',
        className
      )}
      {...props}
    >
      {/* Add hidden DialogTitle for accessibility */}
      <DialogPrimitive.Title className="sr-only">Dialog</DialogPrimitive.Title>
      {children}
      <DialogPrimitive.Close
        className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
        aria-label="Close"
      >
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = 'DialogContent'
