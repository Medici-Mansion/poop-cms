'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { GraphicParams } from '@/types';

interface GraphicRadioGroupProps {
  handleGetGraphics: (data: GraphicParams) => Promise<void>;
}

const FormSchema = z.object({
  category: z.enum(['Message', 'Sticker', 'Challenge'], {
    required_error: 'You need to select a category type.',
  }),
});

export function GraphicRadioGroup({
  handleGetGraphics,
}: GraphicRadioGroupProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { watch, handleSubmit } = form;
  const selectedCategory = watch('category') || 'Message';

  async function onSubmit(data: GraphicParams) {
    await handleGetGraphics(data);
  }

  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={async (value) => {
                    field.onChange(value);
                    await handleSubmit(onSubmit)();
                  }}
                  defaultValue={field.value}
                  className="flex w-fit space-y-1 dark:bg-custom-gray-500 rounded-2xl"
                >
                  <FormItem
                    className={`flex items-center rounded-2xl ${selectedCategory === 'Message' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
                  >
                    <FormControl>
                      <RadioGroupItem className="hidden" value="Message" />
                    </FormControl>
                    <FormLabel className="!mt-0 px-6 py-4 font-normal cursor-pointer">
                      말풍선
                    </FormLabel>
                  </FormItem>
                  <FormItem
                    className={`flex items-center !mt-0 rounded-2xl ${selectedCategory === 'Sticker' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
                  >
                    <FormControl>
                      <RadioGroupItem className="hidden" value="Sticker" />
                    </FormControl>
                    <FormLabel className="!mt-0 px-6 py-4 font-normal cursor-pointer">
                      스티커
                    </FormLabel>
                  </FormItem>
                  <FormItem
                    className={`flex items-center !mt-0 rounded-2xl ${selectedCategory === 'Challenge' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
                  >
                    <FormControl>
                      <RadioGroupItem className="hidden" value="Challenge" />
                    </FormControl>
                    <FormLabel className="!mt-0 px-6 py-4 font-normal cursor-pointer">
                      챌린지
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
