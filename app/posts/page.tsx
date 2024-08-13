import { Posts as Post } from '@/components/posts/posts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

const Posts = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-24">
        <Tabs defaultValue="post" className="space-y-16">
          <TabsList tabType="menu">
            <TabsTrigger tabType="menu" value="post">
              Post
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post" className="space-y-4">
            <Post />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Posts;
