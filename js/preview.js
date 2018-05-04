'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var AVATARS_PATH = 'img/avatar-';
  var AVATARS_EXTENSION = '.svg';

  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    return element;
  };

  var photos = [].slice.call(document.querySelectorAll('.picture__link'));
  photos.forEach(function (element, i) {
    element.setAttribute('data-id', i);
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      renderBigPhoto(window.data.photosData, evt);
      document.addEventListener('keydown', onBigPhotoEscPress);
    });
  });

  var renderBigPhoto = function (photosData, evt) {
    var bigPhotoElement = document.querySelector('.big-picture');
    bigPhotoElement.classList.remove('hidden');
    var indexOfPhoto = evt.currentTarget.getAttribute('data-id');
    var bigPhotoData = photosData[indexOfPhoto];

    bigPhotoElement.querySelector('.big-picture__img img').src = bigPhotoData.url;
    bigPhotoElement.querySelector('.likes-count').textContent = bigPhotoData.likes;
    bigPhotoElement.querySelector('.social__caption').textContent = bigPhotoData.description;
    bigPhotoElement.querySelector('.comments-count').textContent = bigPhotoData.comments.length;

    var commentsList = makeElement('ul', 'social__comments');
    for (var i = 0; i < bigPhotoData.comments.length; i++) {
      var commentElement = makeElement('li', 'social__comment');
      var avatarElement = makeElement('img', 'social__picture');
      commentElement.appendChild(avatarElement);
      avatarElement.src = AVATARS_PATH + window.data.getRandomNumber(1, 6) + AVATARS_EXTENSION;
      commentElement.textContent = bigPhotoData.comments[i];
      commentsList.appendChild(commentElement);
    }
    var commentsContainer = bigPhotoElement.querySelector('.big-picture__social');
    var oldComments = bigPhotoElement.querySelector('.social__comments');
    commentsContainer.replaceChild(commentsList, oldComments);
  };

  var closeBigPhoto = function () {
    bigPhotoElement.classList.add('hidden');
    document.removeEventListener('keydown', onBigPhotoEscPress);
  };

  var bigPhotoElement = document.querySelector('.big-picture');
  var photoClose = bigPhotoElement.querySelector('.big-picture__cancel');
  photoClose.addEventListener('click', closeBigPhoto);

  var onBigPhotoEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeBigPhoto();
    }
  };
  window.preview = {
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
