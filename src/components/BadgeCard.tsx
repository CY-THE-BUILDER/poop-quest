import { format } from 'date-fns'
import type { Badge } from '../types'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

interface BadgeCardProps {
  badge: Badge
  canPurchase?: boolean
  onPurchase?: (badgeId: string) => void
}

export const BadgeCard = ({ badge, canPurchase, onPurchase }: BadgeCardProps) => (
  <Card className={badge.unlocked ? 'border-amber-300 bg-white/90' : 'bg-white/65'}>
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-100 text-3xl shadow-inner">
        {badge.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-amber-950">{badge.name}</h3>
            <p className="mt-1 text-sm text-amber-900/75">{badge.description}</p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
            {badge.type}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-amber-900/60">
            {badge.unlocked && badge.unlockedAt
              ? `Unlocked ${format(new Date(badge.unlockedAt), 'MMM d')}`
              : badge.type === 'shop'
                ? `${badge.cost} coins`
                : 'Locked until earned'}
          </p>
          {!badge.unlocked && badge.type === 'shop' ? (
            <Button
              variant="secondary"
              className="min-h-10 px-3 py-2"
              disabled={!canPurchase}
              onClick={() => onPurchase?.(badge.id)}
            >
              Buy
            </Button>
          ) : (
            <span className="text-sm font-semibold text-amber-900/80">
              {badge.unlocked ? 'Unlocked' : 'Achievement'}
            </span>
          )}
        </div>
      </div>
    </div>
  </Card>
)
