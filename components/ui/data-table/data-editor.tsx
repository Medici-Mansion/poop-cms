'use client';

import { type Table } from '@tanstack/react-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog';
import { useContext, useEffect, useRef, useState } from 'react';
import { SquarePen, Trash2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../carousel';
import { GraphicUpdate } from '@/components/resource/graphic-update';
import { GraphicContext } from '@/components/resource/graphics';

interface DataTableEditorProps<TType, TData> {
  type: TType;
  table: Table<TData>;
}

export function DataEditor<TType, TData>({
  type,
  table,
}: DataTableEditorProps<TType, TData>) {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const getGraphics = useContext(GraphicContext);
  const prevValueRef = useRef(false);

  const handleOpen = () => {
    setOpen(true);
    setSelectedItems(table.getFilteredSelectedRowModel().rows);
  };

  const closeCallback = {
    graphic: getGraphics,
  };
  useEffect(() => {
    if (prevValueRef.current === true && open === false) {
      closeCallback[type] && closeCallback[type]();
    }
    prevValueRef.current = open;
  }, [open]);

  return (
    <div className="flex ml-8">
      <button
        className="flex items-center disabled:cursor-not-allowed text-custom-green disabled:text-custom-green/40"
        onClick={handleOpen}
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
      {/* {type === 'graphic' ? (
          <GraphicUpdatePopup
          open={open}
          onOpenChange={setOpen}
          selectedItem={selectedItems[0]?.original as GraphicData | undefined}
          />
      ) : null} */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Items</DialogTitle>
          </DialogHeader>
          <Carousel className="w-full">
            <CarouselContent>
              {selectedItems.map((item) => (
                <CarouselItem key={item.id}>
                  <GraphicUpdate selectedItem={item.original} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}
