import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/style.css';

import PhotosApi from './scripts/api';

import { form, input, gallery, loadMoreBtn } from './scripts/refs';
import { renderMarkup } from './scripts/markup';

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener(`click`, fetchMorePhotos);

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onSearch(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('visually-hidden');

  PhotosApi.query = input.value.trim();
  if (!PhotosApi.query) {
    Notiflix.Notify.warning('Fill this input, please!');
    return;
  }
  PhotosApi.resetPage();
  getImg();
  form.reset();
  loadMoreBtn.classList.remove('visually-hidden');
}
async function getImg() {
  const data = await PhotosApi.fetchPhotos();

  if (!data.hits.length) {
    loadMoreBtn.classList.add('visually-hidden');
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
  Notiflix.Notify.success('Here is your photos');

  renderMarkup(data.hits);
  lightbox.refresh();
}

function fetchMorePhotos() {
  getImg();
}
