import { generatePages } from './helpers';

describe('generatePages', () => {
  it.each([
    ['1 page', 1, 1, [1]],
    ['3 page', 3, 1, [1, 2, 3]],
    ['7 page first selected', 7, 1, [1, 2, 3, 4, 5, 6, 7]],
    ['7 page last selected', 7, 7, [1, 2, 3, 4, 5, 6, 7]],
    ['start pages', 50, 1, [1, 2, 3, 4, 5, null, 50]],
    ['end pages', 50, 50, [1, null, 46, 47, 48, 49, 50]],
    ['center pages', 50, 30, [1, null, 29, 30, 31, null, 50]],
  ])('should work for %s', (_title, pageCount, selectedPage, expected) => {
    expect(generatePages(pageCount, selectedPage)).toEqual(expected);
  });
});
