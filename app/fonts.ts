// /app/fonts.ts
import localFont from 'next/font/local'

export const myFont = localFont({
  src: [
    { path: '../public/mar.woff2', weight: '100', style: 'normal' },
    { path: '../public/mar.woff', weight: '100', style: 'normal' },
    { path: '../public/mar.otf', weight: '100', style: 'normal' },
  ],
  // Do NOT set variable
})
