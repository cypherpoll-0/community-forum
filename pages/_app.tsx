import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/redux/providers";
import { AuthSync } from "@/components/AuthSync";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Providers>
        <AuthSync>
          <Component {...pageProps} />
        </AuthSync>
      </Providers>
    </SessionProvider>
  );
}
