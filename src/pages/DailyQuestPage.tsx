import { format } from 'date-fns'
import { PageHeader } from '../components/PageHeader'
import { RewardModal } from '../components/RewardModal'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { actionTypes } from '../store/actions'
import { useAppContext } from '../store/context'
import { selectCanUseRescue, selectRecentRecords, selectTodayCompleted } from '../store/selectors'

export const DailyQuestPage = () => {
  const { state, dispatch } = useAppContext()
  const todayCompleted = selectTodayCompleted(state)
  const recentRecords = selectRecentRecords(state)
  const canUseRescue = selectCanUseRescue(state)

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Daily Quest"
        title={todayCompleted ? 'Today is already conquered' : 'Claim today’s throne victory'}
        description="One-handed, one tap, one glorious log. The first poop of the day is all that counts."
      />

      <Card className="bg-gradient-to-br from-amber-200 to-orange-100 text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white/80 text-6xl shadow-inner">
          💩
        </div>
        <h2 className="mt-4 text-3xl font-black text-amber-950">
          {todayCompleted ? 'Quest complete' : 'Ready to report?'}
        </h2>
        <p className="mt-2 text-sm text-amber-900/80">
          Tap the button after the first successful mission of the day.
        </p>
        <Button
          fullWidth
          className="mt-6 text-lg"
          disabled={todayCompleted}
          onClick={() => dispatch({ type: actionTypes.logPoop })}
        >
          {todayCompleted ? 'Already logged today' : 'I Did It 💩'}
        </Button>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">Streak Rescue</p>
            <p className="mt-2 text-sm text-amber-900/80">
              Spend 30 coins to save a streak after missing one day.
            </p>
          </div>
          <Button
            variant="secondary"
            disabled={!canUseRescue}
            onClick={() => dispatch({ type: actionTypes.useRescue })}
          >
            Rescue
          </Button>
        </div>
      </Card>

      <Card>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">Recent logs</p>
        <div className="mt-4 space-y-3">
          {recentRecords.length ? (
            recentRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 text-sm"
              >
                <span>{format(new Date(record.timestamp), 'EEE, MMM d')}</span>
                <span className="font-bold text-amber-950">Completed</span>
              </div>
            ))
          ) : (
            <p className="rounded-2xl bg-white/70 px-4 py-3 text-sm text-amber-900/75">
              No logs yet. Your porcelain saga begins the moment you tap.
            </p>
          )}
        </div>
      </Card>

      {state.ui.lastReward ? (
        <RewardModal
          reward={state.ui.lastReward}
          badges={state.badges}
          onClose={() => dispatch({ type: actionTypes.clearRewardModal })}
        />
      ) : null}
    </div>
  )
}
