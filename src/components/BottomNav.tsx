import { NavLink } from 'react-router-dom'
import { cn } from '../lib/utils'

const items = [
  { to: '/home', label: 'Home', icon: '🏠' },
  { to: '/quest', label: 'Quest', icon: '💩' },
  { to: '/rewards', label: 'Rewards', icon: '🪙' },
  { to: '/badges', label: 'Badges', icon: '🏅' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

export const BottomNav = () => (
  <nav className="sticky bottom-4 z-20 mx-auto mt-6 flex w-full max-w-md items-center justify-between gap-2 rounded-[28px] border border-white/70 bg-white/80 p-2 shadow-[0_16px_40px_rgba(120,53,15,0.16)] backdrop-blur">
    {items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          cn(
            'flex flex-1 flex-col items-center rounded-[22px] px-2 py-2 text-[11px] font-semibold text-amber-900/65 transition',
            isActive && 'bg-amber-100 text-amber-950',
          )
        }
      >
        <span className="text-base">{item.icon}</span>
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
)
