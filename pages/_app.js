// pages/_app.js
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // <-- This line is required
import Script from "next/script";

import "@/styles/globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import React, { useEffect } from "react"; // Ensure React and useEffect are imported

export const metadata = {
  icons: {
    icon: "/bazalogo.png", // /public path
  },
};

export default function App({ Component, pageProps:{session, ...pageProps} }) {
  useEffect(() => {
    // Import only in the browser for Bootstrap's JS functionalities
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <SessionProvider session={session}>
      <>
        <Header />
        {/* This div will wrap ALL page content rendered by <Component />
        Apply padding-top here to push content down, clearing the sticky header.
        Adjust 'pt-5' (or 'pt-6', 'pt-7') as needed based on your Navbar's actual height.
      */}
        <div className="pt-5 pt-md-7 pt-lg-8">
          {" "}
          {/* Example: smaller on mobile, larger on desktop */}
          <Component {...pageProps} />

           <Script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript" strategy="lazyOnload"></Script>

        </div>
        <Footer />

      </>
    </SessionProvider>
  );
}
