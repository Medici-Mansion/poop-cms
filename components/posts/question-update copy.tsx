import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionUpdateSchema } from '@/lib/validators';
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
import { updateQuestion } from '@/apis';
import { useState } from 'react';
import type { QuestionFieldErrors, Question } from '@/types';
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
import { Textarea } from '../ui/textarea';

interface QuestionUpdateProps<TData> {
  selectedItem?: TData;
  onEditComplete: () => void;
}

export function QuestionUpdate<TData extends Question>({
  selectedItem,
  onEditComplete,
}: QuestionUpdateProps<TData>) {
  const [errors, setErrors] = useState<QuestionFieldErrors>();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const form = useForm<z.infer<typeof QuestionUpdateSchema>>({
    resolver: zodResolver(QuestionUpdateSchema),
  });

  const handleEdit = (formData: FormData) => {
    if (selectedItem) {
      const data = {
        title: formData.get('title'),
        postCategory: formData.get('postCategory'),
        contents: formData.get('contents'),
      };

      const result = QuestionUpdateSchema.safeParse(data);
      console.log(result);

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
      } else {
        try {
          formData.append('id', selectedItem.id);

          void toast.promise(updateQuestion(formData), {
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

  const handleFileChange = (file: File | null | undefined, idx: number) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const urls = [...previewUrls];
      urls[idx] = fileUrl;
      setPreviewUrls(urls);
      setIsDataChanged(true);
    } else {
      setPreviewUrls([]);
    }
  };

  return (
    <Form {...form}>
      <form
        action={handleEdit}
        className="flex flex-col w-full space-y-4 gap-1 px-1 mt-12 max-h-[80vh] overflow-y-scroll"
      >
        <div className="flex gap-6">
          {selectedItem?.thumbnails.map((src, idx) => {
            return (
              <FormField
                key={idx}
                name="thumbnail"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>
                      {previewUrls[idx] ? (
                        <Image
                          width={100}
                          height={100}
                          src={previewUrls[idx] || ''}
                          alt="업로드 이미지"
                          unoptimized
                        />
                      ) : (
                        <Image
                          width={100}
                          height={100}
                          src={src || ''}
                          alt="질문방 이미지"
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
                          const file =
                            event.target.files && event.target.files[0];
                          onChange(file);
                          handleFileChange(file, idx);
                        }}
                      />
                    </FormControl>

                    <FormMessage>{errors?.thumbnail}</FormMessage>
                  </FormItem>
                )}
              />
            );
          })}
        </div>
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
                    <SelectItem value="질문">질문</SelectItem>
                    <SelectItem value="꿀팁">꿀팁</SelectItem>
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

        <div className="grid grid-cols-2 gap-4 px-1">
          {/* 조회수 */}
          <FormItem>
            <FormLabel>조회수</FormLabel>
            <FormControl>
              <Input
                placeholder={`${selectedItem?.views ?? '-'}`}
                value={`${selectedItem?.views ?? '-'}`}
                disabled
              />
            </FormControl>
          </FormItem>

          {/* 참여자 수 */}
          <FormItem>
            <FormLabel>참여자 수</FormLabel>
            <FormControl>
              <Input
                placeholder={`${selectedItem?.comments ?? '-'}`}
                value={`${selectedItem?.comments ?? '-'}`}
                disabled
              />
            </FormControl>
          </FormItem>

          {/* 투표 수 */}
          <FormItem>
            <FormLabel>투표 수</FormLabel>
            <FormControl>
              <Input
                placeholder={`${selectedItem?.votes ?? '-'}`}
                value={`${selectedItem?.votes ?? '-'}`}
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
        {/* 게시글 내용 */}
        <FormField
          control={form.control}
          name="contents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>게시글 내용</FormLabel>
              <div className="flex flex-col gap-2">
                <FormControl>
                  <Textarea
                    placeholder={selectedItem?.contents}
                    {...field}
                    value={field.value || selectedItem?.contents}
                    onChange={(e) => {
                      setIsDataChanged(true);
                      field.onChange(e);
                    }}
                    className="min-h-64"
                  />
                </FormControl>

                <FormMessage>{errors?.contents}</FormMessage>
              </div>
            </FormItem>
          )}
        />

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
