'use client';

import type { Row, Table } from '@tanstack/react-table';
import { Dialog, DialogContent } from '../dialog';
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
import type { BreedData, EditorDataType, GraphicData } from '@/types';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from 'components/ui/button';
import toast from 'react-hot-toast';
import { deleteBreeds, deleteGraphics } from '@/apis';
import { BreedContext } from '@/components/resource/dogs';
import { BreedUpdate } from '@/components/resource/breed-update';

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

  const graphicContext = useContext(GraphicContext);
  const handleGetGraphics = graphicContext?.handleGetGraphics;

  const breedContext = useContext(BreedContext);
  const handleGetBreeds = breedContext?.handleGetBreeds;
  const prevValueRef = useRef(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    if (type === 'breed') {
      const items = table
        .getFilteredSelectedRowModel()
        .rows.map((item) => item.original as BreedData);
      const ids = items.map((item) => item.id);

      if (ids) {
        void toast.promise(deleteBreeds(ids), {
          loading: '삭제 중입니다.',
          success: () => {
            setAlertOpen(false);
            execCloseCallback(type);
            return <b>삭제되었습니다!</b>;
          },
          error: <b>견종 삭제에 실패하였습니다.</b>,
        });
      }
    } else if (type === 'graphic') {
      const items = table
        .getFilteredSelectedRowModel()
        .rows.map((item) => item.original as GraphicData);
      const ids = items.map((item) => item.id);

      if (ids) {
        void toast.promise(deleteGraphics(ids), {
          loading: '삭제 중입니다.',
          success: () => {
            setAlertOpen(false);
            execCloseCallback(type);
            return <b>삭제되었습니다!</b>;
          },
          error: <b>그래픽 이미지 삭제에 실패하였습니다.</b>,
        });
      }
    }
  };

  const execCloseCallback = (type?: string) => {
    const closeCallbacks = {
      graphic: () => handleGetGraphics && handleGetGraphics(),
      breed: () => handleGetBreeds && handleGetBreeds(),
    };
    const isValidType = (
      type?: string,
    ): type is keyof typeof closeCallbacks => {
      return type !== undefined && type in closeCallbacks;
    };

    // type이 유효한 경우에만 callback을 실행
    if (type && isValidType(type)) {
      const callback = closeCallbacks[type];
      if (callback) void callback();
    }
  };

  useEffect(() => {
    setSelectedItems(table.getFilteredSelectedRowModel().rows);

    if (prevValueRef.current === true && !open && isModified) {
      // 데이터 타입 별 팝업 close 시 수행할 callback
      // 수정이 일어난 경우에만 실행
      const closeCallbacks = {
        graphic: () => handleGetGraphics && handleGetGraphics(),
        breed: () => handleGetBreeds && handleGetBreeds(),
      };

      const callback = type && closeCallbacks[type];
      if (callback) void callback();

      setIsModified(false); // 재조회 후 수정 여부 상태 초기화
    }
    prevValueRef.current = open;
  }, [open, isModified, type, handleGetGraphics, handleGetBreeds, table]);

  return (
    <div className="flex ml-16">
      <button
        className="flex items-center text-nowrap disabled:cursor-not-allowed text-custom-green disabled:text-custom-green/40 text-lg"
        onClick={handleOpen}
      >
        <SquarePen className="mr-2 h-5 w-5" />
        수정
      </button>

      <button
        className="flex items-center text-nowrap ml-5 disabled:cursor-not-allowed text-custom-red disabled:text-custom-red/40 text-lg"
        onClick={() => setAlertOpen(true)}
      >
        <Trash2 className="mr-2 h-5 w-5" />
        삭제
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px]">
          {/* <DialogHeader>
            <DialogTitle>Edit Items</DialogTitle>
          </DialogHeader> */}
          <Carousel className="w-full">
            <CarouselContent>
              {selectedItems.map((item) => (
                <CarouselItem key={item.id}>
                  {type === 'graphic' ? (
                    <GraphicUpdate
                      selectedItem={item.original as GraphicData}
                      onEditComplete={() => setIsModified(true)} // 수정 완료 여부 체크
                    />
                  ) : type === 'breed' ? (
                    <BreedUpdate
                      selectedItem={item.original as BreedData}
                      onEditComplete={() => setIsModified(true)} // 수정 완료 여부 체크
                    />
                  ) : null}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
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
