import type { Badge } from '../types'

export const unlockEligibleBadges = (
  badges: Badge[],
  totalPoops: number,
  streak: number,
  unlockedAt: string,
) => {
  const unlockedBadgeIds: string[] = []

  const nextBadges = badges.map((badge) => {
    if (badge.unlocked || badge.type !== 'achievement' || !badge.requirement) {
      return badge
    }

    const meetsRequirement =
      (badge.requirement.kind === 'totalPoops' && totalPoops >= badge.requirement.value) ||
      (badge.requirement.kind === 'streak' && streak >= badge.requirement.value)

    if (!meetsRequirement) return badge

    unlockedBadgeIds.push(badge.id)
    return {
      ...badge,
      unlocked: true,
      unlockedAt,
    }
  })

  return { badges: nextBadges, unlockedBadgeIds }
}
