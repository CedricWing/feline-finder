import axios, { AxiosInstance } from 'axios';
import memoizee from 'memoizee';
import env from '../environment';
import { CatBreed, CatBreedQuery } from '../lib/types';

// Mini axios interface for resuablility
class CatApi {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: env.BASE_URL,
      headers: {
        'x-api-key': env.BASE_URL,
      },
    });
  }

  get = async (url: string) => {
    try {
      const response = await this.api.get(url);
      console.log(`Response from Cat API : `, response.data);
      return {
        data: response.data,
        total:
          response.headers['pagination-count'] || response.data.length || 0,
      };
    } catch (error) {
      console.log(`Error: Unable to send request to CAT API`, error);
      return { data: [], total: 0 };
    }
  };

  list = async (url: string, params: { page: number; limit: number }) => {
    console.log(`Querying Cat API with : `, params);
    return this.get(`${url}?page=${params.page - 1}&limit=${params.limit}`);
  };

  search = async (url: string, keyword: string) => {
    console.log(`Querying Cat API with : `, keyword);
    return this.get(`${url}?q=${keyword}`);
  };

  getImage = async (url: string, id: string) => {
    console.log(`Querying image with :`, id);
    return this.get(`${url}?breed_ids=${id}`);
  };
}
// Cat API interface - here we will define endpoint and prepare query params
export const useCatApi = () => {
  const handle = new CatApi();

  const listCatBreeds = memoizee(
    (query: CatBreedQuery): Promise<{ data: CatBreed[]; total: number }> =>
      handle.list('/breeds', { page: query.page, limit: query.pageSize }),
  );

  const searchCatBreed = memoizee((query: CatBreedQuery) =>
    handle.search(`/breeds/search`, query.search || ''),
  );

  const getCatBreedImg = memoizee((id: string) =>
    handle.getImage(`/images/search`, id),
  );

  return { listCatBreeds, searchCatBreed, getCatBreedImg };
};
