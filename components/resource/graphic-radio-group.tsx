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
                    await form.handleSubmit(onSubmit)();
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Message" />
                    </FormControl>
                    <FormLabel className="font-normal">말풍선</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Sticker" />
                    </FormControl>
                    <FormLabel className="font-normal">스티커</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Challenge" />
                    </FormControl>
                    <FormLabel className="font-normal">챌린지</FormLabel>
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
