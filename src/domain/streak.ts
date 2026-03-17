import { differenceInCalendarDays, parseISO, subDays } from 'date-fns'

export const getGapFromToday = (lastPoopDate: string | null, todayIso: string) => {
  if (!lastPoopDate) return Number.POSITIVE_INFINITY

  return differenceInCalendarDays(parseISO(todayIso), parseISO(lastPoopDate))
}

export const getYesterdayIso = (todayIso: string) =>
  subDays(parseISO(todayIso), 1).toISOString()

export const canContinueStreak = (
  lastPoopDate: string | null,
  todayIso: string,
  freezeDates: string[],
) => {
  if (!lastPoopDate) return false

  const gap = getGapFromToday(lastPoopDate, todayIso)
  if (gap <= 1) return true
  if (gap !== 2) return false

  return freezeDates.some((date) => date.slice(0, 10) === getYesterdayIso(todayIso).slice(0, 10))
}

export const shouldResetStreak = (
  lastPoopDate: string | null,
  todayIso: string,
  freezeDates: string[],
) => {
  if (!lastPoopDate) return false

  return !canContinueStreak(lastPoopDate, todayIso, freezeDates) && getGapFromToday(lastPoopDate, todayIso) > 1
}

export const canUseRescue = (
  coins: number,
  lastPoopDate: string | null,
  todayIso: string,
  freezeDates: string[],
) => {
  if (!lastPoopDate || coins < 30) return false
  const gap = getGapFromToday(lastPoopDate, todayIso)
  if (gap !== 2) return false

  return !freezeDates.some((date) => date.slice(0, 10) === getYesterdayIso(todayIso).slice(0, 10))
}
