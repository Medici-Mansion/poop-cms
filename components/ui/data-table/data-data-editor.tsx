'use client';

import { type Table } from '@tanstack/react-table';
import { Dialog, DialogTrigger } from '../dialog';
import { GraphicUpdatePopup } from '@/components/resource/graphic-update-popup';
import type { GraphicData } from '@/types';

interface DataTableEditorProps<TType, TData> {
  type: TType;
  table: Table<TData>;
}

export function DataEditor<TType, TData>({
  type,
  table,
}: DataTableEditorProps<TType, TData>) {
  const isOneItemSelected =
    table.getFilteredSelectedRowModel().rows.length === 1;
  const selectedItems = table.getFilteredSelectedRowModel().rows;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button disabled={!isOneItemSelected}>수정</button>
      </DialogTrigger>
      {type === 'graphic' ? (
        <GraphicUpdatePopup
          selectedItem={selectedItems[0]?.original as GraphicData | undefined}
        />
      ) : null}
    </Dialog>
  );
}
