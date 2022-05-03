import { gallery } from './refs';

function renderMarkup(images) {
  const markup = images
    .map(img => {
      const { id, webformatURL, largeImageURL, tags, likes, views, comments, downloads } = img;
      return `
          <div class="photo-card" id="${id}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
      `;
    })
    .join('');
  updateMarkup(markup);
}

function updateMarkup(markup = '') {
  gallery.insertAdjacentHTML('beforeend', markup);
}
export { renderMarkup, updateMarkup };
