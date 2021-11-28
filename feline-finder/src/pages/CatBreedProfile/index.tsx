/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import pick from 'lodash/pick';
import { Rating } from 'react-simple-star-rating';
import {
  CatBreed,
  BreedRatings,
  BreedDescription,
  BreedLinks,
} from '../../lib/types';
import '../../styles/Pages/CatBreedProfile/index.scss';
import ImageLoader from '../../components/ImageLoader';

// Profile of each individual cat breed
const CatBreedProfile = () => {
  const loc = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const breed = loc.state as CatBreed;
  return (
    <>
      <div className="breed-profile">
        <Link to="/">
          <button className="back-btn">Back</button>
        </Link>
        <div className="profile-main-card">
          <div className="profile-main-avatar">
            <ImageLoader url={breed.image?.url || undefined} id={breed.id} />
            <div className="profile-main-avatar-name">{breed.name}</div>
          </div>
          <div className="profile-main-description">
            {Object.entries(pick(breed, Object.keys(BreedDescription))).map(
              ([key, value], index) => (
                <div key={index}>
                  <label>
                    {[key].reduce((o: any, i) => o[i], BreedDescription)}:{' '}
                  </label>
                  <span>{value}</span>
                </div>
              ),
            )}
            <div>
              <label>Weight: </label>
              <span>{`Imperial: ${breed.weight.imperial}  / Metric: ${breed.weight.metric}`}</span>
            </div>
          </div>
        </div>
        <div className="profile-ratings-card">
          <div className="profile-ratings-title">Ratings</div>
          <div className="profile-ratings-container">
            {Object.entries(pick(breed, Object.keys(BreedRatings))).map(
              ([key, value], index) => (
                <div key={index} className="profile-ratings-items">
                  <div>{[key].reduce((o: any, i) => o[i], BreedRatings)} </div>
                  <Rating
                    onClick={(__rating: number) => undefined}
                    ratingValue={Number(value)}
                    size={15}
                    transition={false}
                  />
                </div>
              ),
            )}
          </div>
        </div>
        <div className="profile-ratings-card">
          <div className="profile-ratings-title">Links</div>
          <div className="profile-ratings-container">
            {Object.entries(pick(breed, Object.keys(BreedLinks))).map(
              ([key, value], index) => (
                <div key={index} className="profile-ratings-items">
                  {value && (
                    <a href={value as string}>
                      <div>
                        {[key].reduce((o: any, i) => o[i], BreedLinks)}{' '}
                      </div>
                    </a>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CatBreedProfile;
