import { BadgeCard } from '../components/BadgeCard'
import { PageHeader } from '../components/PageHeader'
import { Card } from '../components/ui/Card'
import { actionTypes } from '../store/actions'
import { useAppContext } from '../store/context'
import { selectAchievementBadges, selectShopBadges } from '../store/selectors'

export const RewardsCenterPage = () => {
  const { state, dispatch } = useAppContext()
  const achievementBadges = selectAchievementBadges(state)
  const shopBadges = selectShopBadges(state)

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Rewards"
        title="Coin vault and prize desk"
        description="Earn coins through consistency, then blow them on deeply prestigious nonsense."
        aside={
          <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-orange-500">
            {state.progress.coins} coins
          </div>
        }
      />

      <Card className="bg-gradient-to-br from-amber-100 to-white">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">Coin economy</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white/75 p-4">
            <p className="text-amber-900/65">Base reward</p>
            <p className="mt-2 text-2xl font-black text-amber-950">10 coins</p>
          </div>
          <div className="rounded-2xl bg-white/75 p-4">
            <p className="text-amber-900/65">Rescue cost</p>
            <p className="mt-2 text-2xl font-black text-amber-950">30 coins</p>
          </div>
        </div>
      </Card>

      <section className="space-y-3">
        <h2 className="text-lg font-black text-amber-950">Shop badges</h2>
        {shopBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            canPurchase={state.progress.coins >= badge.cost}
            onPurchase={(badgeId) =>
              dispatch({ type: actionTypes.purchaseBadge, payload: { badgeId } })
            }
          />
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-black text-amber-950">Achievement track</h2>
        {achievementBadges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </section>
    </div>
  )
}
