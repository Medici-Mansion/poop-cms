'use client';

import { type Table } from '@tanstack/react-table';
import { Dialog } from '../dialog';
import { GraphicUpdatePopup } from '@/components/resource/graphic-update-popup';
import type { GraphicData } from '@/types';
import { useState } from 'react';

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
      <button onClick={() => setOpen(true)} disabled={!isOneItemSelected}>
        수정
      </button>
      {type === 'graphic' ? (
        <Dialog open={open}>
          <GraphicUpdatePopup
            selectedItem={selectedItems[0]?.original as GraphicData | undefined}
            onOpenChange={setOpen}
          />
        </Dialog>
      ) : null}
    </>
  );
}
