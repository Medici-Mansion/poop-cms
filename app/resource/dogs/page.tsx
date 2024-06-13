import { getBreeds } from '@/apis';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

const DogsPage = async () => {
  const breeds = await getBreeds();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <Tabs defaultValue="dogs" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dogs">Dogs</TabsTrigger>
              <TabsTrigger value="graphics">Graphics</TabsTrigger>
            </TabsList>
            <TabsContent value="dogs" className="space-y-4">
              <div className="">
                {Object.keys(breeds).map((category) => (
                  <div key={category}>
                    <h2>{category}</h2>
                    <ul>
                      {breeds[category]?.map((dog) => (
                        <li key={dog.id} className="flex">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={dog.avatar}
                              alt={dog.name}
                              width={160}
                              height={160}
                            />
                            <AvatarFallback>{dog.name}</AvatarFallback>
                          </Avatar>
                          <div>{dog.name}</div>
                          <div>{dog.nameEN}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              </div> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DogsPage;
