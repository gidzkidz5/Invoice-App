import NewInvoice from '@/components/form/NewInvoice';
import Layout from '@/components/layout/layout';
import '@/styles/globals.css'
import { League_Spartan } from 'next/font/google';

export const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  display: 'swap'
})

export default function App({ Component, pageProps }) {
  return (
  <Layout>
  <Component 
      {...pageProps} />
      </Layout>)
}
