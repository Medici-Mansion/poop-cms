import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraphicUpdateSchema } from '@/lib/validators';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { updateGraphic } from '@/apis';
import { useContext, useEffect, useState } from 'react';
import type { GraphicFieldErrors, GraphicData } from '@/types';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { GraphicContext } from './graphics';

interface GraphicUpdatePopupProps<TData> {
  selectedItem: TData | undefined;
  onOpenChange: (isOpen: boolean) => void;
}

export function GraphicUpdatePopup<TData extends GraphicData>({
  selectedItem,
  onOpenChange,
}: GraphicUpdatePopupProps<TData>) {
  const [errors, setErrors] = useState<GraphicFieldErrors>();
  const getGraphics = useContext(GraphicContext);

  const form = useForm<z.infer<typeof GraphicUpdateSchema>>({
    resolver: zodResolver(GraphicUpdateSchema),
  });

  useEffect(() => {
    if (selectedItem) {
      form.reset({
        category: '',
        name: '',
        file: undefined,
        type: '',
      });
    }
  }, [selectedItem, form]);

  const handleEdit = (formData: FormData) => {
    if (selectedItem) {
      const data = {
        category: formData.get('category'),
        name: formData.get('name'),
        file: formData.get('file'),
        type: formData.get('type'),
      };

      const result = GraphicUpdateSchema.safeParse(data);

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
      } else {
        try {
          formData.append('id', selectedItem.id);
          void toast.promise(updateGraphic(formData), {
            loading: '수정 중입니다.',
            success: () => {
              if (getGraphics) void getGraphics();
              onOpenChange(false);
              return <b>수정 되었습니다!</b>;
            },
            error: <b>수정 실패하였습니다.</b>,
          });
        } catch (error) {
          console.error('그래픽 수정 실패 ', error);
        }
      }
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>그래픽 수정</DialogTitle>
        <DialogDescription>양식에 맞게 수정하세요</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form action={handleEdit} className="space-y-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>카테고리</FormLabel>
                  <div className="flex flex-col col-span-3 gap-2">
                    <Select defaultValue="-" disabled>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="grid-cols-2">
                        <SelectItem className="grid-cols-2" value="-">
                          {selectedItem?.category === 'Message'
                            ? '말풍선'
                            : selectedItem?.category === 'Sticker'
                              ? '스티커'
                              : selectedItem?.category === 'Challenge'
                                ? '챌린지'
                                : ''}
                        </SelectItem>
                      </SelectContent>
                    </Select>

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
                  <div className="flex flex-col col-span-3 gap-2">
                    <Input
                      className="col-span-3"
                      value={selectedItem?.name}
                      disabled
                    />

                    <FormControl>
                      <Input className="col-span-3" {...field} />
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
                  <div className="flex flex-col col-span-3 gap-2">
                    <Image
                      width={48}
                      height={48}
                      src={selectedItem?.url || ''}
                      alt={selectedItem?.name || ''}
                    />

                    <FormControl>
                      <Input
                        {...fieldProps}
                        className="col-span-3"
                        type="file"
                        accept=".gif,.json"
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>

                    <FormMessage>{errors?.file}</FormMessage>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>파일 타입</FormLabel>
                  <div className="flex flex-col col-span-3 gap-2">
                    <Select defaultValue="-" disabled>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="파일 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="grid-cols-2">
                        <SelectItem className="grid-cols-2" value="-">
                          {selectedItem?.type}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      name="type"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="파일 타입 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GIF">GIF</SelectItem>
                        <SelectItem value="Lottie">Lottie</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage>{errors?.type}</FormMessage>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit">수정</Button>

            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                닫기
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
