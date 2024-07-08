import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraphicUpdateSchema } from '@/lib/validators';
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
import { type z } from 'zod';
import { updateGraphic } from '@/apis';
import { useEffect, useState } from 'react';
import type { GraphicFieldErrors, GraphicData } from '@/types';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import LottieAnimation from './lottie-animation';
import { Button } from '../ui/button';

interface GraphicUpdateProps<TData> {
  selectedItem: TData | undefined;
}

export function GraphicUpdate<TData extends GraphicData>({
  selectedItem,
}: GraphicUpdateProps<TData>) {
  const [errors, setErrors] = useState<GraphicFieldErrors>();

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
            success: <b>수정되었습니다!</b>,
            error: <b>그래픽 이미지 수정에 실패하였습니다.</b>,
          });
        } catch (error) {
          console.error('그래픽 수정 실패 ', error);
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form action={handleEdit} className="flex flex-col w-full space-y-4">
        {/* 이미지 */}
        <FormField
          control={form.control}
          name="file"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel>파일</FormLabel>
                <FormLabel>
                  {selectedItem?.url.startsWith('http') &&
                  selectedItem?.type === 'GIF' ? (
                    <Image
                      width={48}
                      height={48}
                      src={selectedItem?.url || ''}
                      alt={selectedItem?.name || ''}
                    />
                  ) : selectedItem?.type === 'Lottie' ? (
                    <LottieAnimation url={selectedItem?.url} />
                  ) : null}
                </FormLabel>

                <FormControl>
                  <Input
                    {...fieldProps}
                    className="hidden"
                    type="file"
                    accept=".gif,.json"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>

                <FormMessage>{errors?.file}</FormMessage>
              </div>
            </FormItem>
          )}
        />

        {/* 카테고리 */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel>카테고리</FormLabel>
                <div className="flex flex-col col-span-3 gap-2">
                  <Select
                    name="category"
                    onValueChange={field.onChange}
                    defaultValue={selectedItem?.category}
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

        {/* 파일명 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel>이름</FormLabel>
                <div className="flex flex-col col-span-3 gap-2">
                  <FormControl>
                    <Input
                      className="col-span-3"
                      placeholder={selectedItem?.name}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage>{errors?.name}</FormMessage>
                </div>
              </div>
            </FormItem>
          )}
        />

        {/* 포맷 */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel>포맷</FormLabel>
                <div className="flex flex-col col-span-3 gap-2">
                  <Select
                    name="type"
                    onValueChange={field.onChange}
                    defaultValue={selectedItem?.type}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="포맷 선택" />
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

        <Button className="ml-auto" type="submit">
          수정
        </Button>
      </form>
    </Form>
  );
}
