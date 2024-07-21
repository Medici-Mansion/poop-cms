import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

import { Button } from 'components/ui/button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-center space-x-2 m-16">
      <Button
        variant="ghost"
        className="hidden h-[50px] w-[50px] rounded-2xl p-0 lg:flex bg-custom-gray-500"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to first page</span>
        <DoubleArrowLeftIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        className="h-[50px] w-[50px] rounded-2xl p-0 bg-custom-gray-500"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      {Array.from({ length: table.getPageCount() }).map((_, idx) => (
        <Button
          key={idx}
          variant="ghost"
          className={`h-[50px] w-[50px] p-0 rounded-2xl ${idx !== table.getState().pagination.pageIndex && 'text-custom-gray-300'}`}
          onClick={() => table.setPageIndex(idx)}
        >
          <span>{idx + 1}</span>
        </Button>
      ))}

      <Button
        variant="ghost"
        className="h-[50px] w-[50px] rounded-2xl p-0 bg-custom-gray-500"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        className="hidden h-[50px] w-[50px] rounded-2xl p-0 lg:flex bg-custom-gray-500"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className="sr-only">Go to last page</span>
        <DoubleArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
