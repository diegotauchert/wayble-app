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

      expect(result).toEqual(user);
    });
  });
});