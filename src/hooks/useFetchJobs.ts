import { useQuery } from '@tanstack/react-query';
import { JobService } from '@/services/JobService';
import { JobInterface } from '@/interfaces/JobInterface';

const fetchJobs = async (): Promise<JobInterface[]> => {
  return await JobService.getJobs();
};

export const useFetchJobs = () => {
  return useQuery<JobInterface[], Error>({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
};
