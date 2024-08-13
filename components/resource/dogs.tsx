'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DataTable } from '@/components/ui/data-table/data-table';
import type {
  Breed,
  BreedContextType,
  BreedsQuery,
  pageResponse,
} from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../ui/data-table/data-table-column-header';
import { createContext, useCallback, useEffect, useState } from 'react';
import { getBreeds } from '@/apis';
import { Checkbox } from '../ui/checkbox';
import { Loading } from '../common/loading';

export const BreedContext = createContext<BreedContextType | undefined>(
  undefined,
);

export const Breeds = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    took: 0,
    total: 0,
    totalPage: 0,
    setCurPage,
  });

  const handleGetBreeds = useCallback(
    async (query?: BreedsQuery) => {
      const defaultQuery: BreedsQuery = {
        orderKey: 'createdAt',
        direction: 'desc',
        // cursor: '',
        page: curPage || 1,
      };

      const effectiveQuery = {
        ...defaultQuery,
        ...query,
      };

      const { list, page, took, total, totalPage }: pageResponse<Breed> =
        await getBreeds(effectiveQuery);
      setBreeds(list);
      setPageInfo({
        page,
        took,
        total,
        totalPage,
        setCurPage,
      });
    },
    [curPage, setBreeds, setPageInfo],
  );

  useEffect(() => {
    void handleGetBreeds();
  }, [curPage, handleGetBreeds]);

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
          <Loading />
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
          <DataTable
            type="breed"
            columns={columns}
            data={breeds}
            pageInfo={pageInfo}
          />
        </BreedContext.Provider>
      </div>
    </>
  );
};
