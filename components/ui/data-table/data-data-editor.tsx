'use client';

import { type Table } from '@tanstack/react-table';
import { Dialog, DialogTrigger } from '../dialog';
import { GraphicPopup } from '../../resource/update-graphic-popup';

interface DataTableEditorProps<TType, TData> {
  type: TType;
  table: Table<TData>;
}

export function DataEditor<TType, TData>({
  type,
  table,
}: DataTableEditorProps<TType, TData>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>수정</button>
      </DialogTrigger>
      {type === 'graphic' ? <GraphicPopup table={table} /> : null}
    </Dialog>
  );
}
