import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getPixabayPhotos } from './js/pixabay-api';
import createGalleryCard from './js/render-functions';

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

function loader() {
  gallery.innerHTML = '<div class="loader"></div>';
}

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
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

  getPixabayPhotos(userQuery)
    .then(data => {
      if (data.total === 0) {
        gallery.innerHTML = '';
        iziToast.warning({
          title: 'Warning',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }
      gallery.innerHTML = createGalleryCard(data.hits);
      iziToast.success({
        title: 'OK',
        message: `Hooray! We found ${
          data.totalHits
        } photos of ${userQuery.trim()}.`,
      });
      lightbox.refresh();
    })
    .catch(err =>
      iziToast.error({
        title: 'Error',
        message: err.message,
      })
    )
    .finally(() => {
      form.reset();
    });
}
