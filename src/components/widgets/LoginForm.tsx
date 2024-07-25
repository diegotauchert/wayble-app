import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { Button, TextInput, PasswordInput, Flex, Alert } from '@mantine/core';
import { loginSchema, LoginFormSchema } from '@/schemas/login.schema';
import { ExclamationTriangleIcon, LockOpen1Icon } from '@radix-ui/react-icons';

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormSchema) => {
    const result = await signIn('credentials', {
      redirect: false,
      userName: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert variant="filled" color="red" p={8} mb={8} radius="md" title={`Login Error: ${error}`} icon={<ExclamationTriangleIcon width={30} className="flex items-center justify-center" />} />
      )
      }
      <Flex direction="column" gap="md">
        <TextInput
          label="Email"
          {...register('email')}
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Button 
          type="submit" 
          fullWidth
          leftSection={<LockOpen1Icon />}
        >
          Login
        </Button>
      </Flex>
    </form>
  );
}