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
import { useEffect, useState } from 'react';
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
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ReportUpdateProps<TData> {
  selectedItems?: TData[];
  selectedItem?: TData;
  onEditComplete: () => void;
}

export function ReportUpdate<TData extends Report>({
  selectedItems,
  selectedItem,
  onEditComplete,
}: ReportUpdateProps<TData>) {
  const [errors, setErrors] = useState<ReportFieldErrors>();
  const [isStatusChange, setIsStatusChange] = useState('');
  const [isEditItemsAll, setIsEditItemsAll] = useState(false);

  const form = useForm<z.infer<typeof ReportUpdateSchema>>({
    resolver: zodResolver(ReportUpdateSchema),
  });

  const handleEdit = (formData: FormData) => {
    if (!selectedItem && !selectedItems) return;

    const data = {
      status: formData.get('status'),
    };

    const result = ReportUpdateSchema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    try {
      const ids = [];
      if (selectedItem) {
        formData.append('id', selectedItem.id);
      } else if (selectedItems) {
        ids.push(...selectedItems.map((item) => item.id));
      }

      // TODO: 전체 변경의 경우 체크한 모든 항목 상태 변경 API 분기 필요
      const action = isEditItemsAll
        ? // ? ()=> updateReportsAll(ids)
          () => updateReports(formData)
        : () => updateReports(formData);

      if (isEditItemsAll) {
        console.log('전부 변경', formData.get('status'));
      }

      void toast.promise(action(), {
        loading: '수정 중입니다.',
        success: <b>수정되었습니다!</b>,
        error: <b>신고 내역 수정에 실패하였습니다.</b>,
      });
      onEditComplete(); // 수정 완료 후 콜백 호출
    } catch (error) {
      console.error('신고 내역 수정 실패 ', error);
    }
  };

  useEffect(() => {
    if (selectedItems && selectedItems?.length > 1) setIsEditItemsAll(true);
  }, [selectedItems]);

  return (
    <>
      {selectedItems && selectedItems.length > 1 ? (
        <>
          <DialogHeader>
            <DialogTitle>어떤 상태로 변경할까요?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            선택한 모든 글의 상태가 변경됩니다.
          </DialogDescription>
          <Form {...form}>
            <form
              action={handleEdit}
              className="flex flex-col w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={setIsStatusChange}
                        defaultValue={field.value || ''}
                        className="flex gap-8 mt-8"
                        name="status"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="처리중" />
                          </FormControl>
                          <FormLabel className="font-normal">처리중</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="처리완료" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            처리완료
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="신고거절" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            신고거절
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage>{errors?.status}</FormMessage>
                  </FormItem>
                )}
              />
              <DialogFooter className="flex flex-row mt-8 ml-auto gap-2">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    취소
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={!isStatusChange}>
                  변경
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </>
      ) : (
        <Form {...form}>
          <form
            action={handleEdit}
            className="flex flex-col w-full space-y-4 gap-1 px-1 mt-12"
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
      )}
    </>
  );
}
