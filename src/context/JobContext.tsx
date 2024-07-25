import { useState, createContext, useContext, ReactNode, useEffect, ReactElement } from 'react';
import { useFetchJobs } from '@/hooks/useFetchJobs';
import { JobContextInterface } from '@/interfaces/JobContextInterface';
import { DELAYED_FETCH_TIMEOUT } from '@/constants/globalVars';

export enum FetchStatusEnum {
  loading = 'loading',
  delayed = 'delayed',
  acknowledged = 'acknowledged',
  finished = 'finished',
}

const JobContext = createContext<JobContextInterface | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }): ReactElement<JobContextInterface> {
  const { data: jobs, isLoading, error } = useFetchJobs();

  const [appliedJobs, setAppliedJobs] = useState<{ [key: number]: boolean }>({});
  const [fetchStatus, setFetchStatus] = useState<FetchStatusEnum>(FetchStatusEnum.loading);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setFetchStatus(FetchStatusEnum.delayed);
      }
    }, DELAYED_FETCH_TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setFetchStatus(FetchStatusEnum.finished);
    }
  }, [isLoading]);

  const applyToJob = (jobId: number) => {
    setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
  };

  return (
    <JobContext.Provider value={{ jobs, isLoading, error, applyToJob, appliedJobs, fetchStatus, setFetchStatus }}>
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