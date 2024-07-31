import { HttpConnect } from "@/http/HttpConnect";
import { JobService } from "@/services/JobService";
import { JobMapper } from "@/mappers/JobMapper";
import { JobInterfaceAPI } from "@/interfaces/JobInterface";

jest.mock("@/http/HttpConnect");

describe("JobService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getJobs", () => {
    it("should return an array of jobs", async () => {
      const mockApiResponse = {
        data: [
          { id: 1, title: "Job 1", company: "Company A", about: "About Company A", address: "Address A", city: "City A", province: "Province A" },
          { id: 2, title: "Job 2", company: "Company B", about: "About Company B", address: "Address B", city: "City B", province: "Province B" },
        ],
      };
      const fixedDate = new Date()
      const expectedResponse = JobMapper.mapperList(mockApiResponse.data);

      (HttpConnect.get as jest.Mock).mockResolvedValue(mockApiResponse);

      jest.spyOn(global, 'Date').mockImplementation(() => fixedDate as Date);

      const result = await JobService.getJobs();

      expect(HttpConnect.get).toHaveBeenCalledWith("/api/jobs");
      expect(result).toEqual(expectedResponse);

    });
  });

  describe("getJob", () => {
    it("should return a single job", async () => {
      const jobId = 1;
      const mockApiResponse = {
        data: { id: jobId, title: "Job 1", company: "Company A", about: "About Company A", address: "Address A", city: "City A", province: "Province A" },
      };

      const fixedDate = new Date()
      const expectedResponse = JobMapper.mapper(mockApiResponse.data);

      (HttpConnect.get as jest.Mock).mockResolvedValue(mockApiResponse);

      jest.spyOn(global, 'Date').mockImplementation(() => fixedDate as Date);

      const result = await JobService.getJob(jobId);

      expect(HttpConnect.get).toHaveBeenCalledWith(`/api/jobs/${jobId}`);
      expect(result).toEqual(expectedResponse);
    });
  });
});