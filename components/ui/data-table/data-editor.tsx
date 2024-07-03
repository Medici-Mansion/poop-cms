'use client';

import { type Table } from '@tanstack/react-table';
import { Dialog } from '../dialog';
import { GraphicUpdatePopup } from '@/components/resource/graphic-update-popup';
import type { GraphicData } from '@/types';
import { useState } from 'react';
import { SquarePen, Trash2 } from 'lucide-react';

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex items-center disabled:cursor-not-allowed text-custom-green disabled:text-custom-green/40"
        onClick={() => setOpen(true)}
        disabled={!isOneItemSelected}
      >
        <SquarePen className="mr-2 h-4 w-4" />
        수정
      </button>
      <button
        className="flex items-center ml-5 disabled:cursor-not-allowed text-custom-red disabled:text-custom-red/40"
        disabled={selectedItems.length === 0}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        삭제
      </button>
      {type === 'graphic' ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <GraphicUpdatePopup
            selectedItem={selectedItems[0]?.original as GraphicData | undefined}
            onOpenChange={setOpen}
          />
        </Dialog>
      ) : null}
    </>
  );
}
