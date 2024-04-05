import React from "react";
import Header from "components/layout/header";
import Sidebar from "components/layout/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <ResizablePanelGroup
        direction="horizontal"
        className="flex h-screen border-collapse overflow-hidden"
      >
        <Sidebar />
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={80}>
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10 pb-1 pt-16">
            {children}
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};
