import React, { useMemo, useState } from 'react';
import { CatBreedQuery, CatBreedSortAttribute } from '../../lib/types';
import debounce from '../../lib/utils/debounce';
import RadioDropDown from '../../components/RadioDropDown';
import '../../styles/Pages/CatBreedList/searchfilter.scss';

// Filter elements and functionality
export const DEFAULT_QUERY: CatBreedQuery = {
  page: 1,
  pageSize: 20,
};
const SORT = [
  { label: 'Name', value: CatBreedSortAttribute.name },
  { label: 'Lifespan', value: CatBreedSortAttribute.lifespan },
  { label: 'Weight', value: CatBreedSortAttribute.weight },
];

const SearchFilter = (props: {
  updateQuery: React.Dispatch<Partial<CatBreedQuery>>;
  query: Partial<CatBreedQuery>;
}) => {
  const [search, setSearch] = useState('');
  const debounceSearch = useMemo(
    // we have to instanciate the debounce only once for it to work
    () =>
      debounce((keyword) => {
        props.updateQuery({
          search: keyword || undefined,
          ...DEFAULT_QUERY,
        });
      }, 1000),
    [],
  );
  return (
    <div className="search-filter">
      <input
        className="search-filter-input"
        placeholder="Search by breed"
        onChange={(event) => {
          const keyword = event?.target.value;
          if (keyword.length >= 3) debounceSearch(event?.target.value);
          else debounceSearch(undefined);
          setSearch(keyword);
        }}
        value={search}
      ></input>
      <RadioDropDown
        options={SORT}
        value={props.query.sortBy}
        onChange={(key) => props.updateQuery({ sortBy: key })}
      >
        Sort
      </RadioDropDown>
    </div>
  );
};
export default SearchFilter;
