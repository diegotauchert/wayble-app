import { JobMapper } from '@/mappers/JobMapper';
import { JobInterfaceAPI } from '@/interfaces/JobInterface';

describe('JobMapper', () => {
  describe('mapper', () => {
    it('should map JobInterfaceAPI to JobInterface', () => {
      const data: JobInterfaceAPI = {
        id: 1,
        title: 'Software Engineer',
        company: 'Acme Inc.',
        about: 'About Acme Inc.',
        address: '123 Main St.',
        city: 'Springfield',
        province: 'IL',
      };

      const expected = {
        ...data,
        job_name: data.title,
        company_name: data.company,
        about_us: data.about,
        fetched_at: expect.any(Date),
      };

      const result = JobMapper.mapper(data);

      expect(result).toEqual(expected);
    });
  });

  describe('mapperList', () => {
    it('should map an array of JobInterfaceAPI to an array of JobInterface', () => {
      const data: JobInterfaceAPI[] = [
        {
          id: 1,
          title: 'Software Engineer',
          company: 'Acme Inc.',
          about: 'About Acme Inc.',
          address: '123 Main St.',
          city: 'Springfield',
          province: 'BC',
        },
        {
          id: 2,
          title: 'Product Manager',
          company: 'XYZ Corp.',
          about: 'About XYZ Corp.',
          address: '321 Main St.',
          city: 'Calgary',
          province: 'Alberta',
        },
      ];

      const expected = data.map((item) => ({
        ...item,
        job_name: item.title,
        company_name: item.company,
        about_us: item.about,
        fetched_at: expect.any(Date),
      }));

      const result = JobMapper.mapperList(data);

      expect(result).toEqual(expected);
    });
  });
});