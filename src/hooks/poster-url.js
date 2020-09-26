import { useMemo, useContext } from 'react';
import AppContext from '../context/app';

function usePosterBaseUrl() {
  const [state] = useContext(AppContext);

  return useMemo(() => {
    const { images } = state.config;

    if (!images) {
      return undefined;
    }

    const { secure_base_url: secureBaseUrl, poster_sizes: posterSizes } = images;

    // @TODO support responsive images.
    const sizes = posterSizes.filter((size) => size !== 'original');
    const [largest] = sizes.slice(-1);

    return secureBaseUrl + largest;
  }, [
    state.config,
  ]);
}

export default usePosterBaseUrl;
