import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { PoopiStatusCard } from '../components/PoopiStatusCard'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useAppContext } from '../store/context'
import {
  selectCanUseRescue,
  selectHealthTips,
  selectMultiplier,
  selectNextReminderLabel,
  selectStatusVariant,
  selectTodayCompleted,
  selectTotalPoops,
  selectUnlockedBadges,
} from '../store/selectors'

export const HomePage = () => {
  const { state } = useAppContext()
  const todayCompleted = selectTodayCompleted(state)
  const statusVariant = selectStatusVariant(state)
  const multiplier = selectMultiplier(state)
  const tips = selectHealthTips(state)
  const rescueAvailable = selectCanUseRescue(state)
  const unlockedBadges = selectUnlockedBadges(state)

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Dashboard"
        title="Welcome back, stall champion"
        description="Your toilet empire is one quick tap away from greatness."
        aside={
          <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-orange-500">
            x{multiplier}
          </div>
        }
      />

      <PoopiStatusCard
        variant={statusVariant}
        streak={state.progress.currentStreak}
        coins={state.progress.coins}
      />

      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-700/60">Coins</p>
          <p className="mt-2 text-2xl font-black text-amber-950">{state.progress.coins}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-700/60">Longest</p>
          <p className="mt-2 text-2xl font-black text-amber-950">{state.progress.longestStreak}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-700/60">Badges</p>
          <p className="mt-2 text-2xl font-black text-amber-950">{unlockedBadges.length}</p>
        </Card>
      </div>

      <Card>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">Quick actions</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link to="/quest">
            <Button fullWidth>{todayCompleted ? 'Today is done' : 'I Did It 💩'}</Button>
          </Link>
          <Link to="/rewards">
            <Button fullWidth variant="secondary">
              Spend coins
            </Button>
          </Link>
        </div>
      </Card>

      <Card>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">Mission board</p>
        <div className="mt-4 space-y-3 text-sm text-amber-900/80">
          <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
            <span>Reminder</span>
            <span className="font-bold">{selectNextReminderLabel(state)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
            <span>Total poops</span>
            <span className="font-bold">{selectTotalPoops(state)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
            <span>Streak rescue</span>
            <span className="font-bold">{rescueAvailable ? 'Ready for 30 coins' : 'Not needed'}</span>
          </div>
        </div>
      </Card>

      {tips.length ? (
        <Card className="border-orange-200 bg-orange-50">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">Pipe patrol</p>
          <p className="mt-2 text-sm font-semibold text-amber-950">
            No poop for 3+ days. Here are some gentle lifestyle tips:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-amber-900/80">
            {tips.map((tip) => (
              <li key={tip} className="rounded-2xl bg-white/75 px-4 py-3">
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  )
}
