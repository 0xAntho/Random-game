"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";

//importing the chains we need (here, just Sepolia)
import {
  sepolia
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

const { wallets } = getDefaultWallets();

export const config = getDefaultConfig({
  appName: "ENS dapp",
  projectId: "7b8e85aea08a6600d982a93e0a05b6bd",
  // the above value needs to be replaced
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
   sepolia
  ],
  ssr: true,
});

// TanStack Query is a library that makes it very easy to fetch, cache and handle data.
// It gives you declarative, always-up-to-date auto-managed queries and mutations.
export const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
