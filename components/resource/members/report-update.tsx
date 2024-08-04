import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReportUpdateSchema } from '@/lib/validators';
import {
  Form,
  FormControl,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

interface ReportUpdateProps<TData> {
  selectedItem: TData | undefined;
  onEditComplete: () => void;
}

export function ReportUpdate<TData extends Report>({
  selectedItem,
  onEditComplete,
}: ReportUpdateProps<TData>) {
  const [errors, setErrors] = useState<ReportFieldErrors>();
  const [isStatusChange, setIsStatusChange] = useState('');

  const form = useForm<z.infer<typeof ReportUpdateSchema>>({
    resolver: zodResolver(ReportUpdateSchema),
  });

  const handleEdit = (formData: FormData) => {
    if (selectedItem) {
      const data = {
        // category: formData.get('category'),
        // title: formData.get('title'),
        // author: formData.get('author'),
        // reason: formData.get('reason'),
        // reportedDate: formData.get('reportedDate'),
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
            error: <b>신고 내역 수정에 실패하였습니다.</b>,
          });
          onEditComplete(); // 수정 완료 후 콜백 호출
        } catch (error) {
          console.error('신고 내역 수정 실패 ', error);
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
          <div className="grid grid-cols-2 gap-4 px-1">
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <FormControl>
                <Input
                  placeholder={selectedItem?.category}
                  value={selectedItem?.category}
                  disabled
                />
              </FormControl>
            </FormItem>

            {/* 게시글 제목 */}
            <FormItem>
              <FormLabel>게시글 제목</FormLabel>
              <FormControl>
                <Input
                  placeholder={selectedItem?.title}
                  value={selectedItem?.title}
                  disabled
                />
              </FormControl>
            </FormItem>

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

            {/* 신고 사유 */}
            <FormItem>
              <FormLabel>신고 사유</FormLabel>
              <FormControl>
                <Input
                  placeholder={selectedItem?.reason}
                  value={selectedItem?.reason}
                  disabled
                />
              </FormControl>
            </FormItem>

            {/* 신고일 */}
            <FormItem>
              <FormLabel>신고일</FormLabel>
              <FormControl>
                <Input
                  placeholder={selectedItem?.reportedDate}
                  value={selectedItem?.reportedDate}
                  disabled
                />
              </FormControl>
            </FormItem>

            {/* 처리 상태 */}
            <FormItem>
              <FormLabel>처리 상태</FormLabel>
              <div className="flex flex-col gap-2">
                <Select
                  name="status"
                  onValueChange={setIsStatusChange}
                  defaultValue={selectedItem?.status}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="처리 상태 선택" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="처리중">처리중</SelectItem>
                    <SelectItem value="처리완료">처리완료</SelectItem>
                    <SelectItem value="신고거절">신고거절</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage>{errors?.status}</FormMessage>
              </div>
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
            disabled={!isStatusChange}
          >
            수정 완료
          </Button>
        </form>
      </Form>
    </>
  );
}
