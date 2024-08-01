import { z } from 'zod';

export const jobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  numberOfPositions: z.number().min(1, 'At least one position is required').int(),
  isRemote: z.boolean(),
  salary: z.number().min(0, 'Salary must be positive'),
});

export type JobFormSchema = z.infer<typeof jobSchema>;
