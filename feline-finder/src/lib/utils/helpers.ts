import { CatBreed } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prepareList = (list: any): CatBreed[] => {
  const getAverage = (text: string | undefined) => {
    if (text == null) return 0;
    return (
      text
        .split(' - ')
        .map(Number)
        .reduce((sum, a) => sum + a, 0) / 2
    );
  };

  const formattedList = list.map((breed: CatBreed) => ({
    ...breed,
    // Weight & Lifepsna provided by API is in this format :  'X - Y'
    // Below is some formatting required for sorting by weight and lifespan
    weight_metric: getAverage(breed?.weight?.metric),
    lifeSpan_metric: getAverage(breed?.life_span),
  }));
  return formattedList;
};
