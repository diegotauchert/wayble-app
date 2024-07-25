import { useState, createContext, useContext, ReactNode } from 'react';
import { useFetchJobs } from '@/hooks/useFetchJobs'; // Adjust the import path
import { JobInterface } from '@/interfaces/JobInterface';

interface JobContextType {
  jobs: JobInterface[] | undefined;
  isLoading: boolean;
  error: unknown;
  applyToJob: (jobId: number) => void;
  appliedJobs: { [key: number]: boolean };
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const { data: jobs, isLoading, error } = useFetchJobs();

  const [appliedJobs, setAppliedJobs] = useState<{ [key: number]: boolean }>({});

  const applyToJob = (jobId: number) => {
    setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
  };

  return (
    <JobContext.Provider value={{ jobs, isLoading, error, applyToJob, appliedJobs }}>
      {children}
    </JobContext.Provider>
  );
}

export const useJobs = () => {
  const context = useContext(JobContext);
  
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}