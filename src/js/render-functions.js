export default function createGalleryCard(cards) {
  return cards
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
    <div class="info">
         <p class="info-item"><b>Likes</b> ${likes}</p>
          <p class="info-item"><b>Views</b> ${views}</p>
          <p class="info-item"><b>Comments</b> ${comments}</p>
          <p class="info-item"><b>Downloads</b> ${downloads}</p>
          </div>
  </a>
</li>`
    )
    .join('');
}
