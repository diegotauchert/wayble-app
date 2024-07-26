import { HttpConnect } from "@/http/HttpConnect";
import { JobService } from "@/services/JobService";

jest.mock("@/http/HttpConnect");

describe("JobService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getJobs", () => {
    it("should return an array of jobs", async () => {
      const mockResponse = {
        data: [
          { id: 1, title: "Job 1" },
          { id: 2, title: "Job 2" },
        ],
      };

      (HttpConnect.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await JobService.getJobs();

      expect(HttpConnect.get).toHaveBeenCalledWith("/api/jobs");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("getJob", () => {
    it("should return a single job", async () => {
      const jobId = 1;
      const mockResponse = {
        data: { id: jobId, title: "Job 1" },
      };

      (HttpConnect.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await JobService.getJob(jobId);

      expect(HttpConnect.get).toHaveBeenCalledWith(`/api/jobs/${jobId}`);
      expect(result).toEqual(mockResponse.data);
    });
  });
});