export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) return 'unsupported' as const

  const permission = await Notification.requestPermission()
  return permission
}

export const sendTestNotification = () => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return false

  const notification = new Notification('Poop Quest Reminder', {
    body: 'Captain, your daily mission awaits. Keep the pipes flowing.',
    icon: '/icon-192.svg',
    badge: '/icon-192.svg',
  })

  notification.onclick = () => window.focus()
  return true
}
