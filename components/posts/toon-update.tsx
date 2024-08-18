import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToonUpdateSchema } from '@/lib/validators';
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
import { updateToon } from '@/apis';
import { useState } from 'react';
import type { ToonFieldErrors, Toon } from '@/types';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ToonUpdateProps<TData> {
  selectedItem?: TData;
  onEditComplete: () => void;
}

export function ToonUpdate<TData extends Toon>({
  selectedItem,
  onEditComplete,
}: ToonUpdateProps<TData>) {
  const [errors, setErrors] = useState<ToonFieldErrors>();
  const [isDataChanged, setIsDataChanged] = useState(false);

  const form = useForm<z.infer<typeof ToonUpdateSchema>>({
    resolver: zodResolver(ToonUpdateSchema),
  });

  const handleEdit = (formData: FormData) => {
    if (selectedItem) {
      const data = {
        title: formData.get('title'),
        tags: formData.get('tags'),
      };

      const result = ToonUpdateSchema.safeParse(data);

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
      } else {
        try {
          formData.append('id', selectedItem.id);

          void toast.promise(updateToon(formData), {
            loading: '수정 중입니다.',
            success: <b>수정되었습니다!</b>,
            error: <b>툰 게시글 수정에 실패하였습니다.</b>,
          });
          onEditComplete(); // 수정 완료 후 콜백 호출
        } catch (error) {
          console.error('툰 게시글 수정 실패 ', error);
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form
        action={handleEdit}
        className="flex flex-col w-full space-y-4 gap-1 px-1 mt-12"
      >
        <div className="grid grid-cols-2 gap-4 px-1">
          {/* 게시글 제목 */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>게시글 제목</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.title}
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        setIsDataChanged(true);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>

                  <FormMessage>{errors?.title}</FormMessage>
                </div>
              </FormItem>
            )}
          />

          {/* 게시글 작성자 */}
          <FormItem>
            <FormLabel>게시글 작성자</FormLabel>
            <FormControl>
              <Input
                placeholder={selectedItem?.author}
                value={selectedItem?.author}
                disabled
              />
            </FormControl>
          </FormItem>

          {/* 해시태그 */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>해시태그</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.tags.join(', ')}
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => {
                        setIsDataChanged(true);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>

                  <FormMessage>{errors?.tags}</FormMessage>
                </div>
              </FormItem>
            )}
          />

          {/* 좋아요 수 */}
          <FormItem>
            <FormLabel>좋아요 수</FormLabel>
            <FormControl>
              <Input
                placeholder={selectedItem?.likes.toString()}
                value={selectedItem?.likes}
                disabled
              />
            </FormControl>
          </FormItem>

          {/* 댓글 수 */}
          <FormItem>
            <FormLabel>댓글 수</FormLabel>
            <FormControl>
              <Input
                placeholder={selectedItem?.comments.toString()}
                value={selectedItem?.comments}
                disabled
              />
            </FormControl>
          </FormItem>

          {/* 작성일 */}
          <FormItem>
            <FormLabel>작성일</FormLabel>
            <FormControl>
              <Input
                placeholder={selectedItem?.createdAt}
                value={selectedItem?.createdAt}
                disabled
              />
            </FormControl>
          </FormItem>
        </div>

        {selectedItem?.toon && (
          <div className="px-20 py-5">
            <Image
              className="grid-element"
              src={selectedItem?.toon}
              alt="툰 이미지"
              fill
            />
          </div>
        )}

        <Button
          className="!mt-8 ml-auto"
          type="submit"
          disabled={!isDataChanged}
        >
          수정 완료
        </Button>
      </form>
    </Form>
  );
}
