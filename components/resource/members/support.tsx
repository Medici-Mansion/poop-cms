'use client';

import { DataTable } from '@/components/ui/data-table/data-table';
import type { Report, ReportContextType } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getReports } from '@/apis';

export const SupportContext = createContext<ReportContextType | undefined>(
  undefined,
);

export const Supports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [supportCategory, setSupportCategory] = useState('report');
  // const [order, setOrder] = useState('');
  // const [format, setFormat] = useState('');

  const handleGetSupports = useCallback(async () => {
    if (supportCategory === 'report') {
      const params = {
        supportCategory,
        // order,
        // graphicType: format,
      };
      const data = await getReports(params);
      console.log('Reports data', data);
      setReports(data);
    } else if (supportCategory === 'ask') {
      console.log('Ask data');
    }
  }, [supportCategory]);
  // }, [supportCategory, order, format]);

  const handleChangeReportStatus = (item: Report) => {
    if (item) {
      console.log('처리상태 변경', item);
    }
  };

  const columns: ColumnDef<Report>[] = [
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
      cell: ({ row }) => (
        <div>
          <Select
            defaultValue={row.getValue('status')}
            onValueChange={() => handleChangeReportStatus(row.original)}
          >
            <SelectTrigger className="w-[150px] h-[45px] bg-custom-gray-500 rounded-2xl">
              <SelectValue placeholder="처리 상태 선택" />
            </SelectTrigger>
            <SelectContent className="bg-custom-gray-400 rounded-2xl ">
              <SelectItem value="처리중">처리중</SelectItem>
              <SelectItem value="처리완료">처리완료</SelectItem>
              <SelectItem value="신고거절">신고거절</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
        {supportCategory === 'report' ? (
          <SupportContext.Provider
            value={{
              handleGetSupports,
              setSupportCategory,
              // setOrder,
              // setFormat,
            }}
          >
            <DataTable type="report" columns={columns} data={reports} />
          </SupportContext.Provider>
        ) : supportCategory === 'ask' ? (
          <SupportContext.Provider
            value={{
              handleGetSupports,
              setSupportCategory,
              // setOrder,
              // setFormat,
            }}
          >
            {/* <DataTable type="ask" columns={columns} data={reports} /> */}
          </SupportContext.Provider>
        ) : null}
      </div>
    </>
  );
};
