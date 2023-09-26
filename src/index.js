import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');
const infoCat = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
// const errorMessage = document.querySelector('.error');
const errorMessage = 'Oops! Something went wrong! Try reloading the page!';

Notiflix.Notify.init({
  position: 'left-top',
});

fetchBreeds()
  .then(response => {
    createBreedsList(response.data);
    select.classList.remove('hide');

    new SlimSelect({
      select: select,
    });
  })

  .catch(function (error) {
    // errorMessage.classList.remove('hide');

    Notiflix.Notify.failure(errorMessage);

    console.log(error);
  })
  .finally(() => {
    loader.classList.add('hide');
  });

// эта функция содаёт тег оптион с текстом name и value = id
// const createOption = (name, id) => {
//   const option = document.createElement('option');
//   option.innerText = name;
//   option.value = id;
//   return option;
// };

const createBreedsList = data => {
  data.forEach(breed => {
    // const option = createOption(breed.name, breed.id); // return option
    // createOption(name, id);

    // -------
    const option = document.createElement('option');
    option.innerText = breed.name;
    option.value = breed.id;
    //--------

    select.append(option);
  });

  select.addEventListener('change', event => {
    getCatInfo(event.target.value);
  });
};

const getCatInfo = breedId => {
  //   errorMessage.classList.add('hide');
  loader.classList.remove('hide');
  infoCat.classList.add('hide');

  fetchCatByBreed(breedId)
    .then(response => {
      const catData = response.data[0];
      const breedName = catData.breeds[0].name;
      const description = catData.breeds[0].description;
      const temperament = catData.breeds[0].temperament;
      const imageUrl = catData.url;

      // Створення елементів у HTML
      const catNameElement = document.createElement('h2');
      catNameElement.textContent = `Порода: ${breedName}`;
      const catDescriptionElement = document.createElement('p');
      catDescriptionElement.textContent = `Опис: ${description}`;
      const catTemperamentElement = document.createElement('p');
      catTemperamentElement.textContent = `Темперамент: ${temperament}`;
      const catImageElement = document.createElement('img');
      catImageElement.src = imageUrl;
      catImageElement.alt = breedName;

      // Вставка нових елементів
      infoCat.innerHTML = '';
      infoCat.appendChild(catNameElement);
      infoCat.appendChild(catDescriptionElement);
      infoCat.appendChild(catTemperamentElement);
      infoCat.appendChild(catImageElement);

      infoCat.classList.remove('hide');
    })
    .catch(error => {
      //   errorMessage.classList.remove('hide');
      Notiflix.Notify.failure(errorMessage);

      console.error(error);
    })
    .finally(() => {
      loader.classList.add('hide');
    });
};
