import { ReactNode } from 'react'

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col rounded border border-neutral-500 bg-white ${className}`}>
      {children}
    </div>
  )
}
