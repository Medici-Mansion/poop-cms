"use client";

import { ThemeToggle } from "components/layout/theme-toggle";
import { cn } from "lib/utils";
import { MobileSidebar } from "components/layout/mobile-sidebar";
import Link from "next/link";
import { UserNav } from "components/layout/user-nav";
import { useSession } from "next-auth/react";
import { Button } from "components/ui/button";

export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={"/"}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <svg
            className="h-6 w-6"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_485_20755)">
              <path
                d="M100 0H20C8.9543 0 0 8.9543 0 20V100C0 111.046 8.9543 120 20 120H100C111.046 120 120 111.046 120 100V20C120 8.9543 111.046 0 100 0Z"
                fill="black"
              />
              <path
                d="M86.8848 62.9201C86.4348 56.9001 83.8048 51.5451 79.7948 47.5201V42.7301C79.7948 35.8101 74.1848 30.2051 67.2698 30.2051C62.2098 30.2051 57.8548 33.2051 55.8798 37.5201C52.9548 34.7151 48.8048 33.2551 44.4848 33.9201C37.1198 35.0551 32.0748 41.9451 33.2098 49.3051L35.3248 63.0301L33.5748 88.0301L45.4548 84.7401C50.2898 88.2951 56.4448 90.2151 62.9998 89.7201C77.2198 88.6551 87.9148 76.6551 86.8848 62.9201Z"
                fill="white"
              />
              <path
                d="M60.9998 91.2952C55.3248 91.2952 49.7898 89.5852 45.1648 86.3752L31.9298 90.0402L33.8148 63.0902L31.7248 49.5302C31.1148 45.5752 32.0798 41.6152 34.4498 38.3852C36.8198 35.1552 40.2998 33.0402 44.2548 32.4302C48.2598 31.8102 52.2398 32.8102 55.4398 35.1852C57.9948 31.1902 62.4498 28.7002 67.2648 28.7002C74.9998 28.7002 81.2898 34.9902 81.2898 42.7252V46.9052C85.4198 51.2552 87.9298 56.8802 88.3748 62.8052C88.9048 69.8602 86.5598 76.7002 81.7748 82.0652C77.0048 87.4202 70.3748 90.6652 63.1048 91.2102C62.3998 91.2652 61.6948 91.2902 60.9948 91.2902L60.9998 91.2952ZM45.7548 83.1002L46.3398 83.5302C51.0698 87.0052 56.9398 88.6702 62.8848 88.2252C69.3748 87.7402 75.2848 84.8452 79.5398 80.0752C83.7798 75.3202 85.8548 69.2702 85.3898 63.0352C84.9848 57.6152 82.6198 52.4852 78.7348 48.5802L78.2998 48.1402V42.7302C78.2998 36.6502 73.3548 31.7052 67.2748 31.7052C62.9748 31.7052 59.0398 34.2352 57.2498 38.1452L56.3698 40.0602L54.8498 38.6002C52.1298 35.9952 48.4398 34.8302 44.7248 35.4002C41.5598 35.8902 38.7748 37.5802 36.8798 40.1602C34.9848 42.7452 34.2148 45.9102 34.6998 49.0752L36.8398 62.9652L36.8298 63.1302L35.2298 86.0152L45.7648 83.1002H45.7548Z"
                fill="black"
              />
              <path
                d="M58.4151 62.2657C59.2904 62.2657 60.0001 61.5561 60.0001 60.6807C60.0001 59.8053 59.2904 59.0957 58.4151 59.0957C57.5397 59.0957 56.8301 59.8053 56.8301 60.6807C56.8301 61.5561 57.5397 62.2657 58.4151 62.2657Z"
                fill="black"
              />
              <path
                d="M66.7549 61.1553C67.6303 61.1553 68.3399 60.4457 68.3399 59.5704C68.3399 58.695 67.6303 57.9854 66.7549 57.9854C65.8795 57.9854 65.1699 58.695 65.1699 59.5704C65.1699 60.4457 65.8795 61.1553 66.7549 61.1553Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_485_20755">
                <rect width="120" height="120" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <h1 className="text-lg font-semibold">Poop!</h1>
        </Link>
        <div className={cn("block md:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {sessionData?.user ? (
            <UserNav user={sessionData.user} />
          ) : (
            <Button size="sm" asChild onClick={() => {}}>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
