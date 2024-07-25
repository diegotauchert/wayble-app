import { Dispatch, SetStateAction } from 'react';
import { FetchStatusEnum } from '@/enum/FetchStatusEnum';
import { JobInterface } from '@/interfaces/JobInterface';

export interface JobContextInterface {
  jobs: JobInterface[] | undefined,
  isLoading: boolean,
  error: unknown,
  applyToJob: (jobId: number) => void,
  appliedJobs: { [key: number]: boolean };
  fetchStatus: FetchStatusEnum,
  setFetchStatus: Dispatch<SetStateAction<FetchStatusEnum>>
}