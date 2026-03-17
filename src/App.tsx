import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { actionTypes } from './store/actions'
import { AppProvider, useAppContext } from './store/context'
import { BadgeGalleryPage } from './pages/BadgeGalleryPage'
import { DailyQuestPage } from './pages/DailyQuestPage'
import { HomePage } from './pages/HomePage'
import { OnboardingPage } from './pages/OnboardingPage'
import { RewardsCenterPage } from './pages/RewardsCenterPage'
import { SettingsPage } from './pages/SettingsPage'
import { SplashPage } from './pages/SplashPage'

const AppRoutes = () => {
  const { state, dispatch } = useAppContext()

  useEffect(() => {
    dispatch({ type: actionTypes.syncDailyState })
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route
          path="/onboarding"
          element={
            state.settings.onboardingCompleted ? <Navigate to="/home" replace /> : <OnboardingPage />
          }
        />
        <Route
          element={
            state.settings.onboardingCompleted ? <AppShell /> : <Navigate to="/onboarding" replace />
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/quest" element={<DailyQuestPage />} />
          <Route path="/rewards" element={<RewardsCenterPage />} />
          <Route path="/badges" element={<BadgeGalleryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
