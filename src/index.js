import './css/style.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// import { fetchPhotos, perPage, page } from './scripts/api';

import { form, input, gallery, loadMoreBtn } from './scripts/refs';
import { renderMarkup, updateMarkup } from './scripts/markup';

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener(`click`, fetchMorePhotos);

const perPage = 40;
let page = 1;

const params = `image_type=photo&orientation=horizontal&safesearch=true`;
const key = `/?key=27157538-112feafcfc70e7bc29b814ecd`;

axios.defaults.baseURL = `https://pixabay.com/api`;

// GET -> /photos

async function fetchPhotos(query, page) {
  try {
    page = 1;
    return await axios.get(`${key}
      &q=${query}&${params}&per_page=${perPage}&page=${page}`);
  } catch (error) {
    console.error(error);
  }
}

function onSearch(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('visually-hidden');
  let searchQuery = input.value.trim();

  if (!searchQuery) {
    Notiflix.Notify.warning('Fill this input, please!');
    return;
  }
  fetchPhotos(searchQuery).then(({ data }) => {
    //
    if (data.totalHits > perPage) {
      page += 1;
      loadMoreBtn.classList.remove('visually-hidden');
    }
    //
    if (data.totalHits) {
      init(data.hits);
      Notiflix.Notify.success('Here is your photos');
    } else {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }
  });
}

// let gallery = new SimpleLightbox('.gallery a');
// gallery.on('show.simplelightbox', function () {
//   // Do something…
// });

function init(arr) {
  renderMarkup(arr);
}

function fetchMorePhotos(e) {
  const query = input.value.trim();
  fetchPhotos(query, page)
    .then(({ data }) => {
      const numberOfPage = Math.ceil(data.totalHits / perPage);
      console.log(page);
      if (numberOfPage > page) {
        page += 1;
      }
      init(data.hits);
    })
    .catch(console.log);
}
