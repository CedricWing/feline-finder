import range from 'lodash/range';
// This helper takes into account the number of pages and the active page to generate pages
const NUMBER_DISPLAYED_PAGE = 7;
export const generatePages = (
  pageCount: number,
  selectedPage: number,
): Array<number | null> => {
  if (pageCount <= NUMBER_DISPLAYED_PAGE) return range(1, pageCount + 1);
  const center = (NUMBER_DISPLAYED_PAGE + 1) / 2;
  if (selectedPage <= center) return [...range(1, center + 2), null, pageCount];
  if (selectedPage >= pageCount - center)
    return [1, null, ...range(pageCount - center, pageCount + 1)];
  return [
    1,
    null,
    selectedPage - 1,
    selectedPage,
    selectedPage + 1,
    null,
    pageCount,
  ];
};
