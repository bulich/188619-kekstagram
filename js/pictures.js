'use strict';

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

var getRandomNumber = function (min, max) {
  var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(randomNumber);
};

var shuffleArray = function (array) {
  function compareRandom() {
    return Math.random() - 0.5;
  }
  return array.sort(compareRandom);
};

var createPhotosUrl = function () {
  var photosUrl = [];
  for (var i = 1; i <= PHOTOS_QUANTITY; i++) {
    photosUrl[i] = 'photos/' + i + '.jpg';
  }
  return shuffleArray(photosUrl);
};

var generatePhotosData = function (urls, comments, descriptions) {
  var photosData = [];
  for (var i = 0; i < PHOTOS_QUANTITY; i++) {
    var shuffledComments = shuffleArray(comments);
    var shufledDescriptions = shuffleArray(descriptions);
    photosData[i] = {
      url: urls[i],
      likes: getRandomNumber(15, 200),
      comments: (Math.random() > 0.5) ? [shuffledComments[0], shuffledComments[1]] : [shuffledComments[0]],
      description: shufledDescriptions[0]
    };
  }
  return photosData;
};

var createPhotoFragment = function (photosData) {
  var photoTemplate = document.querySelector('#picture').content;
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photosData.length; i++) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photosData[i].url;
    photoElement.querySelector('.picture__stat--likes').textContent = photosData[i].likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photosData[i].comments.length;
    fragment.appendChild(photoElement);
  }
  return fragment;
};

var renderFragment = function (fragment, containerSelector) {
  var fragmentContainer = document.querySelector(containerSelector);
  fragmentContainer.appendChild(fragment);
};

var renderBigPhoto = function (photosData, indexOfPhoto) {
  var bigPhotoElement = document.querySelector('.big-picture');
  bigPhotoElement.classList.remove('hidden');
  var bigPhotoData = photosData[indexOfPhoto];

  bigPhotoElement.querySelector('.big-picture__img img').src = bigPhotoData.url;
  bigPhotoElement.querySelector('.likes-count').textContent = bigPhotoData.likes;
  bigPhotoElement.querySelector('.comments-count').textContent = bigPhotoData.comments.length;

  var commentTemplate = document.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < bigPhotoData.comments.length; i++) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('img.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    commentElement.textContent = bigPhotoData.comments[i]; // textContent стирает аватакри :(
    fragment.appendChild(commentElement);
  }
  renderFragment(fragment, '.social__comments');
};

var hideControls = function () {
  var hideClass = 'visually-hidden';
  document.querySelector('.social__comment-count').classList.add(hideClass);
  document.querySelector('.social__comment-loadmore').classList.add(hideClass);
};

var photosData = generatePhotosData(createPhotosUrl(), PHOTOS_COMMENTS, PHOTOS_DESCRIPTION);
var photosFragment = createPhotoFragment(photosData);
var photosContainer = '.pictures';


renderFragment(photosFragment, photosContainer);


var photos = [].slice.call(document.querySelectorAll('.picture__link'));

photos.forEach(function (element, i) {
  element.addEventListener('click', function (evt) {
    evt.preventDefault();
    renderBigPhoto(photosData, i);
  });
});

var photoClose = document.querySelector('.big-picture__cancel');

photoClose.addEventListener('click', function () {
  var bigPhotoElement = document.querySelector('.big-picture');
  bigPhotoElement.classList.add('hidden');
});
