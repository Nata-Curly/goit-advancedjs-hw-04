import axios from 'axios';

const API_KEY = '35898178-628df3d5ceb1661a68afdf1ae';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getPixabayPhotos({ query, page, perPage }) {
  const res = await axios.get('', {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return res.data;
}

export { getPixabayPhotos };
