import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { requestNotificationPermission } from '../lib/notifications'
import { actionTypes } from '../store/actions'
import { useAppContext } from '../store/context'

export const OnboardingPage = () => {
  const navigate = useNavigate()
  const { dispatch, state } = useAppContext()
  const [reminderTime, setReminderTime] = useState(state.settings.reminderTimes[0] ?? '09:30')
  const [notificationsAllowed, setNotificationsAllowed] = useState(state.settings.notificationsAllowed)
  const [permissionNote, setPermissionNote] = useState('')

  const handlePermission = async () => {
    const permission = await requestNotificationPermission()
    const allowed = permission === 'granted'
    setNotificationsAllowed(allowed)
    setPermissionNote(
      permission === 'unsupported'
        ? 'This browser does not support notifications, but your reminder time will still save.'
        : allowed
          ? 'Notifications armed. Future push magic can plug in here later.'
          : 'Permission denied for now. You can still use the in-app reminder settings.',
    )
  }

  const handleFinish = () => {
    dispatch({
      type: actionTypes.completeOnboarding,
      payload: {
        onboardingCompleted: true,
        reminderEnabled: true,
        reminderTimes: [reminderTime],
        notificationsAllowed,
      },
    })
    navigate('/home', { replace: true })
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 pb-8 pt-6">
      <PageHeader
        eyebrow="Setup"
        title="Train your daily poop quest"
        description="One fast setup, then the throne rewards your consistency."
      />

      <Card className="bg-gradient-to-br from-amber-100 to-orange-100">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">How it works</p>
        <h2 className="mt-2 text-2xl font-black text-amber-950">First poop = daily mission</h2>
        <p className="mt-2 text-sm text-amber-900/80">
          Tap once when today’s mission is complete. Only the first poop of each day counts, so no
          farming the leaderboard.
        </p>
      </Card>

      <Card className="space-y-4">
        <div>
          <label htmlFor="reminder-time" className="text-sm font-bold text-amber-950">
            Daily reminder time
          </label>
          <input
            id="reminder-time"
            type="time"
            value={reminderTime}
            onChange={(event) => setReminderTime(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-amber-200 bg-white px-4 py-3 text-amber-950 outline-none ring-orange-300 transition focus:ring"
          />
        </div>
        <Button variant="secondary" fullWidth onClick={handlePermission}>
          {notificationsAllowed ? 'Notifications ready' : 'Allow notifications'}
        </Button>
        {permissionNote ? <p className="text-sm text-amber-900/70">{permissionNote}</p> : null}
      </Card>

      <div className="mt-auto space-y-3">
        <Button fullWidth onClick={handleFinish}>
          Start the quest
        </Button>
        <Button variant="ghost" fullWidth onClick={() => navigate('/')}>
          Back to splash
        </Button>
      </div>
    </div>
  )
}
