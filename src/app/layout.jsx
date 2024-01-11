import { SpeedInsights } from '@vercel/speed-insights/next';

import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}<SpeedInsights /></body>
    </html>
  )
}
