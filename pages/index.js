import Loader from "@/components/others/Loader";
import AuthForm from "../components/form/AuthForm";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import React from "react";
import InvoiceIcon from "@/components/others/InvoiceIcon";
import { ThemeContext } from "@/ThemeContext";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { session, status } = useSession();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/invoices");
      } else {
        setIsLoading(false);
      }
    });
  }, [router, status]);

  if (isLoading) {
    return (
      <>
        <p>Loading....Auth</p>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div className={`ff-sanserif homePage ${theme}`}>
        <h1>Invoices App</h1>
        <InvoiceIcon />
        <AuthForm />
      </div>
    </>
  );
}
