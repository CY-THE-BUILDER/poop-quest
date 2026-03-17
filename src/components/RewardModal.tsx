import { createPortal } from 'react-dom'
import type { Badge, RewardSummary } from '../types'
import { Button } from './ui/Button'

interface RewardModalProps {
  reward: RewardSummary
  badges: Badge[]
  onClose: () => void
}

export const RewardModal = ({ reward, badges, onClose }: RewardModalProps) => {
  const unlockedBadges = badges.filter((badge) => reward.unlockedBadgeIds.includes(badge.id))

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-amber-950/35 p-4 md:items-center">
      <div className="w-full max-w-sm rounded-[32px] bg-white p-6 shadow-[0_24px_90px_rgba(120,53,15,0.34)]">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-orange-500">Reward Drop</p>
        <h2 className="mt-2 text-3xl font-black text-amber-950">Toilet triumph!</h2>
        <p className="mt-2 text-sm text-amber-900/75">
          You banked today’s coins and kept the porcelain destiny alive.
        </p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-amber-50 p-3 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-700/60">Coins</p>
            <p className="mt-1 text-2xl font-black text-amber-950">+{reward.coinsEarned}</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-3 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-700/60">Boost</p>
            <p className="mt-1 text-2xl font-black text-amber-950">x{reward.multiplier}</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-3 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-700/60">Streak</p>
            <p className="mt-1 text-2xl font-black text-amber-950">{reward.streak}</p>
          </div>
        </div>
        {unlockedBadges.length ? (
          <div className="mt-5 rounded-2xl bg-orange-50 p-4">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">New badges</p>
            <div className="mt-3 space-y-2">
              {unlockedBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="font-bold text-amber-950">{badge.name}</p>
                    <p className="text-xs text-amber-900/70">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <Button fullWidth className="mt-6" onClick={onClose}>
          Flush with pride
        </Button>
      </div>
    </div>,
    document.body,
  )
}
