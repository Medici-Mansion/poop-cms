import { Supports } from '@/components/members/support';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

const Members = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-24">
        <Tabs defaultValue="support" className="space-y-16">
          <TabsList tabType="menu">
            <TabsTrigger tabType="menu" value="members">
              Members
            </TabsTrigger>
            <TabsTrigger tabType="menu" value="support">
              Supports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="members" className="space-y-4">
            <div>Members</div>
          </TabsContent>
          <TabsContent value="support" className="space-y-4">
            <Supports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Members;
