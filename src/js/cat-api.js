import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_zRnLK51mjNJf092M1xDMeuTE7wUNnDV8qhppEEmDHn7ZRC0lMuT43lefZWr93P6n';
// отримуємо всі породи котів
export const fetchBreeds = () =>
  axios.get('https://api.thecatapi.com/v1/breeds');

//
export const fetchCatByBreed = breedId =>
  axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
