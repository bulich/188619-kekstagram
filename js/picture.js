'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture').content;
  var createPhotoFragment = function (photosData) {
    var fragment = document.createDocumentFragment();
    photosData.forEach(function (element, i) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = photosData[i].url;
      photoElement.querySelector('.picture__stat--likes').textContent = photosData[i].likes;
      photoElement.querySelector('.picture__stat--comments').textContent = photosData[i].comments.length;
      fragment.appendChild(photoElement);
    });
    return fragment;
  };

  var renderFragment = function (fragment, containerSelector) {
    var fragmentContainer = document.querySelector(containerSelector);
    fragmentContainer.appendChild(fragment);
  };

  var photosFragment = createPhotoFragment(window.data.photosData);
  var photosContainer = '.pictures';
  renderFragment(photosFragment, photosContainer);
})();
