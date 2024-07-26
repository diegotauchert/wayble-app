import { slugify } from '@/helpers/functions';

describe('slugify', () => {
  it('should convert a title to a slug', () => {
    const title = 'Hello World!';
    const expectedSlug = 'hello-world';

    const result = slugify(title);

    expect(result).toEqual(expectedSlug);
  });

  it('should handle special characters', () => {
    const title = 'This is a test with special characters: !@#$%^&*()';
    const expectedSlug = 'this-is-a-test-with-special-characters';

    const result = slugify(title);

    expect(result).toEqual(expectedSlug);
  });

  it('should handle leading and trailing spaces', () => {
    const title = '  Spaces around  ';
    const expectedSlug = 'spaces-around';

    const result = slugify(title);

    expect(result).toEqual(expectedSlug);
  });

  it('should handle multiple consecutive spaces', () => {
    const title = 'Multiple   spaces';
    const expectedSlug = 'multiple-spaces';

    const result = slugify(title);

    expect(result).toEqual(expectedSlug);
  });
});