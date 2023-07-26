import '@/styles/globals.css'
import { League_Spartan } from 'next/font/google';

export const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  display: 'swap'
})

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
