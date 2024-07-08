'use client';

import { type Table } from '@tanstack/react-table';
import { Input } from 'components/ui/input';
import { DataEditor } from './data-editor';
import { GraphicUploadPopup } from '@/components/resource/graphic-upload-popup';
import { useState } from 'react';

interface DataTableToolbarProps<TType, TData> {
  type: TType;
  table: Table<TData>;
}

export function DataTableToolbar<TType, TData>({
  type,
  table,
}: DataTableToolbarProps<TType, TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const isAnyItemSelected = table.getFilteredSelectedRowModel().rows.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 justify-end items-center space-x-2">
        <Input
          placeholder="검색"
          value={(table.getState().globalFilter as string) ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-10 w-[150px] lg:w-[250px]"
        />
        {type === 'graphic' ? (
          <GraphicUploadPopup isOpen={isOpen} onOpenChange={setIsOpen} />
        ) : null}
      </div>
      {isAnyItemSelected && <DataEditor type={type} table={table} />}
    </div>
  );
}
