import { forwardRef } from 'react'
import type { Badge } from '../types'

interface ShareBadgeCardProps {
  badge: Badge
  streak: number
}

export const ShareBadgeCard = forwardRef<HTMLDivElement, ShareBadgeCardProps>(
  ({ badge, streak }, ref) => (
    <div
      ref={ref}
      className="w-[320px] rounded-[32px] bg-gradient-to-br from-amber-300 via-orange-200 to-amber-50 p-6 text-amber-950 shadow-[0_20px_80px_rgba(120,53,15,0.18)]"
    >
      <p className="text-xs font-black uppercase tracking-[0.28em] text-orange-700">Poop Quest</p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-3xl font-black leading-tight">{badge.name}</h3>
          <p className="mt-2 max-w-[180px] text-sm text-amber-900/75">{badge.description}</p>
        </div>
        <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/70 text-5xl shadow-inner">
          {badge.icon}
        </div>
      </div>
      <div className="mt-8 rounded-[24px] bg-white/75 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-amber-800/60">Current streak</p>
        <p className="mt-2 text-4xl font-black">{streak} days</p>
      </div>
      <p className="mt-8 text-center text-sm font-semibold text-orange-700">
        Keep the pipes flowing 💩
      </p>
    </div>
  ),
)

ShareBadgeCard.displayName = 'ShareBadgeCard'
