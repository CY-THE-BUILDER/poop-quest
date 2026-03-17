import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { useAppContext } from '../store/context'

export const SplashPage = () => {
  const navigate = useNavigate()
  const { state } = useAppContext()

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      navigate(state.settings.onboardingCompleted ? '/home' : '/onboarding', { replace: true })
    }, 1100)

    return () => window.clearTimeout(timeout)
  }, [navigate, state.settings.onboardingCompleted])

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-between px-6 pb-8 pt-10">
      <div className="space-y-6">
        <div className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-black uppercase tracking-[0.3em] text-orange-500">
          Poop Quest
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-black leading-none text-amber-950">
            The office toilet now has a main quest.
          </h1>
          <p className="max-w-sm text-base text-amber-900/80">
            Track your daily victory, stack coins, and keep your streak alive with deeply unserious
            glory.
          </p>
        </div>
      </div>
      <div className="space-y-5">
        <div className="rounded-[32px] bg-[rgba(255,251,235,0.84)] p-6 shadow-[0_18px_60px_rgba(120,53,15,0.12)] backdrop-blur">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
                Hero briefing
              </p>
              <p className="mt-2 text-lg font-bold text-amber-950">
                First poop of the day = daily mission complete.
              </p>
            </div>
            <div className="rounded-full bg-amber-100 px-4 py-3 text-5xl">💩</div>
          </div>
        </div>
        <Button fullWidth onClick={() => navigate(state.settings.onboardingCompleted ? '/home' : '/onboarding')}>
          Enter the throne room
        </Button>
      </div>
    </div>
  )
}
