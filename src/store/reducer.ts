import { isSameDay, parseISO } from 'date-fns'
import { starterBadges } from '../data/badges'
import { unlockEligibleBadges } from '../domain/badges'
import { getCoinsForStreak, getMultiplierForStreak } from '../domain/rewards'
import { canContinueStreak, canUseRescue, getYesterdayIso, shouldResetStreak } from '../domain/streak'
import type { AppState, PoopRecord } from '../types'
import { actionTypes, type AppAction } from './actions'

const nowIso = () => new Date().toISOString()

export const initialState: AppState = {
  settings: {
    reminderEnabled: true,
    reminderTimes: ['09:30'],
    notificationsAllowed: false,
    onboardingCompleted: false,
  },
  records: [],
  progress: {
    coins: 20,
    currentStreak: 0,
    longestStreak: 0,
    lastPoopDate: null,
    streakFreezeUsedDates: [],
  },
  badges: starterBadges,
  ui: {
    lastReward: null,
  },
}

const hasLoggedForToday = (records: PoopRecord[], dateIso: string) =>
  records.some((record) => isSameDay(parseISO(record.date), parseISO(dateIso)))

const syncProgressForDay = (state: AppState, currentIso: string): AppState => {
  if (!shouldResetStreak(state.progress.lastPoopDate, currentIso, state.progress.streakFreezeUsedDates)) {
    return state
  }

  return {
    ...state,
    progress: {
      ...state.progress,
      currentStreak: 0,
    },
  }
}

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case actionTypes.completeOnboarding: {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      }
    }

    case actionTypes.logPoop: {
      const currentIso = action.payload?.now ?? nowIso()
      const syncedState = syncProgressForDay(state, currentIso)
      if (hasLoggedForToday(syncedState.records, currentIso)) return syncedState

      const continued = canContinueStreak(
        syncedState.progress.lastPoopDate,
        currentIso,
        syncedState.progress.streakFreezeUsedDates,
      )
      const nextStreak = syncedState.progress.lastPoopDate
        ? continued
          ? syncedState.progress.currentStreak + 1
          : 1
        : 1
      const coinsEarned = getCoinsForStreak(nextStreak)
      const multiplier = getMultiplierForStreak(nextStreak)
      const nextRecord: PoopRecord = {
        id: crypto.randomUUID(),
        date: currentIso,
        timestamp: currentIso,
        completed: true,
      }
      const nextRecords = [nextRecord, ...syncedState.records]
      const { badges, unlockedBadgeIds } = unlockEligibleBadges(
        syncedState.badges,
        nextRecords.length,
        nextStreak,
        currentIso,
      )

      return {
        ...syncedState,
        records: nextRecords,
        badges,
        progress: {
          ...syncedState.progress,
          coins: syncedState.progress.coins + coinsEarned,
          currentStreak: nextStreak,
          longestStreak: Math.max(syncedState.progress.longestStreak, nextStreak),
          lastPoopDate: currentIso,
        },
        ui: {
          lastReward: {
            coinsEarned,
            multiplier,
            streak: nextStreak,
            unlockedBadgeIds,
          },
        },
      }
    }

    case actionTypes.useRescue: {
      const currentIso = action.payload?.now ?? nowIso()
      if (
        !canUseRescue(
          state.progress.coins,
          state.progress.lastPoopDate,
          currentIso,
          state.progress.streakFreezeUsedDates,
        )
      ) {
        return state
      }

      return {
        ...state,
        progress: {
          ...state.progress,
          coins: state.progress.coins - 30,
          streakFreezeUsedDates: [
            ...state.progress.streakFreezeUsedDates,
            getYesterdayIso(currentIso),
          ],
        },
      }
    }

    case actionTypes.purchaseBadge: {
      const badge = state.badges.find((item) => item.id === action.payload.badgeId)
      if (!badge || badge.unlocked || badge.type !== 'shop' || state.progress.coins < badge.cost) {
        return state
      }

      return {
        ...state,
        badges: state.badges.map((item) =>
          item.id === badge.id
            ? {
                ...item,
                unlocked: true,
                unlockedAt: nowIso(),
              }
            : item,
        ),
        progress: {
          ...state.progress,
          coins: state.progress.coins - badge.cost,
        },
      }
    }

    case actionTypes.setReminderTime: {
      return {
        ...state,
        settings: {
          ...state.settings,
          reminderTimes: action.payload.reminderTimes,
        },
      }
    }

    case actionTypes.toggleReminder: {
      return {
        ...state,
        settings: {
          ...state.settings,
          reminderEnabled: action.payload.value,
        },
      }
    }

    case actionTypes.setNotificationsAllowed: {
      return {
        ...state,
        settings: {
          ...state.settings,
          notificationsAllowed: action.payload.value,
        },
      }
    }

    case actionTypes.syncDailyState: {
      return syncProgressForDay(state, action.payload?.now ?? nowIso())
    }

    case actionTypes.clearRewardModal: {
      return {
        ...state,
        ui: {
          ...state.ui,
          lastReward: null,
        },
      }
    }

    case actionTypes.resetProgress: {
      return {
        ...initialState,
        settings: {
          ...initialState.settings,
          onboardingCompleted: true,
          reminderEnabled: state.settings.reminderEnabled,
          reminderTimes: state.settings.reminderTimes,
          notificationsAllowed: state.settings.notificationsAllowed,
        },
      }
    }

    default: {
      return state
    }
  }
}
