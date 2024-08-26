import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChallengeUpdateSchema } from '@/lib/validators';
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
import { updateChallenge } from '@/apis';
import { useState } from 'react';
import type { ChallengeFieldErrors, Challenge } from '@/types';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ChallengeUpdateProps<TData> {
  selectedItem?: TData;
  onEditComplete: () => void;
}

export function ChallengeUpdate<TData extends Challenge>({
  selectedItem,
  onEditComplete,
}: ChallengeUpdateProps<TData>) {
  const [errors, setErrors] = useState<ChallengeFieldErrors>();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const form = useForm<z.infer<typeof ChallengeUpdateSchema>>({
    resolver: zodResolver(ChallengeUpdateSchema),
  });

  const handleEdit = (formData: FormData) => {
    if (selectedItem) {
      const data = {
        title: formData.get('title'),
        postCategory: formData.get('postCategory'),
        period: formData.get('period'),
      };

      const result = ChallengeUpdateSchema.safeParse(data);
      console.log(result);

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
      } else {
        try {
          formData.append('id', selectedItem.id);

          void toast.promise(updateChallenge(formData), {
            loading: '수정 중입니다.',
            success: <b>수정되었습니다!</b>,
            error: <b>챌린지 게시글 수정에 실패하였습니다.</b>,
          });
          onEditComplete(); // 수정 완료 후 콜백 호출
        } catch (error) {
          console.error('챌린지 게시글 수정 실패 ', error);
        }
      }
    }
  };

  const handleFileChange = (file: File | null | undefined) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setIsDataChanged(true);
    } else {
      setPreviewUrl('');
    }
  };

  return (
    <Form {...form}>
      <form
        action={handleEdit}
        className="flex flex-col w-full space-y-4 gap-1 px-1 mt-12"
      >
        {/* 썸네일 */}
        <FormField
          name="thumbnail"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>
                {previewUrl ? (
                  <Image
                    width={100}
                    height={100}
                    src={previewUrl || ''}
                    alt="업로드 이미지"
                    unoptimized
                  />
                ) : (
                  <Image
                    width={100}
                    height={100}
                    src={selectedItem?.thumbnail || ''}
                    alt="챌린지 썸네일 이미지"
                    unoptimized
                  />
                )}
              </FormLabel>

              <FormControl>
                <Input
                  {...fieldProps}
                  className="hidden"
                  type="file"
                  accept=".gif,.json"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    onChange(file);
                    handleFileChange(file);
                  }}
                />
              </FormControl>

              <FormMessage>{errors?.thumbnail}</FormMessage>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4 px-1">
          {/* 카테고리 */}
          <FormField
            control={form.control}
            name="postCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <div className="flex flex-col gap-2">
                  <Select
                    name="postCategory"
                    onValueChange={(e) => {
                      setIsDataChanged(true);
                      field.onChange(e);
                    }}
                    defaultValue={selectedItem?.postCategory}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="일상">일상</SelectItem>
                      <SelectItem value="패션">패션</SelectItem>
                      <SelectItem value="음식">음식</SelectItem>
                      <SelectItem value="액션">액션</SelectItem>
                      <SelectItem value="건강">건강</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage>{errors?.postCategory}</FormMessage>
                </div>
              </FormItem>
            )}
          />

          {/* 챌린지 제목 */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>챌린지 제목</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.title}
                      {...field}
                      value={field.value || selectedItem?.title}
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

          {/* 챌린지 기간 */}
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>챌린지 기간</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={`${selectedItem?.startDate} ~ ${selectedItem?.endDate}`}
                      {...field}
                      value={
                        field.value ||
                        `${selectedItem?.startDate} ~ ${selectedItem?.endDate}`
                      }
                      onChange={(e) => {
                        setIsDataChanged(true);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>

                  <FormMessage>{errors?.period}</FormMessage>
                </div>
              </FormItem>
            )}
          />

          {/* 조회수 */}
          <FormItem>
            <FormLabel>조회수</FormLabel>
            <FormControl>
              <Input
                placeholder={selectedItem?.views.toString()}
                value={selectedItem?.views}
                disabled
              />
            </FormControl>
          </FormItem>

          {/* 참여자 수 */}
          <FormItem>
            <FormLabel>참여자 수</FormLabel>
            <FormControl>
              <Input
                placeholder={selectedItem?.participants.toString()}
                value={selectedItem?.participants}
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
