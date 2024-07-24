"use client"

import { createContext, useContext, useState } from 'react';

interface Job {
  id: number;
  title: string;
  about: string;
  address: string;
  city: string;
  province: string;
}

interface JobContextType {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  appliedJobs: { [key: number]: boolean };
  applyToJob: (jobId: number) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<{ [key: number]: boolean }>({});

  const applyToJob = (jobId: number) => {
    setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
  };

  return (
    <JobContext.Provider value={{ jobs, setJobs, appliedJobs, applyToJob }}>
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
};
