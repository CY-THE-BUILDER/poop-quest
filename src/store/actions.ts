import type { Badge, UserSettings } from '../types'

export const actionTypes = {
  completeOnboarding: 'complete_onboarding',
  logPoop: 'log_poop',
  useRescue: 'use_rescue',
  purchaseBadge: 'purchase_badge',
  setReminderTime: 'set_reminder_time',
  toggleReminder: 'toggle_reminder',
  setNotificationsAllowed: 'set_notifications_allowed',
  syncDailyState: 'sync_daily_state',
  clearRewardModal: 'clear_reward_modal',
  resetProgress: 'reset_progress',
} as const

export type AppAction =
  | {
      type: typeof actionTypes.completeOnboarding
      payload: Pick<UserSettings, 'reminderEnabled' | 'reminderTimes' | 'notificationsAllowed'> & {
        onboardingCompleted: true
      }
    }
  | {
      type: typeof actionTypes.logPoop
      payload?: { now?: string }
    }
  | {
      type: typeof actionTypes.useRescue
      payload?: { now?: string }
    }
  | {
      type: typeof actionTypes.purchaseBadge
      payload: { badgeId: Badge['id'] }
    }
  | {
      type: typeof actionTypes.setReminderTime
      payload: { reminderTimes: string[] }
    }
  | {
      type: typeof actionTypes.toggleReminder
      payload: { value: boolean }
    }
  | {
      type: typeof actionTypes.setNotificationsAllowed
      payload: { value: boolean }
    }
  | {
      type: typeof actionTypes.syncDailyState
      payload?: { now?: string }
    }
  | {
      type: typeof actionTypes.clearRewardModal
    }
  | {
      type: typeof actionTypes.resetProgress
    }
