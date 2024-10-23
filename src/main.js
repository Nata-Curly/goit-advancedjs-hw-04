import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPixabayPhotos } from './js/pixabay-api';
import createGalleryCard from './js/render-functions';
import BtnService from './js/services/BtnService';

const lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  enableKeyboard: true,
  animationSlide: true,
  overlay: true,
});

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const loadMoreBtnService = new BtnService(loadMoreBtn);

const params = {
  page: 1,
  per_page: 20,
  maxPage: 1,
  query: '',
};

console.log(params);

function loader() {
  gallery.innerHTML = '<div class="loader"></div>';
}

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  loadMoreBtnService.hide();
  params.page = 1;

  const form = event.currentTarget;
  const userQuery = form.elements.query.value.trim();

  loader();

  if (userQuery === '') {
    form.reset();
    iziToast.warning({
      title: 'Warning',
      message: 'You should enter something to start the search!',
    });

    return;
  }

  params.query = userQuery;

  try {
    const data = await getPixabayPhotos(params);
    console.log(data);
    if (data.total === 0) {
      gallery.innerHTML = '';
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    params.maxPage = Math.ceil(data.totalHits / params.per_page);
    console.log(params);

    gallery.innerHTML = createGalleryCard(data.hits);
    iziToast.success({
      title: 'OK',
      message: `Hooray! We found ${
        data.totalHits
      } photos of ${userQuery.trim()}.`,
    });
    lightbox.refresh();

    if (params.maxPage > params.page) {
      loadMoreBtnService.show();

      loadMoreBtn.addEventListener('click', handleLoadMore);
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: err.message,
    });
  } finally {
    form.reset();
  }
}

async function handleLoadMore() {
  loadMoreBtnService.setLoading();
  params.page += 1;

  try {
    const data = await getPixabayPhotos(params);
    const photosMarkup = createGalleryCard(data.hits);

    gallery.insertAdjacentHTML('beforeend', photosMarkup);

    lightbox.refresh();

    window.scrollBy({
      top: 560,
      behavior: 'smooth',
    });

    loadMoreBtnService.setNorman();

    if (params.maxPage === params.page) {
      loadMoreBtnService.hide();
      loadMoreBtn.removeEventListener('click', handleLoadMore);
      iziToast.info({
        title: 'Info!',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: err.message,
    });
  }
}
