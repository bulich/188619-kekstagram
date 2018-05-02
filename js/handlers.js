'use strict';

var ESC_KEYCODE = 27;
var HASTAGS_MAX_QUANTITY = 5;
var HASHTAG_MAX_LENGTH = 20;

var filtersForm = document.querySelector('.img-upload__overlay');
var filtersFormInput = document.querySelector('#upload-file');
var filtersFormOClose = document.querySelector('#upload-cancel');

var onFiltersFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeFiltersForm();
  }
};

var openFiltersForm = function () {
  filtersForm.classList.remove('hidden');
  document.addEventListener('keydown', onFiltersFormEscPress);
};

var closeFiltersForm = function () {
  filtersForm.classList.add('hidden');
  filtersFormInput.value = '';
  document.removeEventListener('keydown', onFiltersFormEscPress);
};

filtersFormInput.addEventListener('change', function () {
  openFiltersForm();
});

filtersFormOClose.addEventListener('click', function () {
  closeFiltersForm();
});

var hashTagsInput = filtersForm.querySelector('.text__hashtags');

var checkForDuplicates = function (array) {
  var isDuplicates = false;
  var arrayObj = {};
  for (var i = 0; i < array.length; i++) {
    var str = array[i].toLowerCase();
    if (!arrayObj[str]) {
      arrayObj[str] = true;
      isDuplicates = false;
    } else {
      isDuplicates = true;
    }
  }
  return isDuplicates;
};

var onHashTagInput = function (evt) {
  var inputTarget = evt.target;
  var hashTags = inputTarget.value.split(' ');
  var hasDuplicates = checkForDuplicates(hashTags);
  if (hashTags.length > HASTAGS_MAX_QUANTITY) {
    inputTarget.setCustomValidity('Максимальное количество хэштегов - ' + HASTAGS_MAX_QUANTITY);
  } if (hasDuplicates) {
    inputTarget.setCustomValidity('Удалите повторяющиеся хэштеги ' + checkForDuplicates(hashTags));
  }
  hashTags.forEach(function (hashTag) {
    if (hashTag.length > HASHTAG_MAX_LENGTH) {
      inputTarget.setCustomValidity('Максимальная длина одного хэштега - ' + HASHTAG_MAX_LENGTH + ' символов');
    } else if (/^(#[A-Za-z0-9А-Яа-я]+)$/g.test(hashTag)) {
      inputTarget.setCustomValidity('Хэштеги должны начинаться с символа #, отделяться друг от друга пробелом и соддержать только цифры и буквы');
    }
  });
};

hashTagsInput.addEventListener('change', onHashTagInput);
