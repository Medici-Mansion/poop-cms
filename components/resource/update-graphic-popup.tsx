import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraphicUpdateSchema } from '@/lib/validators';
import { type Table } from '@tanstack/react-table';

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '../ui/button';
import { type z } from 'zod';

interface GraphicPopupProps<TData> {
  table: Table<TData>;
}

export function GraphicPopup<TData>({ table }: GraphicPopupProps<TData>) {
  const handleEdit = () => {
    const selectedItems = table.getFilteredSelectedRowModel().rows;
    if (selectedItems.length === 1) {
      const item = selectedItems[0]?.original;
      console.log('edit', item);
    }
  };
  // const handleDelete = () => {
  //   console.log('delete');
  // };
  const form = useForm<z.infer<typeof GraphicUpdateSchema>>({
    resolver: zodResolver(GraphicUpdateSchema),
  });

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>그래픽 수정</DialogTitle>
        <DialogDescription>양식에 맞게 수정하세요</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form action={handleEdit} className="space-y-4">
          <DialogFooter>
            <Button type="submit">등록</Button>

            <DialogClose asChild>
              <Button type="button" variant="secondary">
                닫기
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
