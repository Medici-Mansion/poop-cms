'use client';

import { type Table } from '@tanstack/react-table';
import { Input } from 'components/ui/input';
import { DataEditor } from './data-editor';

interface DataTableToolbarProps<TType, TData> {
  type: TType;
  table: Table<TData>;
}

export function DataTableToolbar<TType, TData>({
  type,
  table,
}: DataTableToolbarProps<TType, TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="검색"
          value={(table.getState().globalFilter as string) ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <DataEditor type={type} table={table} />
    </div>
  );
}
