import { HttpConnect } from "@/http/HttpConnect";
import { JobInterface } from "@/interfaces/JobInterface";
import { JobMapper } from '@/mappers/JobMapper';

export class JobService {
  static async getJobs(): Promise<JobInterface[]> {
    const response = await HttpConnect.get('/api/jobs');
    return JobMapper.mapperList(response.data);
  }

  static async getJob(id: number): Promise<JobInterface> {
    const response = await HttpConnect.get(`/api/jobs/${id}`);
    return JobMapper.mapper(response.data);
  }
}
