'use strict';

var ESC_KEYCODE = 27;
var HASTAGS_MAX_QUANTITY = 5;
var HASHTAG_MAX_LENGTH = 20;
var DESCRIPTION_MAX_LENGTH = 140;

var filtersModal = document.querySelector('.img-upload__overlay');
var filtersForm = document.querySelector('.img-upload__form');
var filtersFormInput = document.querySelector('#upload-file');
var filtersFormClose = document.querySelector('#upload-cancel');
var hashTagsInput = filtersModal.querySelector('.text__hashtags');
var descriptionInput = filtersModal.querySelector('.text__description');

var onFiltersFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeFiltersForm();
  }
};

var openFiltersForm = function () {
  filtersModal.classList.remove('hidden');
  filtersForm.reset();
  document.addEventListener('keydown', onFiltersFormEscPress);
};

var closeFiltersForm = function () {
  filtersModal.classList.add('hidden');
  filtersFormInput.value = '';
  document.removeEventListener('keydown', onFiltersFormEscPress);
};

var hasDuplicates = function (values) {
  values = values.slice(0).sort();
  return values.some(function (value, index) {
    if (index) {
      return values[index] === values[index - 1];
    }
    return false;
  });
};

var validateHashTags = function () {
  var hashTags = hashTagsInput.value.split(' ');
  var isHashTagsValid = true;
  if (hashTags.length > HASTAGS_MAX_QUANTITY) {
    isHashTagsValid = false;
    hashTagsInput.setCustomValidity('Максимальное количество хэштегов - ' + HASTAGS_MAX_QUANTITY);
  } else if (hasDuplicates(hashTags)) {
    isHashTagsValid = false;
    hashTagsInput.setCustomValidity('Удалите повторяющиеся хэштеги');
  }

  hashTags.forEach(function (hashTag) {
    if ((!(/^(#[A-Za-z0-9А-Яа-я]+)$/g.test(hashTag))) || (hashTag.length > HASHTAG_MAX_LENGTH)) {
      isHashTagsValid = false;
      hashTagsInput.setCustomValidity('Хэштеги должны начинаться с символа #, отделяться друг от друга пробелом и соддержать только цифры и буквы. ' +
      'Максимальная длина одного хэштега - ' + HASHTAG_MAX_LENGTH + ' символов');
    }
  });
  return isHashTagsValid;
};

var validateDescription = function () {
  var description = descriptionInput.value;
  var isDescriptionValid = true;
  if (description.length > DESCRIPTION_MAX_LENGTH) {
    isDescriptionValid = false;
    descriptionInput.setCustomValidity('Максимальное количество символов- ' + DESCRIPTION_MAX_LENGTH);
  }
  return isDescriptionValid;
};

var onFiltersFormSubmit = function () {
  validateHashTags();
  validateDescription();
};

filtersFormInput.addEventListener('change', function () {
  openFiltersForm();
});

filtersFormClose.addEventListener('click', function () {
  closeFiltersForm();
});

hashTagsInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onFiltersFormEscPress);
});

descriptionInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onFiltersFormEscPress);
});

hashTagsInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onFiltersFormEscPress);
});

descriptionInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onFiltersFormEscPress);
});

document.querySelector('.img-upload__submit').addEventListener('click', onFiltersFormSubmit);
