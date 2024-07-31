export interface JobInterfaceAPI {
  id: number, 
  title: string, 
  company: string, 
  about: string, 
  address: string,
  city: string,
  province: string
}

export interface JobInterface {
  id: number, 
  job_name: string, 
  company_name: string, 
  about_us: string, 
  address: string,
  city: string,
  province: string,
  fetched_at: Date
}