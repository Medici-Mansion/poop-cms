import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraphicUploadSchema } from '@/lib/validators';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from 'components/ui/button';
import { type z } from 'zod';
import { getGraphics, uploadGraphic } from '@/apis';
import { useState } from 'react';
import type { GraphicFieldErrors } from '@/types';
import { toast } from 'react-hot-toast';

interface GraphicUpdatePopupProps {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
}

export function GraphicUploadPopup({
  isOpen,
  onOpenChange,
}: GraphicUpdatePopupProps) {
  const [errors, setErrors] = useState<GraphicFieldErrors>();

  const handleUpload = (formData: FormData) => {
    const data = {
      category: formData.get('category'),
      name: formData.get('name'),
      file: formData.get('file'),
    };

    const result = GraphicUploadSchema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      try {
        void toast.promise(uploadGraphic(formData), {
          loading: '등록 중입니다.',
          success: () => {
            if (getGraphics) void getGraphics();
            onOpenChange(false);
            return <b>등록되었습니다!</b>;
          },
          error: <b>그래픽 이미지 등록에 실패하였습니다.</b>,
        });
      } catch (error) {
        console.error('그래픽 등록 실패 ', error);
      }
    }
  };
  const form = useForm<z.infer<typeof GraphicUploadSchema>>({
    resolver: zodResolver(GraphicUploadSchema),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => onOpenChange(true)}>
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>그래픽 추가</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form action={handleUpload} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>카테고리</FormLabel>
                    <div className="col-span-3 flex flex-col gap-2">
                      <Select
                        name="category"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="카테고리 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Message">말풍선</SelectItem>
                          <SelectItem value="Sticker">스티커</SelectItem>
                          <SelectItem value="Challenge">챌린지</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage>{errors?.category}</FormMessage>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>이름</FormLabel>
                    <div className="col-span-3 flex flex-col gap-2">
                      <FormControl>
                        <Input
                          className="col-span-3"
                          placeholder="영문 파일명"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage>{errors?.name}</FormMessage>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>파일</FormLabel>
                    <div className="col-span-3 flex flex-col gap-2">
                      <FormControl>
                        <Input
                          {...fieldProps}
                          className="col-span-3"
                          type="file"
                          accept=".gif,.json"
                          onChange={(event) =>
                            onChange(
                              event.target.files && event.target.files[0],
                            )
                          }
                        />
                      </FormControl>

                      <FormMessage>{errors?.file}</FormMessage>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="mt-8">
                추가
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
