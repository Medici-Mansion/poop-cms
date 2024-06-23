'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataTable } from '@/components/ui/data-table/data-table';
import type { Graphic } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../ui/data-table/data-table-column-header';

type GraphicsProps = {
  data: Graphic[];
};

export const Graphics: React.FC<GraphicsProps> = ({ data }) => {
  const columns: ColumnDef<Graphic>[] = [
    {
      accessorKey: 'index',
      header: '순번',
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: 'url',
      header: '사진',
      cell: ({ row }) => {
        return (
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={row.getValue('url')}
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
        <DataTableColumnHeader column={column} title="파일명" />
      ),
    },
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="타입" />
      ),
    },
  ];

  return (
    <div className="flex items-center justify-between space-y-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
