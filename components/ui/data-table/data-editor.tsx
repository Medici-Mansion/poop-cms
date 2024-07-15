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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from 'components/ui/button';
import toast from 'react-hot-toast';
import { deleteGraphic } from '@/apis';

interface DataTableEditorProps<TData> {
  type: EditorDataType;
  table: Table<TData>;
}

export function DataEditor<TData>({
  type,
  table,
}: DataTableEditorProps<TData>) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Row<TData>[]>([]);
  const [isModified, setIsModified] = useState(false); // 수정 여부 상태 변수 추가
  const { category, handleGetGraphics } = useContext(GraphicContext)!;
  const prevValueRef = useRef(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    const item = selectedItems[0]?.original as GraphicData;
    if (item) {
      void toast.promise(deleteGraphic(item.id), {
        loading: '삭제 중입니다.',
        success: () => {
          setIsModified(true);
          setAlertOpen(false);
          return <b>삭제되었습니다!</b>;
        },
        error: <b>그래픽 이미지 삭제에 실패하였습니다.</b>,
      });
    }
  };

  useEffect(() => {
    setSelectedItems(table.getFilteredSelectedRowModel().rows);

    if (prevValueRef.current === true && !alertOpen && isModified) {
      // 데이터 타입 별 팝업 close 시 수행할 callback
      // 수정이 일어난 경우에만 실행
      const closeCallbacks = {
        graphic: () => handleGetGraphics({ category }),
      };

      const callback = type && closeCallbacks[type];
      if (callback) void callback();

      setIsModified(false); // 재조회 후 수정 여부 상태 초기화
    }
    prevValueRef.current = alertOpen;
  }, [alertOpen, isModified, type, handleGetGraphics, category, table]);

  useEffect(() => {
    setSelectedItems(table.getFilteredSelectedRowModel().rows);

    if (prevValueRef.current === true && !open && isModified) {
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
  }, [open, isModified, type, handleGetGraphics, category, table]);

  return (
    <div className="flex ml-8">
      <button
        className="flex items-center disabled:cursor-not-allowed text-custom-green disabled:text-custom-green/40"
        onClick={handleOpen}
      >
        <SquarePen className="mr-2 h-4 w-4" />
        수정
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

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogTrigger>
          <button
            className="flex items-center ml-5 disabled:cursor-not-allowed text-custom-red disabled:text-custom-red/40"
            disabled={selectedItems.length > 1}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            삭제
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 삭제할까요?</AlertDialogTitle>
            <AlertDialogDescription>
              선택한 모든 파일이 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <Button className="rounded-xl px-5" onClick={handleDelete}>
              삭제
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
