import { useState, createContext, useCallback, useContext, ReactNode, useEffect, ReactElement } from 'react';
import { useFetchJobs } from '@/hooks/useFetchJobs';
import { JobContextInterface, AppliedJob } from '@/interfaces/JobContextInterface';
import { DELAYED_FETCH_TIMEOUT } from '@/constants/globalVars';
import { FetchStatusEnum } from '@/enum/FetchStatusEnum';

const JobContext = createContext<JobContextInterface>({} as JobContextInterface);

export function JobProvider({ children }: { children: ReactNode }): ReactElement {
  const { data: jobs, isLoading, error } = useFetchJobs();
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatusEnum>(FetchStatusEnum.loading);
  
  useEffect(() => {
    const storedAppliedJobs = localStorage.getItem('appliedJobs');
    if (storedAppliedJobs) {
      setAppliedJobs(JSON.parse(storedAppliedJobs));
    }
  }, []);

  useEffect(() => {
    if(appliedJobs?.length){
      localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    }
  }, [appliedJobs]);

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

  const applyToJob = useCallback((jobId: number) => {
    setAppliedJobs((prev) => {
      const updated = prev.some(job => job.id === jobId) 
        ? prev.map(job => job.id === jobId ? { ...job, applied: true } : job)
        : [...prev, { id: jobId, applied: true }];
      return updated;
    });
  }, []);

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
