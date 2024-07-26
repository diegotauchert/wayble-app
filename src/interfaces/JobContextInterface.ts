import { Dispatch, SetStateAction } from 'react';
import { FetchStatusEnum } from '@/enum/FetchStatusEnum';
import { JobInterface } from '@/interfaces/JobInterface';

export interface AppliedJob {
  id: number;
  applied: boolean;
}

export interface JobContextInterface {
  jobs: JobInterface[] | undefined,
  isLoading: boolean,
  error: unknown,
  applyToJob: (jobId: number) => void,
  appliedJobs: AppliedJob[],
  fetchStatus: FetchStatusEnum,
  setFetchStatus: Dispatch<SetStateAction<FetchStatusEnum>>
}