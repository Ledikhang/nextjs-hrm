import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { AppProps } from "next/app";
import { useState } from "react";
import AuthProvider from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        key={queryClient.getQueryData("authentication") ? "auth" : "no-auth"}
      >
        <ConfigProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
          >
            <Component {...pageProps} />
          </GoogleOAuthProvider>
        </ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
