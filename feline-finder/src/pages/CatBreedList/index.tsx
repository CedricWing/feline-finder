import React, { useState, useReducer, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useCatApi } from '../../services/api';
import { CatBreed, CatBreedQuery } from '../../lib/types';
import { prepareList } from '../../lib/utils/helpers';
import { useLoading } from '../../lib/hooks/useLoading';
import Table from './table';
import Pagination from '../../components/Pagination';
import SearchFilter, { DEFAULT_QUERY } from './searchfilter';
import '../../styles/Pages/CatBreedList/index.scss';

// Main page / container for the cat breed list
const CatBreedList = () => {
  const api = useCatApi();
  const [catBreedList, setCatBreedList] = useState<Array<CatBreed>>([]);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, updateQuery] = useReducer(
    (oldQuery: CatBreedQuery, newQuery: Partial<CatBreedQuery>) => ({
      ...oldQuery,
      page: 1,
      ...newQuery,
    }),
    DEFAULT_QUERY,
  );

  const [loading, getCatBreedList] = useLoading(async () => {
    const res = query.search
      ? await api.searchCatBreed(query)
      : await api.listCatBreeds(query);
    const formattedList = prepareList(res.data);
    const sortedBreed = query.sortBy
      ? sortBy(formattedList || [], [query.sortBy])
      : formattedList;
    setCatBreedList(sortedBreed);
    setCount(res.total);
    setTotalPages(Math.ceil(res.total / DEFAULT_QUERY.pageSize));
  }, true);
  useEffect(() => {
    getCatBreedList();
  }, [query]);

  return (
    <div>
      <SearchFilter updateQuery={updateQuery} query={query} />
      <div className="cat-breed-list-title">
        Cat Breeds<span>Total : {count}</span>
      </div>
      <Table loading={loading} catBreedList={catBreedList} />
      <Pagination
        total={totalPages}
        current={query.page}
        onClick={(nextPage) => updateQuery({ page: nextPage })}
      />
    </div>
  );
};
export default CatBreedList;
