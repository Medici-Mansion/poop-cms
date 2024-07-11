'use client';

import type { Row, Table } from '@tanstack/react-table';
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
import type { EditorDataType, GraphicData } from '@/types';

interface DataTableEditorProps<TData> {
  type: EditorDataType;
  table: Table<TData>;
}

export function DataEditor<TData>({
  type,
  table,
}: DataTableEditorProps<TData>) {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Row<TData>[]>([]);
  const [isModified, setIsModified] = useState(false); // 수정 여부 상태 변수 추가
  const { category, handleGetGraphics } = useContext(GraphicContext)!;
  const prevValueRef = useRef(false);

  const handleOpen = () => {
    setOpen(true);
    setSelectedItems(table.getFilteredSelectedRowModel().rows);
  };

  useEffect(() => {
    if (prevValueRef.current === true && open === false && isModified) {
      // 데이터 타입 별 팝업 close 시 수행할 callback
      // 수정이 일어난 경우에만 실행
      const closeCallbacks = {
        graphic: () => handleGetGraphics({ category }),
      };

      const callback = type && closeCallbacks[type];
      if (callback) void callback();

      setIsModified(false); // 재조회 후 수정 여부 상태 초기화
    }
    prevValueRef.current = open;
  }, [open, isModified, type, handleGetGraphics, category]);

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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Items</DialogTitle>
          </DialogHeader>
          <Carousel className="w-full">
            <CarouselContent>
              {selectedItems.map((item) => (
                <CarouselItem key={item.id}>
                  {type === 'graphic' && (
                    <GraphicUpdate
                      selectedItem={item.original as GraphicData}
                      onEditComplete={() => setIsModified(true)} // 수정 완료 여부 체크
                    />
                  )}
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
