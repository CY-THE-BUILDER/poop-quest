import { useRef, useState } from 'react'
import { toBlob } from 'html-to-image'
import { BadgeCard } from '../components/BadgeCard'
import { PageHeader } from '../components/PageHeader'
import { ShareBadgeCard } from '../components/ShareBadgeCard'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useAppContext } from '../store/context'
import { selectShareBadge, selectUnlockedBadges } from '../store/selectors'

export const BadgeGalleryPage = () => {
  const { state } = useAppContext()
  const unlockedBadges = selectUnlockedBadges(state)
  const selectedBadge = selectShareBadge(unlockedBadges.length ? unlockedBadges : state.badges)
  const shareRef = useRef<HTMLDivElement | null>(null)
  const [shareNote, setShareNote] = useState('')

  const handleShare = async () => {
    if (!shareRef.current || !selectedBadge) return

    const blob = await toBlob(shareRef.current, { cacheBust: true, pixelRatio: 2 })
    if (!blob) {
      setShareNote('The share card refused to materialize. Try again in a second.')
      return
    }

    const file = new File([blob], `${selectedBadge.id}.png`, { type: 'image/png' })
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: `Poop Quest: ${selectedBadge.name}`,
        text: 'Keep the pipes flowing 💩',
        files: [file],
      })
      setShareNote('Shared through your device sheet. Beautiful.')
      return
    }

    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${selectedBadge.id}.png`
    anchor.click()
    URL.revokeObjectURL(url)
    setShareNote('Downloaded the badge card as an image.')
  }

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Badge Gallery"
        title="Trophies from the porcelain frontier"
        description="Unlock them, admire them, and share your finest toilet propaganda."
      />

      <Card className="space-y-4">
        <div className="flex justify-center">
          {selectedBadge ? (
            <ShareBadgeCard badge={selectedBadge} streak={state.progress.currentStreak} ref={shareRef} />
          ) : null}
        </div>
        <Button fullWidth onClick={handleShare} disabled={!selectedBadge}>
          Share badge card
        </Button>
        {shareNote ? <p className="text-sm text-amber-900/70">{shareNote}</p> : null}
      </Card>

      <section className="space-y-3">
        <h2 className="text-lg font-black text-amber-950">Unlocked badges</h2>
        {unlockedBadges.length ? (
          unlockedBadges.map((badge) => <BadgeCard key={badge.id} badge={badge} />)
        ) : (
          <Card>
            <p className="text-sm text-amber-900/75">
              No badges yet. Consistency first, bragging rights shortly after.
            </p>
          </Card>
        )}
      </section>
    </div>
  )
}
