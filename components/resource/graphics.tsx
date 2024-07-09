'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataTable } from '@/components/ui/data-table/data-table';
import type { Graphic, GraphicContextType, GraphicParams } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../ui/data-table/data-table-column-header';
import { GraphicRadioGroup } from './graphic-radio-group';
import { createContext, useEffect, useState } from 'react';
import { getGraphics } from '@/apis';
import { Checkbox } from '../ui/checkbox';
import LottieAnimation from './lottie-animation';

export const GraphicContext = createContext<GraphicContextType | undefined>(
  undefined,
);

export const Graphics = () => {
  const [graphics, setGraphics] = useState<Graphic[]>([]);
  const [category, setCategory] = useState('');

  const handleGetGraphics = async (data?: GraphicParams) => {
    const graphics = await getGraphics(data);
    setGraphics(graphics);
  };

  const columns: ColumnDef<Graphic>[] = [
    {
      accessorKey: 'index',
      header: '번호',
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: 'url',
      header: '사진',
      cell: ({ row }) => {
        const type = row.getValue('type');
        return type === 'GIF' ? (
          <Avatar className="h-9 w-9">
            <AvatarImage src={row.getValue('url')} alt={row.getValue('name')} />
            <AvatarFallback>{row.getValue('name')}</AvatarFallback>
          </Avatar>
        ) : type === 'Lottie' ? (
          <LottieAnimation url={row.getValue('url')} />
        ) : null;
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
        <DataTableColumnHeader column={column} title="포맷" />
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

  useEffect(() => {
    if (category) void handleGetGraphics({ category });
  }, [category]);

  return (
    <>
      <GraphicRadioGroup
        handleGetGraphics={handleGetGraphics}
        setCategory={setCategory}
      />
      <div className="flex items-center justify-between space-y-2">
        <GraphicContext.Provider value={{ handleGetGraphics, category }}>
          <DataTable type="graphic" columns={columns} data={graphics} />
        </GraphicContext.Provider>
      </div>
    </>
  );
};
