import React from 'react';
import { Link } from 'react-router-dom';
import { CatBreed } from '../../lib/types';
import ImageLoader from '../../components/ImageLoader';
import CatLoader from '../../components/Loading';

// Contains the table holding the cat breed list
const Table = (props: { loading: boolean; catBreedList: CatBreed[] }) => {
  const { loading, catBreedList } = props;
  if (loading) return <CatLoader />;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col" style={{ width: '10%' }}>
            Name
          </th>
          <th scope="col" style={{ width: '20%' }}>
            Image
          </th>
          <th className="hide-on-mobile" scope="col" style={{ width: '15%' }}>
            Weight
          </th>
          <th className="hide-on-mobile" scope="col" style={{ width: '15%' }}>
            Lifespan
          </th>
          <th className="hide-on-mobile" scope="col" style={{ width: '25%' }}>
            Temperament
          </th>
          <th scope="col" style={{ width: '10%' }}></th>
        </tr>
      </thead>
      <tbody>
        {catBreedList.map((catBreed, index) => (
          <tr key={index}>
            <td style={{ fontWeight: 'bold' }}>{catBreed.name}</td>
            <td>
              <ImageLoader
                url={catBreed.image?.url || undefined}
                id={catBreed.id}
              />
              <div className="show-on-mobile">
                <span>Weight</span> : {`${catBreed.weight.metric}`} kg
              </div>
              <div className="show-on-mobile">
                <span>Lifespan</span>: {catBreed.life_span} yrs
              </div>
            </td>
            <td className="hide-on-mobile">{`${catBreed.weight.metric}`} kg</td>
            <td className="hide-on-mobile">{catBreed.life_span} yrs</td>
            <td className="hide-on-mobile">{catBreed.temperament}</td>
            <td>
              <Link
                to={{
                  pathname: `/breeds/${encodeURIComponent(catBreed.id)}`,
                  state: { ...catBreed },
                }}
              >
                More...
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
