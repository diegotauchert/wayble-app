"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobSchema, JobFormSchema } from '@/schemas/job.schema';
import { Button, TextInput, Checkbox, Flex, Alert } from '@mantine/core';

export const JobForm = () => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<JobFormSchema>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit = async (data: JobFormSchema) => {
    try {
      console.log('Submitted Data:', data);

      setSuccess(true);
      setError(null);
    } catch (err) {
      setError('Submission failed. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {success && <Alert variant="filled" color="green" p={8} mb={8} radius="md">Job submitted successfully!</Alert>}
      {error && <Alert variant="filled" color="red" p={8} mb={8} radius="md">Error: {error}</Alert>}
      
      <Flex direction="column" gap="md">
        <TextInput
          label="Title"
          {...register('title')}
          error={errors.title?.message}
        />
        <TextInput
          label="Description"
          {...register('description')}
          error={errors.description?.message}
        />
        <TextInput
          label="Number of Positions"
          {...register('numberOfPositions', { valueAsNumber: true })}
          error={errors.numberOfPositions?.message}
        />
        <Checkbox
          label="Is the job remote?"
          {...register('isRemote')}
        />
        <TextInput
          label="Salary"
          {...register('salary', { valueAsNumber: true })}
          error={errors.salary?.message}
        />
        <Button type="submit" fullWidth>Submit Job</Button>
      </Flex>
    </form>
  );
};
