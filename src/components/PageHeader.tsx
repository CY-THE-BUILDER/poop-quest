import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  aside?: ReactNode
}

export const PageHeader = ({ eyebrow, title, description, aside }: PageHeaderProps) => (
  <div className="flex items-start justify-between gap-4">
    <div className="space-y-2">
      {eyebrow ? (
        <p className="text-xs font-black uppercase tracking-[0.28em] text-orange-500">{eyebrow}</p>
      ) : null}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-amber-950">{title}</h1>
        {description ? <p className="mt-2 max-w-sm text-sm text-amber-900/75">{description}</p> : null}
      </div>
    </div>
    {aside}
  </div>
)
