'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataTable } from '@/components/ui/data-table/data-table';
import type { Breed } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../ui/data-table/data-table-column-header';

type BreedsProps = {
  data: Breed[];
};

export const Dogs: React.FC<BreedsProps> = ({ data }) => {
  const columns: ColumnDef<Breed>[] = [
    {
      accessorKey: 'avatar',
      header: '사진',
      cell: ({ row }) => {
        return (
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={row.getValue('avatar')}
              alt={row.getValue('name')}
              width={160}
              height={160}
            />
            <AvatarFallback>{row.getValue('name')}</AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={'국문'} />
      ),
    },
    {
      accessorKey: 'nameEN',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={'영문'} />
      ),
    },
  ];

  return (
    <div className="flex items-center justify-between space-y-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
