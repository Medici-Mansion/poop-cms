import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReportUpdateSchema } from '@/lib/validators';
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
import { updateReports } from '@/apis';
import { useState } from 'react';
import type { ReportFieldErrors, Report } from '@/types';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface ReportUpdateProps<TData> {
  selectedItem: TData | undefined;
  onEditComplete: () => void;
}

export function ReportUpdate<TData extends Report>({
  selectedItem,
  onEditComplete,
}: ReportUpdateProps<TData>) {
  const [errors, setErrors] = useState<ReportFieldErrors>();

  const form = useForm<z.infer<typeof ReportUpdateSchema>>({
    resolver: zodResolver(ReportUpdateSchema),
  });

  const handleEdit = (formData: FormData) => {
    if (selectedItem) {
      const data = {
        category: formData.get('category'),
        title: formData.get('title'),
        author: formData.get('author'),
        reason: formData.get('reason'),
        reportedDate: formData.get('reportedDate'),
        status: formData.get('status'),
      };

      const result = ReportUpdateSchema.safeParse(data);

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
      } else {
        try {
          formData.append('id', selectedItem.id);

          void toast.promise(updateReports(formData), {
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
      <Form {...form}>
        <form
          action={handleEdit}
          className="flex flex-col w-full space-y-4 gap-1 px-1"
        >
          {/* 카테고리 */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.category}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>

                  <FormMessage>{errors?.category}</FormMessage>
                </div>
              </FormItem>
            )}
          />

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
                    />
                  </FormControl>

                  <FormMessage>{errors?.title}</FormMessage>
                </div>
              </FormItem>
            )}
          />

          {/* 게시글 작성자 */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>게시글 작성자</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.author}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>

                  <FormMessage>{errors?.author}</FormMessage>
                </div>
              </FormItem>
            )}
          />
          {/* 신고 사유 */}
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>신고 사유</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.reason}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>

                  <FormMessage>{errors?.reason}</FormMessage>
                </div>
              </FormItem>
            )}
          />
          {/* 신고일 */}
          <FormField
            control={form.control}
            name="reportedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>신고일</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.reportedDate}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>

                  <FormMessage>{errors?.reportedDate}</FormMessage>
                </div>
              </FormItem>
            )}
          />
          {/* 처리 상태 */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>처리 상태</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.status}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>

                  <FormMessage>{errors?.status}</FormMessage>
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
