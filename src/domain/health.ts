import { differenceInCalendarDays, parseISO } from 'date-fns'

export type PoopiStatusVariant = 'normal' | 'completed' | 'warning' | 'alert'

const generalTips = [
  'Take a short walk between meetings. Your gut loves a tiny parade.',
  'Hydrate like the office coffee machine offended you.',
  'Add fruit, veg, or oats so your mission has backup dancers.',
  'Try giving yourself a calm, unhurried bathroom window each day.',
]

export const getDaysSinceLastPoop = (lastPoopDate: string | null, todayIso: string) => {
  if (!lastPoopDate) return 999

  return differenceInCalendarDays(parseISO(todayIso), parseISO(lastPoopDate))
}

export const getStatusVariant = (
  lastPoopDate: string | null,
  todayIso: string,
  hasCompletedToday: boolean,
): PoopiStatusVariant => {
  if (hasCompletedToday) return 'completed'

  const daysSince = getDaysSinceLastPoop(lastPoopDate, todayIso)

  if (daysSince >= 3) return 'alert'
  if (daysSince >= 2) return 'warning'
  return 'normal'
}

export const getConstipationTips = (daysSince: number) => {
  if (daysSince < 3) return []
  return generalTips
}
