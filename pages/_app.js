import { InvoiceProvider } from "@/InvoiceContext";
import { ThemeProvider } from "@/ThemeContext";
import NewInvoice from "@/components/form/NewInvoice";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </InvoiceProvider>
    </ThemeProvider>
  );
}
