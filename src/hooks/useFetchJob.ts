import { useQuery } from '@tanstack/react-query';
import { JobService } from '@/services/JobService';
import { JobInterface } from '@/interfaces/JobInterface';

const fetchJob = async (id: number): Promise<JobInterface> => {
  return await JobService.getJob(id);
};

export const useFetchJob = (id: number) => {
  return useQuery<JobInterface, Error>({
    queryKey: ['job', id],
    queryFn: () => fetchJob(id),
    enabled: !!id
  });
};
