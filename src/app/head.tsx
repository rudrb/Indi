import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인 홈페이지',
  description: '개인 홈페이지',
  icons: {
    icon: [
      { url: '/icon-01.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-01.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-01.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon.01.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: [{ url: '/icon.01.png' }],
  },
}
