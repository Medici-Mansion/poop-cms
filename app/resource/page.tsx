import { Breeds } from '@/components/resource/dogs';
import { Graphics } from '@/components/resource/graphics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

const DogsPage = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="dogs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dogs">Dogs</TabsTrigger>
            <TabsTrigger value="graphics">Graphics</TabsTrigger>
          </TabsList>
          <TabsContent value="dogs" className="space-y-4">
            <Breeds />
          </TabsContent>
          <TabsContent value="graphics" className="space-y-4">
            <Graphics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DogsPage;
