import Head from 'next/head'
import { League_Spartan } from 'next/font/google'
import NewInvoice from '@/components/form/NewInvoice'
import Image from 'next/image';
import Link from 'next/link';



const inter = League_Spartan({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
      
     This is the Home Page!

     <Link href="/invoices">Invoices</Link>
      
    </>
  )
}
