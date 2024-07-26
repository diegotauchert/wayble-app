import { nextAuthOptions } from '@/lib/authOptions';

describe('nextAuthOptions', () => {
  it('should have a session strategy defined', () => {
    expect(nextAuthOptions.session?.strategy).toBeDefined();
  });

  it('should have at least one provider defined', () => {
    expect(nextAuthOptions.providers.length).toBeGreaterThan(0);
  });

  it('should have callbacks defined', () => {
    expect(nextAuthOptions.callbacks).toBeDefined();
  });

  it('should have pages defined', () => {
    expect(nextAuthOptions.pages).toBeDefined();
  });
});