import { InvoiceProvider } from "@/InvoiceContext";
import { ThemeProvider } from "@/ThemeContext";
import NewInvoice from "@/components/form/NewInvoice";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session} refetchInterval={5*60}>
        <InvoiceProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </InvoiceProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
