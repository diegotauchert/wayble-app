import { AuthService } from '@/services/AuthService';
import { users } from '@/data/users';

describe('AuthService', () => {
  describe('login', () => {
    it('should return null if user is not found', async () => {
      const result = await AuthService.login('nonexistent@example.com', 'password');

      expect(result).toBeNull();
    });

    it('should return user object with access token and refresh token if user is found', async () => {
      const user = users[0];
      const result = await AuthService.login(user.email, user.password);

      expect(result).toEqual({
        ...user,
        accessToken: 'your-access-token',
        refreshToken: 'your-refresh-token',
        accessTokenExpires: expect.any(Number)
      });
    });
  });

  describe('refreshToken', () => {
    it('should return an empty object', async () => {
      const result = await AuthService.refreshToken('your-refresh-token');

      expect(result).toEqual({});
    });
  });
});