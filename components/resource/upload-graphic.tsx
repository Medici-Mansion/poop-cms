import { useFormState } from 'react-dom';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { uploadNewGraphics } from '@/app/resource/actions';
import { GraphicUploadSchema } from '@/lib/validators';
import type { UploadNewGraphicsState } from '@/types';

export function UploadGraphic() {
  const initialState: UploadNewGraphicsState = undefined;

  const [state, dispatch] = useFormState(uploadNewGraphics, initialState);

  const form = useForm<z.infer<typeof GraphicUploadSchema>>({
    resolver: zodResolver(GraphicUploadSchema),
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>그래픽 등록</DialogTitle>
          <DialogDescription>양식에 맞게 등록하세요</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={dispatch} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>카테고리</FormLabel>
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
                  </div>
                  <FormMessage>{state?.fieldErrors?.category}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input className="col-span-3" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage>{state?.fieldErrors?.name}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>파일</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        className="col-span-3"
                        type="file"
                        accept=".gif,.json"
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>
                  </div>
                  <FormMessage>{state?.fieldErrors?.file}</FormMessage>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">등록</Button>

              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  닫기
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
