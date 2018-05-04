'use strict';

(function () {
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

  var getRandomNumber = function (min, max) {
    var randomNumber = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(randomNumber);
  };

  var shuffleArray = function (array) {
    return array.sort(function () {
      return Math.random() - 0.5;
    });
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
  var photosData = generatePhotosData(createPhotosUrl(), PHOTOS_COMMENTS, PHOTOS_DESCRIPTION);

  window.data = {
    photosData: photosData,
    getRandomNumber: getRandomNumber
  };
})();
