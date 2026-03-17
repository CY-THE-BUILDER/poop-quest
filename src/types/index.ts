export type BadgeType = 'achievement' | 'shop'

export interface UserSettings {
  reminderEnabled: boolean
  reminderTimes: string[]
  notificationsAllowed: boolean
  onboardingCompleted: boolean
}

export interface PoopRecord {
  id: string
  date: string
  timestamp: string
  completed: boolean
}

export interface BadgeRequirement {
  kind: 'totalPoops' | 'streak'
  value: number
}

export interface Badge {
  id: string
  name: string
  description: string
  cost: number
  unlocked: boolean
  unlockedAt?: string
  type: BadgeType
  icon: string
  requirement?: BadgeRequirement
}

export interface Progress {
  coins: number
  currentStreak: number
  longestStreak: number
  lastPoopDate: string | null
  streakFreezeUsedDates: string[]
}

export interface RewardSummary {
  coinsEarned: number
  multiplier: number
  streak: number
  unlockedBadgeIds: string[]
}

export interface AppState {
  settings: UserSettings
  records: PoopRecord[]
  progress: Progress
  badges: Badge[]
  ui: {
    lastReward: RewardSummary | null
  }
}
