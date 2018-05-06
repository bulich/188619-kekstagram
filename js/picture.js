'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var photosData;
  var photoTemplate = document.querySelector('#picture').content;
  var errorForm = document.querySelector('.img-upload__message--error');
  var photosFilters = document.querySelector('.img-filters');
  var photosFilterButtons = document.querySelectorAll('.img-filters__button');
  var fragmentContainer = document.querySelector('.pictures');

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var shuffleArray = function (array) {
    return array.slice(0).sort(function () {
      return Math.random() - 0.5;
    });
  };

  var sortByProperty = function (values, property) {
    values = values.slice(0);
    values.sort(function (left, right) {
      return right[property] - left[property];
    });
    return values;
  };

  var sortByPropertyLength = function (values, property) {
    values = values.slice(0);
    values.sort(function (left, right) {
      return right[property].length - left[property].length;
    });
    return values;
  };

  var renderPhotos = function (data) {
    var photoItems = document.querySelectorAll('.picture__link');
    var fragment = document.createDocumentFragment();
    data.forEach(function (element, i) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = data[i].url;
      photoElement.querySelector('.picture__stat--likes').textContent = data[i].likes;
      photoElement.querySelector('.picture__stat--comments').textContent = data[i].comments.length;
      fragment.appendChild(photoElement);
    });
    photoItems.forEach(function (element) {
      fragmentContainer.removeChild(element);
    });
    fragmentContainer.appendChild(fragment);
    window.preview.setPreview(data);
  };

  var errorHandler = function (errorMessage) {
    errorForm.classList.remove('hidden');
    errorForm.textContent = errorMessage;
  };

  var successHandler = function (data) {
    photosData = data;
    renderPhotos(data);
    window.preview.setPreview(data);
    photosFilters.classList.remove('img-filters--inactive');
  };


  var onPictureFilterButtonClick = function (evt) {
    evt.preventDefault();
    var clickedButton = evt.currentTarget;
    photosFilterButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
    clickedButton.classList.add('img-filters__button--active');
    var pictureFilterId = clickedButton.id;
    switch (pictureFilterId) {
      case 'filter-popular':
        var sortedByLikes = sortByProperty(photosData, 'likes');
        debounce(renderPhotos(sortedByLikes));
        break;
      case 'filter-discussed':
        var sortedByComments = sortByPropertyLength(photosData, 'comments');
        debounce(renderPhotos(sortedByComments));
        break;
      case 'filter-random':
        var sortedByRandom = shuffleArray(photosData);
        debounce(renderPhotos(sortedByRandom));
        break;
      case 'filter-recommended':
        debounce(renderPhotos(photosData));
        break;
      default:
        debounce(renderPhotos(photosData));
    }
  };

  photosFilterButtons.forEach(function (button) {
    button.addEventListener('click', onPictureFilterButtonClick);
  });

  window.backend.load(successHandler, errorHandler);
})();
