"use client"

import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { signIn } from 'next-auth/react';
import { Button, TextInput } from '@mantine/core';
import { getCsrfToken } from 'next-auth/react';

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signIn('credentials', { username, password });
  };

  return (
    <form onSubmit={handleSignIn}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

      <TextInput
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Sign In</Button>
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  };
}
