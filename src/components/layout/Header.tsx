"use client";
import Link from "next/link";
import React, { useState } from "react";

import Logo from "../ui/Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-[100px] px-4 lg:px-20 mb-0 border-b border-white">
      <div className="flex">
        <Link href={"https://poidh.xyz"}>
          <Logo />
        </Link>
      </div>
      <CustomConnectButton />
    </div>
  );
};

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="border-[#D1ECFF] rounded-lg backdrop-blur-sm bg-white/30 p-2 hover:bg-white/20"
                  >
                    connect
                  </button>
                );
              }
              return (
                <div className="flex gap-2">
                  <button
                    onClick={openAccountModal}
                    className="border-[#D1ECFF] rounded-lg backdrop-blur-sm bg-white/30 p-1 hover:bg-white/20 flex items-center gap-1 relative"
                  >
                    <div className="relative">
                      {account.ensAvatar ? (
                        <Image
                          src={account.ensAvatar}
                          className="rounded-lg"
                          alt="User Avatar"
                          width={33}
                          height={33}
                        />
                      ) : (
                        <>
                          <WalletIcon width={33} height={33} />
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full md:hidden" />
                        </>
                      )}
                    </div>
                    <span className="hidden md:block">
                      {account.ensName || account.displayName}
                    </span>
                    <ExpandMoreIcon height={12} width={12} />
                  </button>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};

const WalletIcon = ({ width = 24, height = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
      />
    </svg>
  );
};

const ExpandMoreIcon = ({
  width = 24,
  height = 24,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export default Header;
