
import AuthForm from '../components/form/AuthForm';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession()
      .then(session => {
        if (session) {
          router.replace('/invoices');
        } else {
          setIsLoading(false)
        }
      })
  },[router])

  if (isLoading) {
    return <p>Loading....Auth</p>
  }


  return (
    <>
      
     This is the Home Page!

    <AuthForm /> 
      
    </>
  )
}
