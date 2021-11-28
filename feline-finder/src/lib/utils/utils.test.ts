import debounce from './debounce';
import { prepareList } from './helpers';

const DEBOUNCED_TIME = 1000;
describe('utils tests : Debounce', () => {
  const callback = jest.fn();
  beforeEach(() => {
    callback.mockReset();
  });

  it('Will debounce once as timeout', () => {
    jest.useFakeTimers();
    try {
      const debounced = debounce(callback, DEBOUNCED_TIME);
      // calling deounce it immediately sould not make any calls on callback fn
      expect(callback).not.toHaveBeenCalled();

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 100; i++) {
        debounced(); // Exceute debounce  100 times
      }
      // Time has not passed 10 seconds - no calls should be made on callback fn
      expect(callback).not.toHaveBeenCalled();

      // Fast forward timer
      jest.advanceTimersByTime(DEBOUNCED_TIME);

      // // callback fn should have been called once
      expect(callback).toBeCalledTimes(1);
    } finally {
      jest.useRealTimers();
    }
  });
});

const SAMPLE_CAT_BREED = {
  adaptability: 5,
  affection_level: 5,
  alt_names: '',
  cfa_url: 'http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx',
  child_friendly: 3,
  country_code: 'EG',
  country_codes: 'EG',
  description:
    'The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.',
  dog_friendly: 4,
  energy_level: 5,
  experimental: 0,
  grooming: 1,
  hairless: 0,
  health_issues: 2,
  hypoallergenic: 0,
  id: 'abys',
  image: {
    id: '0XYvRd7oD',
    width: 1204,
    height: 1445,
    url: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
  },
  indoor: 0,
  intelligence: 5,
  lap: 1,
  life_span: '14 - 15',
  name: 'Abyssinian',
  natural: 1,
  origin: 'Egypt',
  rare: 0,
  reference_image_id: '0XYvRd7oD',
  rex: 0,
  shedding_level: 2,
  short_legs: 0,
  social_needs: 5,
  stranger_friendly: 5,
  suppressed_tail: 0,
  temperament: 'Active, Energetic, Independent, Intelligent, Gentle',
  vcahospitals_url:
    'https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian',
  vetstreet_url: 'http://www.vetstreet.com/cats/abyssinian',
  vocalisation: 1,
  weight: { imperial: '7 - 10', metric: '3 - 5' },
  wikipedia_url: 'https://en.wikipedia.org/wiki/Abyssinian_(cat)',
};

describe('utils tests: Prepare list', () => {
  it('should work on an empty list', () => {
    expect(prepareList([])).toEqual([]);
  });
  it('should correctly add new attributes', () => {
    expect(prepareList([SAMPLE_CAT_BREED])).toEqual([
      { ...SAMPLE_CAT_BREED, weight_metric: 4, lifeSpan_metric: 14.5 },
    ]);
  });
  it('should return 0 for both attributes if undefined', () => {
    expect(
      prepareList([
        {
          ...SAMPLE_CAT_BREED,
          weight: { metric: undefined },
          life_span: undefined,
        },
      ]),
    ).toEqual([
      {
        ...SAMPLE_CAT_BREED,
        weight: { metric: undefined },
        life_span: undefined,
        weight_metric: 0,
        lifeSpan_metric: 0,
      },
    ]);
  });
});
