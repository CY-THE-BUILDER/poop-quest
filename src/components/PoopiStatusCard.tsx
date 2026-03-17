import type { PoopiStatusVariant } from '../domain/health'
import { cn } from '../lib/utils'
import { Card } from './ui/Card'

const config: Record<
  PoopiStatusVariant,
  { emoji: string; title: string; body: string; accent: string }
> = {
  normal: {
    emoji: '😌',
    title: 'Poopi is cruising',
    body: 'No trophy yet today, but the mission window is still open.',
    accent: 'from-amber-100 to-orange-100',
  },
  completed: {
    emoji: '🎉',
    title: 'Mission accomplished',
    body: 'Today’s heroic flush has been officially logged.',
    accent: 'from-lime-100 to-emerald-100',
  },
  warning: {
    emoji: '🫠',
    title: 'Two-day tummy side quest',
    body: 'Poopi suggests water, a walk, and less dramatic inbox stress.',
    accent: 'from-orange-100 to-amber-50',
  },
  alert: {
    emoji: '🚨',
    title: 'Three-day pipe patrol',
    body: 'The app is waving a goofy caution flag and serving gentle lifestyle tips.',
    accent: 'from-rose-100 to-orange-100',
  },
}

interface PoopiStatusCardProps {
  variant: PoopiStatusVariant
  streak: number
  coins: number
}

export const PoopiStatusCard = ({ variant, streak, coins }: PoopiStatusCardProps) => {
  const item = config[variant]

  return (
    <Card className={cn('overflow-hidden bg-gradient-to-br', item.accent)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-amber-900/60">Poopi Status</p>
          <h2 className="text-2xl font-black text-amber-950">{item.title}</h2>
          <p className="max-w-xs text-sm text-amber-900/80">{item.body}</p>
        </div>
        <div className="rounded-full bg-white/75 px-4 py-3 text-4xl shadow-inner">{item.emoji}</div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-white/75 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-800/60">Streak</p>
          <p className="mt-1 text-xl font-black text-amber-950">{streak} days</p>
        </div>
        <div className="rounded-2xl bg-white/75 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-800/60">Coins</p>
          <p className="mt-1 text-xl font-black text-amber-950">{coins}</p>
        </div>
      </div>
    </Card>
  )
}
