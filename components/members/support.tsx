'use client';

import { DataTable } from '@/components/ui/data-table/data-table';
import type { pageResponse, Report, SupportContextType } from '@/types';
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

export const SupportContext = createContext<SupportContextType | undefined>(
  undefined,
);

export const Supports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [category, setCategory] = useState('Report');
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

  const handleGetSupports = useCallback(async () => {
    if (category === 'Report') {
      const query = {
        category,
        order,
        graphicType: format,
        page: curPage || 1,
      };
      const { list, page, took, total, totalPage }: pageResponse<Report> =
        await getReports(query);
      console.log('Reports data', list);
      setReports(list);

      setPageInfo({
        page,
        took,
        total,
        totalPage,
        setCurPage,
      });
    } else if (category === 'Ask') {
      console.log('Ask data');
    }
  }, [category, order, format, curPage]);

  const handleChangeReportStatus = (item: Report) => {
    if (item) {
      // 처리 상태 수정 API 수행
      //
      //
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
            <SelectTrigger
              className={`w-[150px] h-[45px] bg-custom-gray-500 rounded-2xl ${
                row.getValue('status') === '처리완료'
                  ? 'text-custom-gray-300'
                  : ''
              }`}
            >
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

  useEffect(() => {
    if (category) void handleGetSupports();
  }, [category, handleGetSupports]);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <SupportContext.Provider
          value={{
            handleGetSupports,
            category,
            setCategory,
            setOrder,
            setFormat,
          }}
        >
          {category === 'Report' ? (
            <DataTable
              type="report"
              columns={columns}
              data={reports}
              pageInfo={pageInfo}
            />
          ) : category === 'Ask' ? (
            <DataTable
              type="ask"
              columns={columns}
              data={[]}
              pageInfo={pageInfo}
            />
          ) : null}
        </SupportContext.Provider>
      </div>
    </>
  );
};
