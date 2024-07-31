import { JobInterface, JobInterfaceAPI } from '@/interfaces/JobInterface';

export class JobMapper{
  static mapper(data: JobInterfaceAPI): JobInterface {
    return {
      ...data,
      job_name: data.title,
      company_name: data.company,
      about_us: data.about,
      fetched_at: new Date()
    };
  }
  
  static mapperList(data: JobInterfaceAPI[]): JobInterface[] {
    return data.map(this.mapper);
  }
}