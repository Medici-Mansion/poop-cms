'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataTable } from '@/components/ui/data-table/data-table';
import type { Breed, BreedContextType, GetBreedsParams } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../ui/data-table/data-table-column-header';
import { createContext, useEffect, useState } from 'react';
import { getBreeds } from '@/apis';
import { Checkbox } from '../ui/checkbox';

export const BreedContext = createContext<BreedContextType | undefined>(
  undefined,
);

export const Breeds = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const handleGetBreeds = async (query?: GetBreedsParams) => {
    const defaultQuery: GetBreedsParams = {
      orderKey: 'createdAt',
      direction: 'desc',
      // cursor: '',
    };

    const effectiveQuery = {
      ...defaultQuery,
      ...query,
    };

    const breeds = await getBreeds(effectiveQuery);
    setBreeds(breeds);
  };

  useEffect(() => {
    void handleGetBreeds();
  }, []);
  const columns: ColumnDef<Breed>[] = [
    {
      accessorKey: 'index',
      header: '번호',
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: 'avatar',
      header: '사진',
      cell: ({ row }) => (
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={row.getValue('avatar')}
            alt={row.getValue('nameKR')}
          />
          <AvatarFallback>{row.getValue('nameKR')}</AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: 'nameKR',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="국문 이름" />
      ),
    },
    {
      accessorKey: 'nameEN',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="영문 이름" />
      ),
    },
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <BreedContext.Provider value={{ handleGetBreeds }}>
          <DataTable type="breed" columns={columns} data={breeds} />
        </BreedContext.Provider>
      </div>
    </>
  );
};
