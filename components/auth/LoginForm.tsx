'use client';

import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/app/schemas';
import Image from 'next/image';
const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
  };
  return (
    <div className="w-full lg:max-w-96 space-y-6 lg:mt-52 mt-32 px-5">
      <Form {...form}>
        <Image
          width={140}
          height={100}
          className="m-auto"
          src="/images/logo.png"
          alt="POOP 로고"
        />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>아이디</FormLabel> */}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="아이디"
                      type="text"
                      className="h-16"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>패스워드</FormLabel> */}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      className="h-16"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full h-16">
            로그인
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
