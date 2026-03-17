import { subDays } from 'date-fns'
import type { PoopRecord } from '../types'

export const sampleRecords: PoopRecord[] = Array.from({ length: 3 }, (_, index) => {
  const timestamp = subDays(new Date(), index + 1).toISOString()
  return {
    id: `sample-${index + 1}`,
    date: timestamp,
    timestamp,
    completed: true,
  }
})
