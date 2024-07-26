import { cn, debouncePromise } from '@/lib/utils';

describe('cn', () => {
  it('should merge class names', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toEqual('class1 class2 class3');
  });

  it('should handle empty input', () => {
    const result = cn();
    expect(result).toEqual('');
  });
});
