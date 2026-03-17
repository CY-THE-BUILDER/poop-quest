import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export const AppShell = () => (
  <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-4 pt-6">
    <main className="flex-1">
      <Outlet />
    </main>
    <BottomNav />
  </div>
)
