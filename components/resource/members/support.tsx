'use client';

import { DataTable } from '@/components/ui/data-table/data-table';
import type { Support, SupportContextType } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { createContext, useCallback, useEffect, useState } from 'react';
import { getSupports } from '@/apis';
import { Checkbox } from '@/components/ui/checkbox';

export const SupportContext = createContext<SupportContextType | undefined>(
  undefined,
);

export const Supports = () => {
  const [supports, setSupports] = useState<Support[]>([]);
  const [supportCategory, setSupportCategory] = useState('');
  // const [order, setOrder] = useState('');
  // const [format, setFormat] = useState('');

  const handleGetSupports = useCallback(async () => {
    const params = {
      supportCategory,
      // order,
      // graphicType: format,
    };
    const data = await getSupports(params);
    console.log('data', data);
    setSupports(data);
  }, [supportCategory]);
  // }, [supportCategory, order, format]);

  const columns: ColumnDef<Support>[] = [
    {
      accessorKey: 'index',
      header: '번호',
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="카테고리" />
      ),
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="게시글 제목" />
      ),
    },
    {
      accessorKey: 'reason',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="신고 사유" />
      ),
    },
    {
      accessorKey: 'reportedDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="신고 일자" />
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="처리 상태" />
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

  // useEffect(() => {
  //   if (category) void handleGetSupports();
  // }, [category, order, format, handleGetSupports]);

  useEffect(() => {
    // if (category) void handleGetSupports();
    void handleGetSupports();
  }, [supportCategory, handleGetSupports]);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <SupportContext.Provider
          value={{
            handleGetSupports,
            setSupportCategory,
            // setOrder,
            // setFormat,
          }}
        >
          <DataTable type="support" columns={columns} data={supports} />
        </SupportContext.Provider>
      </div>
    </>
  );
};
