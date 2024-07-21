import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BreedUpdateSchema } from '@/lib/validators';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type z } from 'zod';
import { updateBreed } from '@/apis';
import { useState } from 'react';
import type { BreedFieldErrors, BreedData } from '@/types';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { Button } from '../ui/button';

interface BreedUpdateProps<TData> {
  selectedItem: TData | undefined;
  onEditComplete: () => void;
}

export function BreedUpdate<TData extends BreedData>({
  selectedItem,
  onEditComplete,
}: BreedUpdateProps<TData>) {
  const [errors, setErrors] = useState<BreedFieldErrors>();

  const form = useForm<z.infer<typeof BreedUpdateSchema>>({
    resolver: zodResolver(BreedUpdateSchema),
  });

  const handleEdit = (formData: FormData) => {
    if (selectedItem) {
      const data = {
        category: formData.get('category'),
      };

      const result = BreedUpdateSchema.safeParse(data);

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
      } else {
        try {
          formData.append('id', selectedItem.id);
          if (!formData.get('name')) formData.delete('name');
          void toast.promise(updateBreed(formData), {
            loading: '수정 중입니다.',
            success: <b>수정되었습니다!</b>,
            error: <b>견종 정보 수정에 실패하였습니다.</b>,
          });
          onEditComplete(); // 수정 완료 후 콜백 호출
        } catch (error) {
          console.error('견종 정보 수정 실패 ', error);
        }
      }
    }
  };

  return (
    <>
      <p className="text-4xl mb-12">{selectedItem?.nameKR}</p>
      <Form {...form}>
        <form
          action={handleEdit}
          className="flex flex-col w-full space-y-4 gap-1 px-1"
        >
          {/* 이미지 */}
          <FormField
            name="file"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>
                  <Image
                    width={100}
                    height={100}
                    src={selectedItem?.avatar || ''}
                    alt={selectedItem?.nameKR || ''}
                    unoptimized
                  />
                </FormLabel>

                <FormControl>
                  <Input
                    {...fieldProps}
                    className="hidden"
                    type="file"
                    accept=".jpg,.png"
                    onChange={(event) => {
                      const file = event.target.files && event.target.files[0];
                      onChange(file);
                    }}
                  />
                </FormControl>

                <FormMessage>{errors?.file}</FormMessage>
              </FormItem>
            )}
          />

          {/* 국문 이름 */}
          <FormField
            control={form.control}
            name="nameKR"
            render={({ field }) => (
              <FormItem>
                <FormLabel>국문 이름</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.nameKR}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>

                  <FormMessage>{errors?.nameKR}</FormMessage>
                </div>
              </FormItem>
            )}
          />

          {/* 영문문 이름 */}
          <FormField
            control={form.control}
            name="nameEN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>영문 이름</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.nameEN}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>

                  <FormMessage>{errors?.nameEN}</FormMessage>
                </div>
              </FormItem>
            )}
          />

          <Button className="!mt-8 ml-auto" type="submit">
            수정
          </Button>
        </form>
      </Form>
    </>
  );
}
