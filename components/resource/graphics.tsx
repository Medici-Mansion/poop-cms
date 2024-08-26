'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DataTable } from '@/components/ui/data-table/data-table';
import type {
  Graphic,
  GraphicContextType,
  GraphicsInfo,
  pageResponse,
} from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../ui/data-table/data-table-column-header';
import { createContext, useCallback, useEffect, useState } from 'react';
import { getGraphics } from '@/apis';
import { Checkbox } from '../ui/checkbox';
import LottieAnimation from './lottie-animation';
import { Loading } from '../common/loading';

export const GraphicContext = createContext<GraphicContextType | undefined>(
  undefined,
);

export const Graphics = () => {
  const [graphics, setGraphics] = useState<Graphic[]>([]);
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('');
  const [format, setFormat] = useState('');

  const [curPage, setCurPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    took: 0,
    total: 0,
    totalPage: 0,
    setCurPage,
  });

  const handleGetGraphics = useCallback(async () => {
    const params = {
      category,
      order,
      graphicType: format,
      page: curPage || 1,
    };
    const {
      list = [],
      page,
      took,
      total,
      totalPage,
    }: pageResponse<Graphic> = await getGraphics(params);
    setGraphics(list);
    setPageInfo({
      page,
      took: took || 10,
      total,
      totalPage,
      setCurPage,
    });
  }, [category, order, format, curPage]);

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
            <Loading />
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

  const [graphicInfo] = useState<GraphicsInfo>({
    messageLength: 0,
    stickerLength: 0,
    challengeLength: 0,
  });

  // 각 카테고리별 개수 계산용 조회
  // TODO: 개선 필요해 보임
  // const handleGetGraphicsAll = async () => {
  //   const { list } = await getGraphics();

  //   const categoryCounts = list.reduce(
  //     (acc, graphic) => {
  //       switch (graphic.category) {
  //         case 'Message':
  //           acc.messageLength += 1;
  //           break;
  //         case 'Sticker':
  //           acc.stickerLength += 1;
  //           break;
  //         case 'Challenge':
  //           acc.challengeLength += 1;
  //           break;
  //         default:
  //           break;
  //       }
  //       return acc;
  //     },
  //     { messageLength: 0, stickerLength: 0, challengeLength: 0 },
  //   );

  //   setGraphicInfo(categoryCounts);
  // };
  // useEffect(() => {
  //   void handleGetGraphicsAll();
  // }, [graphics]);

  useEffect(() => {
    if (category) void handleGetGraphics();
  }, [category, order, format, handleGetGraphics, curPage]);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <GraphicContext.Provider
          value={{
            handleGetGraphics,
            setCategory,
            setOrder,
            setFormat,
            graphicInfo,
          }}
        >
          <DataTable
            type="graphic"
            columns={columns}
            data={graphics}
            pageInfo={pageInfo}
          />
        </GraphicContext.Provider>
      </div>
    </>
  );
};
