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
  onEditComplete: () => void;
}

export function GraphicUpdate<TData extends GraphicData>({
  selectedItem,
  onEditComplete,
}: GraphicUpdateProps<TData>) {
  const [errors, setErrors] = useState<GraphicFieldErrors>();

  const form = useForm<z.infer<typeof GraphicUpdateSchema>>({
    resolver: zodResolver(GraphicUpdateSchema),
  });

  const [fileType, setFileType] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [lottieData, setLottieData] = useState<unknown>(null);

  useEffect(() => {
    if (selectedItem) {
      form.reset({
        category: '',
      });
    }
  }, [selectedItem, form]);

  const handleEdit = (formData: FormData) => {
    if (selectedItem) {
      const data = {
        category: formData.get('category'),
      };

      const result = GraphicUpdateSchema.safeParse(data);

      if (!result.success) {
        setErrors(result.error.flatten().fieldErrors);
      } else {
        try {
          formData.append('id', selectedItem.id);
          if (!formData.get('name')) formData.delete('name');
          void toast.promise(updateGraphic(formData), {
            loading: '수정 중입니다.',
            success: <b>수정되었습니다!</b>,
            error: <b>그래픽 이미지 수정에 실패하였습니다.</b>,
          });
          onEditComplete(); // 수정 완료 후 콜백 호출
        } catch (error) {
          console.error('그래픽 수정 실패 ', error);
        }
      }
    }
  };

  const handleFileChange = (file: File | null | undefined) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      if (file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = () => {
          setLottieData(JSON.parse(reader.result as string));
          setFileType('Lottie');
        };
        reader.readAsText(file);
      } else {
        setPreviewUrl(fileUrl);
        setFileType('GIF');
        setLottieData(null);
      }
    } else {
      setPreviewUrl('');
      setLottieData(null);
    }
  };

  return (
    <>
      <p className="text-4xl mb-12">{selectedItem?.name}</p>
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
                  {previewUrl ? (
                    <Image
                      width={100}
                      height={100}
                      src={previewUrl || ''}
                      alt="업로드 이미지"
                      unoptimized
                    />
                  ) : lottieData ? (
                    <LottieAnimation
                      data={lottieData}
                      width={100}
                      height={100}
                    />
                  ) : selectedItem?.url.startsWith('http') &&
                    selectedItem?.type === 'GIF' ? (
                    <Image
                      width={100}
                      height={100}
                      src={selectedItem?.url || ''}
                      alt={selectedItem?.name || ''}
                      unoptimized
                    />
                  ) : selectedItem?.type === 'Lottie' ? (
                    <LottieAnimation
                      url={selectedItem?.url}
                      width={100}
                      height={100}
                    />
                  ) : null}
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
              </FormItem>
            )}
          />

          {/* 파일명 */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <div className="flex flex-col gap-2">
                  <FormControl>
                    <Input
                      placeholder={selectedItem?.name}
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>

                  <FormMessage>{errors?.name}</FormMessage>
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
                <FormLabel>포맷</FormLabel>
                <div className="flex flex-col gap-2">
                  <Select
                    name="type"
                    onValueChange={field.onChange}
                    value={fileType ? fileType : selectedItem?.type}
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
