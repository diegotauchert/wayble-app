import { HttpConnect } from "@/http/HttpConnect";
import { JobInterface } from "@/interfaces/JobInterface";

export class JobService {
  static async getJobs(): Promise<JobInterface[]> {
    const response = await HttpConnect.get('/api/jobs');
    return response.data;
  }
}