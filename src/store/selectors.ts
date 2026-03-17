import { format, isSameDay, parseISO } from 'date-fns'
import { getConstipationTips, getDaysSinceLastPoop, getStatusVariant } from '../domain/health'
import { getMultiplierForStreak } from '../domain/rewards'
import { canUseRescue } from '../domain/streak'
import type { AppState, Badge } from '../types'

const todayIso = () => new Date().toISOString()

export const selectTodayCompleted = (state: AppState) =>
  state.records.some((record) => isSameDay(parseISO(record.date), new Date()))

export const selectMultiplier = (state: AppState) =>
  getMultiplierForStreak(state.progress.currentStreak)

export const selectTotalPoops = (state: AppState) => state.records.length

export const selectCanUseRescue = (state: AppState) =>
  canUseRescue(
    state.progress.coins,
    state.progress.lastPoopDate,
    todayIso(),
    state.progress.streakFreezeUsedDates,
  )

export const selectUnlockedBadges = (state: AppState) =>
  state.badges.filter((badge) => badge.unlocked)

export const selectShopBadges = (state: AppState) =>
  state.badges.filter((badge) => badge.type === 'shop')

export const selectAchievementBadges = (state: AppState) =>
  state.badges.filter((badge) => badge.type === 'achievement')

export const selectStatusVariant = (state: AppState) =>
  getStatusVariant(state.progress.lastPoopDate, todayIso(), selectTodayCompleted(state))

export const selectDaysSinceLastPoop = (state: AppState) =>
  getDaysSinceLastPoop(state.progress.lastPoopDate, todayIso())

export const selectHealthTips = (state: AppState) =>
  getConstipationTips(selectDaysSinceLastPoop(state))

export const selectRecentRecords = (state: AppState) => state.records.slice(0, 7)

export const selectNextReminderLabel = (state: AppState) => {
  const time = state.settings.reminderTimes[0]
  if (!time) return 'No reminder time set'
  const [hours, minutes] = time.split(':').map(Number)
  const labelDate = new Date()
  labelDate.setHours(hours, minutes, 0, 0)
  return format(labelDate, 'p')
}

export const selectShareBadge = (badges: Badge[]) =>
  badges.find((badge) => badge.unlocked) ?? badges[0]
