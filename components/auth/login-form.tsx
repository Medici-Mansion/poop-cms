'use client';

import type * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { LoginSchema } from '@/lib/validators';
import { login } from '@/actions/login';
import { FormError } from '@/components/form-error';
import { useState, useTransition } from 'react';

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    startTransition(async () => {
      const data = await login(values);
      setError(data?.error);
    });
  };
  return (
    <div className="w-full md:max-w-96 space-y-6 md:mt-48 mt-32 px-5">
      <Form {...form}>
        <Image
          width={140}
          height={100}
          className="m-auto"
          src="/images/logo.png"
          alt="POOP 로고"
        />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="아이디"
                      type="text"
                      className="h-16"
                      disabled={isPending}
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
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      className="h-16"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button
            type="submit"
            className="w-full h-16 mt-5"
            disabled={isPending}
          >
            로그인
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
