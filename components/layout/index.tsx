'use client';
import React from 'react';
import Header from 'components/layout/header';
import Sidebar from 'components/layout/sidebar';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { usePathname } from 'next/navigation';
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <Header />
      <ResizablePanelGroup
        direction="horizontal"
        className="flex h-screen border-collapse overflow-hidden"
      >
        {!pathname.includes('auth') && <Sidebar />}
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={80} className="!overflow-y-scroll">
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background pb-1 pt-16">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};
