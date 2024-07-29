'use client';
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10, 'Password must be at least 10 characters long'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match', path: ['confirmPassword'],
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function FormWithRhfAndZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    // TODO: submit to server
    // ...
    await new Promise(resolve => setTimeout(resolve, 2000));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2">
      <input
        {...register('email')}
        type="email"
        placeholder="Email"
        className="rounded px-4 py-2"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className="rounded px-4 py-2"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}

      <input
        {...register('confirmPassword')}
        type="password"
        placeholder="Confirm password"
        className="rounded px-4 py-2"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
      )}

      <button
        disabled={isSubmitting}
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 disabled:bg-gray-500"
      >
        Submit
      </button>

    </form>
  );
}