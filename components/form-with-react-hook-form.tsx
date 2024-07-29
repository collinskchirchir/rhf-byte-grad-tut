'use client';

import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export default function FormWithReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
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
        {...register('email', {
          required: 'Email is required',
        })}
        type="email"
        placeholder="Email"
        className="rounded px-4 py-2"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <input
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 10,
            message: 'Password must be at least 10 characters',
          },
        })}
        type="password"
        placeholder="Password"
        className="rounded px-4 py-2"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}

      <input
        {...register('confirmPassword', {
          required: 'Confirm Password is required',
          validate: (value) => value === 'password' || 'Passwords must match',
        })}
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