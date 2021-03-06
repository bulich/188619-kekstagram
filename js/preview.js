'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var AVATARS_PATH = 'img/avatar-';
  var AVATARS_EXTENSION = '.svg';

  var bigPhotoElement = document.querySelector('.big-picture');

  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    return element;
  };

  var getRandomNumber = function (min, max) {
    var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(randomNumber);
  };


  var setBigPhoto = function (data) {
    var photos = [].slice.call(document.querySelectorAll('.picture__link'));
    photos.forEach(function (element, index) {
      element.setAttribute('data-id', index);
      element.addEventListener('click', function (evt) {
        evt.preventDefault();
        renderBigPhoto(data, evt);
        document.addEventListener('keydown', onBigPhotoEscPress);
      });
    });
  };

  var renderBigPhoto = function (photosData, evt) {
    bigPhotoElement.classList.remove('hidden');
    var indexOfPhoto = evt.currentTarget.getAttribute('data-id');

    var bigPhotoData = photosData[indexOfPhoto];

    bigPhotoElement.querySelector('.big-picture__img img').src = bigPhotoData.url;
    bigPhotoElement.querySelector('.likes-count').textContent = bigPhotoData.likes;
    bigPhotoElement.querySelector('.social__caption').textContent = bigPhotoData.comments[0];
    bigPhotoElement.querySelector('.comments-count').textContent = bigPhotoData.comments.length;

    var commentsList = makeElement('ul', 'social__comments');
    bigPhotoData.comments.forEach(function (element, index) {
      var commentElement = makeElement('li', 'social__comment');
      var avatarElement = makeElement('img', 'social__picture');
      commentElement.appendChild(avatarElement);
      commentElement.appendChild(makeElement('span', 'social__text'));
      avatarElement.src = AVATARS_PATH + getRandomNumber(1, 6) + AVATARS_EXTENSION;
      commentElement.querySelector('span').textContent = bigPhotoData.comments[index];
      commentsList.appendChild(commentElement);
    });
    var commentsContainer = bigPhotoElement.querySelector('.big-picture__social');
    var oldComments = bigPhotoElement.querySelector('.social__comments');
    commentsContainer.replaceChild(commentsList, oldComments);
  };

  var closeBigPhoto = function () {
    bigPhotoElement.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  var photoClose = bigPhotoElement.querySelector('.big-picture__cancel');
  photoClose.addEventListener('click', function () {
    closeBigPhoto();
  });

  var onBigPhotoEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPhoto();
    }
  };

  window.preview = {
    makeElement: makeElement,
    setBigPhoto: setBigPhoto,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
