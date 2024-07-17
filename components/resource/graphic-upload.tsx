import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraphicUploadSchema } from '@/lib/validators';
import { DialogFooter } from '@/components/ui/dialog';
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
import { uploadGraphic } from '@/apis';
import { useContext, useState } from 'react';
import type { GraphicFieldErrors } from '@/types';
import { toast } from 'react-hot-toast';
import { ImageIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import LottieAnimation from './lottie-animation';
import { GraphicContext } from './graphics';

interface GraphicUpdatePopupProps {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
  uploadList: FormData[];
  setUploadList: (list: FormData[]) => void;
}

export function GraphicUpload({
  onOpenChange,
  uploadList,
  setUploadList,
}: GraphicUpdatePopupProps) {
  const [errors, setErrors] = useState<GraphicFieldErrors>();
  const [previewUrl, setPreviewUrl] = useState('');
  const [lottieData, setLottieData] = useState<unknown>(null);
  const { category, handleGetGraphics } = useContext(GraphicContext)!;

  const handleUpload = (formData: FormData) => {
    const file = formData.get('file');
    const notChanged =
      !formData.get('category') &&
      !formData.get('name') &&
      (!file || (file instanceof File && file.size === 0));

    const data = {
      category: formData.get('category'),
      name: formData.get('name'),
      file: formData.get('file'),
    };

    const result = GraphicUploadSchema.safeParse(data);

    const submitType = formData.get('submitType');

    if (submitType === 'done' && notChanged) {
      onOpenChange(false);
      return;
    }

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      try {
        void toast.promise(uploadGraphic(formData), {
          loading: '등록 중입니다.',
          success: () => {
            void handleGetGraphics({ category });
            if (submitType === 'done') onOpenChange(false);
            else setUploadList([...uploadList, formData]);

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

  const handleFileChange = (file: File | null | undefined) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      if (file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
          setLottieData(JSON.parse(reader.result as string));
        };
        reader.readAsText(file);
      } else {
        setPreviewUrl(fileUrl);
        setLottieData(null);
      }
    } else {
      setPreviewUrl('');
      setLottieData(null);
    }
  };

  return (
    <Form {...form}>
      <form
        action={handleUpload}
        className="flex flex-col w-full space-y-4 gap-3 px-1"
      >
        {/* 이미지 */}
        <FormField
          name="file"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="w-fit">
              <FormLabel className="cursor-pointer">
                {previewUrl ? (
                  <Image
                    width={100}
                    height={100}
                    src={previewUrl || ''}
                    alt="업로드 이미지"
                    unoptimized
                  />
                ) : lottieData ? (
                  <LottieAnimation data={lottieData} width={100} height={100} />
                ) : (
                  <div className="flex justify-center items-center bg-custom-gray-600 w-[100px] h-[100px]">
                    <ImageIcon width={24} height={24} />
                  </div>
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

              <FormMessage>{errors?.file}</FormMessage>
            </FormItem>
          )}
        />

        {/* 카테고리 */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>카테고리</FormLabel>
              <div className="flex flex-col gap-2">
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
            </FormItem>
          )}
        />

        {/* 파일명 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>파일명</FormLabel>
              <div className="flex flex-col gap-2">
                <FormControl>
                  <Input
                    placeholder="영문 파일명"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>

                <FormMessage>{errors?.name}</FormMessage>
              </div>
            </FormItem>
          )}
        />

        <DialogFooter>
          <div className="flex gap-3 mt-8">
            <Button
              type="submit"
              name="submitType"
              value="done"
              variant="secondary"
            >
              추가 완료 {uploadList.length > 0 ? uploadList.length : ''}
            </Button>
            <Button type="submit" name="submitType" value="continue">
              <Plus width={16} className="mr-1" />
              계속 추가
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}
