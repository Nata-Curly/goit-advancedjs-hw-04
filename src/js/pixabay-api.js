const API_KEY = '35898178-628df3d5ceb1661a68afdf1ae';
const BASE_URL = 'https://pixabay.com/api/';


function getPixabayPhotos(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`${BASE_URL}?${params}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

export { getPixabayPhotos };