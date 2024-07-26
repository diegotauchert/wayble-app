import { HttpConnect } from '@/services/http/HttpConnect';

describe('HttpConnect', () => {
  describe('get', () => {
    it('should make a GET request with the provided relative URL', async () => {
      const relativeUrl = '/api/users';
      const response = { data: { id: 1, name: 'John Doe' } };
      const axiosInstance = {
        get: jest.fn().mockResolvedValue(response),
      };
      jest.spyOn(HttpConnect, 'getInstance').mockResolvedValue(axiosInstance as any);

      const result = await HttpConnect.get(relativeUrl);

      expect(HttpConnect.getInstance).toHaveBeenCalled();
      expect(axiosInstance.get).toHaveBeenCalledWith(relativeUrl, {});
      expect(result).toEqual(response);
    });
  });

  describe('post', () => {
    it('should make a POST request with the provided relative URL and data', async () => {
      const relativeUrl = '/api/users';
      const data = { name: 'John Doe' };
      const response = { data: { id: 1, name: 'John Doe' } };
      const axiosInstance = {
        post: jest.fn().mockResolvedValue(response),
      };
      jest.spyOn(HttpConnect, 'getInstance').mockResolvedValue(axiosInstance as any);

      const result = await HttpConnect.post(relativeUrl, data);

      expect(HttpConnect.getInstance).toHaveBeenCalled();
      expect(axiosInstance.post).toHaveBeenCalledWith(relativeUrl, data, {});
      expect(result).toEqual(response);
    });
  });
});