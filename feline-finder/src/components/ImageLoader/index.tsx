import React, { useState, useEffect } from 'react';
import { useLoading } from '../../lib/hooks/useLoading';
import { useCatApi } from '../../services/api';
import CatLoader from '../Loading';
import '../../styles/Components/imageLoader.scss';

// Component to request / hold images
const ImageLoader = (props: { url: string | undefined; id: string }) => {
  // If url is passed to props, download image, otherwise request for new image
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const api = useCatApi();

  const [loading, getImageUrl] = useLoading(async () => {
    if (props.url) setImageUrl(props.url);
    else {
      const res = await api.getCatBreedImg(props.id);
      setImageUrl(res.data[0].url);
    }
  }, true);
  useEffect(() => {
    getImageUrl();
  }, [props.url]);

  if (loading || imageUrl == null) return <CatLoader />;
  return <img className="image-col" src={imageUrl} alt={props.id}></img>;
};
export default ImageLoader;
