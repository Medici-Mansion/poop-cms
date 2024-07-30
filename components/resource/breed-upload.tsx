import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BreedUploadSchema } from '@/lib/validators';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from 'components/ui/button';
import { type z } from 'zod';
import { uploadBreed } from '@/apis';
import { useContext, useState } from 'react';
import type { BreedFieldErrors } from '@/types';
import { toast } from 'react-hot-toast';
import { ImageIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import LottieAnimation from './lottie-animation';
import { BreedContext } from './dogs';

interface BreedUploadProps {
  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
  uploadList: FormData[];
  setUploadList: (list: FormData[]) => void;
}

export function BreedUpload({
  onOpenChange,
  uploadList,
  setUploadList,
}: BreedUploadProps) {
  const [errors, setErrors] = useState<BreedFieldErrors>();
  const [previewUrl, setPreviewUrl] = useState('');
  const [lottieData, setLottieData] = useState<unknown>(null);
  const { handleGetBreeds } = useContext(BreedContext)!;

  const handleUpload = (formData: FormData) => {
    const file = formData.get('avatar');
    const notChanged =
      !formData.get('name') &&
      (!file || (file instanceof File && file.size === 0));

    const data = {
      nameKR: formData.get('nameKR'),
      nameEN: formData.get('nameEN'),
      avatar: formData.get('avatar'),
    };

    const result = BreedUploadSchema.safeParse(data);

    const submitType = formData.get('submitType');

    if (submitType === 'done' && notChanged) {
      onOpenChange(false);
      return;
    }

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      try {
        void toast.promise(uploadBreed(formData), {
          loading: '등록 중입니다.',
          success: () => {
            void handleGetBreeds();
            if (submitType === 'done') onOpenChange(false);
            else setUploadList([...uploadList, formData]);

            return <b>등록되었습니다!</b>;
          },
          error: <b>견종 이미지 등록에 실패하였습니다.</b>,
        });
      } catch (error) {
        console.error('견종 등록 실패 ', error);
      }
    }
  };
  const form = useForm<z.infer<typeof BreedUploadSchema>>({
    resolver: zodResolver(BreedUploadSchema),
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
          name="avatar"
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
                  accept=".jpg,.png"
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
                    placeholder="국문 이름"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>

                <FormMessage>{errors?.nameKR}</FormMessage>
              </div>
            </FormItem>
          )}
        />

        {/* 영문 이름 */}
        <FormField
          control={form.control}
          name="nameEN"
          render={({ field }) => (
            <FormItem>
              <FormLabel>영문 이름</FormLabel>
              <div className="flex flex-col gap-2">
                <FormControl>
                  <Input
                    placeholder="영문 이름"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>

                <FormMessage>{errors?.nameEN}</FormMessage>
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
