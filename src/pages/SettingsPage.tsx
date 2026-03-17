import { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { requestNotificationPermission, sendTestNotification } from '../lib/notifications'
import { actionTypes } from '../store/actions'
import { useAppContext } from '../store/context'

export const SettingsPage = () => {
  const { state, dispatch } = useAppContext()
  const [feedback, setFeedback] = useState('')

  const handleReminderToggle = () => {
    dispatch({
      type: actionTypes.toggleReminder,
      payload: { value: !state.settings.reminderEnabled },
    })
  }

  const handleTimeChange = (value: string) => {
    dispatch({
      type: actionTypes.setReminderTime,
      payload: { reminderTimes: [value] },
    })
  }

  const handlePermission = async () => {
    const permission = await requestNotificationPermission()
    const allowed = permission === 'granted'
    dispatch({
      type: actionTypes.setNotificationsAllowed,
      payload: { value: allowed },
    })
    setFeedback(
      permission === 'unsupported'
        ? 'Notifications are not supported here, but settings still save locally.'
        : allowed
          ? 'Notification permission granted.'
          : 'Permission not granted. You can try again anytime.',
    )
  }

  const handleTest = () => {
    const didSend = sendTestNotification()
    setFeedback(didSend ? 'Test notification sent.' : 'Grant notification permission first.')
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Settings"
        title="Tune the throne controls"
        description="Everything is saved locally, fast, and ready for future push upgrades."
      />

      <Card className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3">
          <div>
            <p className="font-bold text-amber-950">Reminders</p>
            <p className="text-sm text-amber-900/70">Enable a daily nudge for your mission.</p>
          </div>
          <Button variant="secondary" onClick={handleReminderToggle}>
            {state.settings.reminderEnabled ? 'On' : 'Off'}
          </Button>
        </div>

        <div>
          <label htmlFor="settings-time" className="text-sm font-bold text-amber-950">
            Reminder time
          </label>
          <input
            id="settings-time"
            type="time"
            value={state.settings.reminderTimes[0] ?? '09:30'}
            onChange={(event) => handleTimeChange(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-amber-200 bg-white px-4 py-3 text-amber-950 outline-none ring-orange-300 transition focus:ring"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button fullWidth variant="secondary" onClick={handlePermission}>
            Request permission
          </Button>
          <Button fullWidth onClick={handleTest}>
            Test notification
          </Button>
        </div>
      </Card>

      <Card className="space-y-4">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">Data vault</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-amber-900/65">Storage</p>
            <p className="mt-2 font-bold text-amber-950">localStorage only</p>
          </div>
          <div className="rounded-2xl bg-white/70 p-4">
            <p className="text-amber-900/65">Offline</p>
            <p className="mt-2 font-bold text-amber-950">PWA ready</p>
          </div>
        </div>
        <Button variant="danger" fullWidth onClick={() => dispatch({ type: actionTypes.resetProgress })}>
          Reset poop empire
        </Button>
      </Card>

      {feedback ? <p className="text-sm text-amber-900/75">{feedback}</p> : null}
    </div>
  )
}
