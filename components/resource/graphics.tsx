'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DataTable } from '@/components/ui/data-table/data-table';
import type {
  Graphic,
  GraphicContextType,
  GraphicParams,
  GraphicsInfo,
} from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../ui/data-table/data-table-column-header';
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

  const [graphicInfo, setGraphicInfo] = useState<GraphicsInfo>({
    messageLength: 0,
    stickerLength: 0,
    challengeLength: 0,
  });

  const handleGetGraphicsAll = async () => {
    try {
      const allGraphics = await getGraphics();

      // 각 카테고리별 개수를 계산
      const categoryCounts = allGraphics.reduce(
        (acc, graphic) => {
          switch (graphic.category) {
            case 'Message':
              acc.messageLength += 1;
              break;
            case 'Sticker':
              acc.stickerLength += 1;
              break;
            case 'Challenge':
              acc.challengeLength += 1;
              break;
            default:
              break;
          }
          return acc;
        },
        { messageLength: 0, stickerLength: 0, challengeLength: 0 },
      );

      // 상태 업데이트

      setGraphicInfo(categoryCounts);
    } catch (error) {
      console.error('Failed to fetch graphics:', error);
    }
  };
  useEffect(() => {
    void handleGetGraphicsAll();
  }, [graphics]);

  useEffect(() => {
    if (category) void handleGetGraphics({ category });
  }, [category]);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <GraphicContext.Provider
          value={{ handleGetGraphics, category, setCategory, graphicInfo }}
        >
          <DataTable type="graphic" columns={columns} data={graphics} />
        </GraphicContext.Provider>
      </div>
    </>
  );
};
