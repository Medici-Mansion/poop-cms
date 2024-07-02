'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataTable } from '@/components/ui/data-table/data-table';
import type { Graphic, GraphicParams } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../ui/data-table/data-table-column-header';
import { GraphicRadioGroup } from './graphic-radio-group';
import { createContext, useState } from 'react';
import { getGraphics } from '@/apis';
import { Checkbox } from '../ui/checkbox';
import { GraphicUploadPopup } from './graphic-upload-popup';

type GraphicsProps = {
  data: Graphic[];
};

type GraphicContextType = (data?: GraphicParams) => Promise<void>;

export const GraphicContext = createContext<GraphicContextType | undefined>(
  async () => {},
);

export const Graphics: React.FC<GraphicsProps> = ({ data }) => {
  const [graphics, setGraphics] = useState(data);

  const handleGetGraphics = async (data?: GraphicParams) => {
    const params = {
      // graphicType: 'Lottie',
      category: data?.category || '',
      // string: 'ASC',
    };
    const graphics = await getGraphics(data ? params : undefined);
    setGraphics(graphics);
  };

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
      <GraphicRadioGroup handleGetGraphics={handleGetGraphics} />
      <GraphicUploadPopup />
      <div className="flex items-center justify-between space-y-2">
        <GraphicContext.Provider value={handleGetGraphics}>
          <DataTable type="graphic" columns={columns} data={graphics} />
        </GraphicContext.Provider>
      </div>
    </>
  );
};
