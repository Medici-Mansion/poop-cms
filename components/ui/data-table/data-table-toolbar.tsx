'use client';

import { type Table } from '@tanstack/react-table';
import { Input } from 'components/ui/input';
import { DataEditor } from './data-editor';
import { GraphicUploadPopup } from '@/components/resource/graphic-upload-popup';
import { useState } from 'react';
import type { EditorDataType } from '@/types';
import { GraphicRadioGroup } from '@/components/resource/graphic-radio-group';
import { BreedUploadPopup } from '@/components/resource/breed-upload-popup';
import { BreedInfo } from '@/components/resource/breed-info';

interface DataTableToolbarProps<TData> {
  type: EditorDataType;
  table: Table<TData>;
}

const placeholderList = {
  breed: '견종 이름 검색',
  graphic: '파일명 검색',
};

export function DataTableToolbar<TData>({
  type,
  table,
}: DataTableToolbarProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const isAnyItemSelected = table.getFilteredSelectedRowModel().rows.length > 0;

  const getPlaceholder = (type?: keyof typeof placeholderList): string => {
    return type ? placeholderList[type] || '검색' : '검색';
  };

  const placeholder = getPlaceholder(type);

  return (
    <div className="flex items-center justify-between mb-5">
      {type === 'breed' && <BreedInfo table={table} />}
      {type === 'graphic' && <GraphicRadioGroup />}

      <div className="flex flex-1 justify-end items-center gap-4 space-x-2">
        <Input
          placeholder={placeholder}
          value={(table.getState().globalFilter as string) ?? ''}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className=" w-[264px] h-[50px] border text-lg"
          variant="search"
        />
        {type === 'graphic' ? (
          <GraphicUploadPopup isOpen={isOpen} onOpenChange={setIsOpen} />
        ) : type === 'breed' ? (
          <BreedUploadPopup isOpen={isOpen} onOpenChange={setIsOpen} />
        ) : null}
      </div>
      {isAnyItemSelected && <DataEditor type={type} table={table} />}
    </div>
  );
}
