import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export default {
  searchQuery: '',
  params: 'image_type=photo&orientation=horizontal&safesearch=true',
  key: '27157538-112feafcfc70e7bc29b814ecd',
  page: 1,
  perPage: 40,
  async fetchPhotos() {
    try {
      const { data } = await axios.get(
        `/?key=${this.key}&q=${this.query}&${this.params}&per_page=${this.perPage}&page=${this.page}`,
      );
      this.incrementPage();

      return data;
    } catch (error) {
      console.error(error);
    }
  },

  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
