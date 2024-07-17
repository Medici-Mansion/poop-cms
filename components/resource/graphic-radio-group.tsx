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
import { useContext, useEffect } from 'react';
import { GraphicContext } from './graphics';

const FormSchema = z.object({
  category: z.enum(['Message', 'Sticker', 'Challenge'], {
    required_error: 'You need to select a category type.',
  }),
});

export function GraphicRadioGroup() {
  const { setCategory } = useContext(GraphicContext)!;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { watch } = form;
  const selected = watch('category') || 'Message';

  useEffect(() => {
    setCategory && setCategory(selected);
  }, [selected, setCategory]);

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
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                  className="flex w-fit space-y-1 dark:bg-custom-gray-500 rounded-2xl"
                >
                  <FormItem
                    className={`flex items-center rounded-2xl ${selected === 'Message' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
                  >
                    <FormControl>
                      <RadioGroupItem className="hidden" value="Message" />
                    </FormControl>
                    <FormLabel className="!mt-0 px-6 py-4 font-normal cursor-pointer">
                      말풍선
                    </FormLabel>
                  </FormItem>
                  <FormItem
                    className={`flex items-center !mt-0 rounded-2xl ${selected === 'Sticker' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
                  >
                    <FormControl>
                      <RadioGroupItem className="hidden" value="Sticker" />
                    </FormControl>
                    <FormLabel className="!mt-0 px-6 py-4 font-normal cursor-pointer">
                      스티커
                    </FormLabel>
                  </FormItem>
                  <FormItem
                    className={`flex items-center !mt-0 rounded-2xl ${selected === 'Challenge' ? 'dark:bg-white dark:text-black' : 'dark:bg-custom-gray-500'}`}
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
