'use strict';

var ESC_KEYCODE = 27;
var PHOTOS_QUANTITY = 25;
var PHOTOS_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PHOTOS_DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];
var PHOTOS_PATH = 'photos/';
var PHOTOS_EXTENSION = '.jpg';
var AVATARS_PATH = 'img/avatar-';
var AVATARS_EXTENSION = '.svg';

var getRandomNumber = function (min, max) {
  var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(randomNumber);
};

var shuffleArray = function (array) {
  return array.sort(function () {
    return Math.random() - 0.5;
  });
};

var makeElement = function (tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

var createPhotosUrl = function () {
  var photosUrl = [];
  for (var i = 1; i <= PHOTOS_QUANTITY; i++) {
    photosUrl[i] = PHOTOS_PATH + i + PHOTOS_EXTENSION;
  }
  return shuffleArray(photosUrl);
};

var generatePhotosData = function (urls, comments, descriptions) {
  var photosData = [];
  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    var shuffledComments = shuffleArray(comments);
    var shufledDescriptions = shuffleArray(descriptions);
    var firstRandomComment = shuffledComments[0];
    var secondRandomComment = shuffledComments[1];
    photosData[i] = {
      url: urls[i],
      likes: getRandomNumber(15, 200),
      comments: (Math.random() > 0.5) ? [firstRandomComment, secondRandomComment] : [firstRandomComment],
      description: shufledDescriptions[getRandomNumber(0, descriptions.length - 1)]
    };
  }
  return photosData;
};

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
    avatarElement.src = AVATARS_PATH + getRandomNumber(1, 6) + AVATARS_EXTENSION;
    commentElement.textContent = bigPhotoData.comments[i];
    commentsList.appendChild(commentElement);
  }
  var commentsContainer = bigPhotoElement.querySelector('.big-picture__social');
  var oldComments = bigPhotoElement.querySelector('.social__comments');
  commentsContainer.replaceChild(commentsList, oldComments);
};

var photosData = generatePhotosData(createPhotosUrl(), PHOTOS_COMMENTS, PHOTOS_DESCRIPTION);
var photosFragment = createPhotoFragment(photosData);
var photosContainer = '.pictures';
renderFragment(photosFragment, photosContainer);

var photos = [].slice.call(document.querySelectorAll('.picture__link'));
photos.forEach(function (element, i) {
  element.setAttribute('data-id', i);
  element.addEventListener('click', function (evt) {
    evt.preventDefault();
    renderBigPhoto(photosData, evt);
    document.addEventListener('keydown', onBigPhotoEscPress);
  });
});

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
