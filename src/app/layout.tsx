"use client";

import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import Header from "../components/layout/Header";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum, base, degen } from "viem/chains";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "poidh ai",
  projectId: "15cd18671afa3d4e8582994c04df9d89",
  chains: [degen, arbitrum, base],
  ssr: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>poidh ai</title>
      <meta name="description" content="AI-powered bounty generator inspired by poidh." />
      <link rel="icon" type="image/x-icon" href="https://poidh.xyz/favicon.ico"></link> 
      <body>
        <ToastContainer
          autoClose={2000} // 2 seconds
        />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Header />
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
