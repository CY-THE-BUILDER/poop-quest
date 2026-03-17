export const getMultiplierForStreak = (streak: number) => {
  if (streak >= 30) return 3
  if (streak >= 14) return 2
  if (streak >= 7) return 1.5
  if (streak >= 3) return 1.2
  return 1
}

export const getCoinsForStreak = (streak: number) =>
  Math.round(10 * getMultiplierForStreak(streak))
