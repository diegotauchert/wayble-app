"use client"

import { useRouter } from 'next/router';

export default function Error() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div>
      <h1>Error</h1>
      <p>{error ? `An error occurred: ${error}` : 'An unknown error occurred.'}</p>
    </div>
  );
}