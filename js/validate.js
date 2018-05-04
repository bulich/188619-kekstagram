'use strict';

(function () {
  var HASTAGS_MAX_QUANTITY = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var DESCRIPTION_MAX_LENGTH = 140;

  var hashTagsInput = document.querySelector('.text__hashtags');
  var descriptionInput = document.querySelector('.text__description');
  var submitButton = document.querySelector('.img-upload__submit');

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
    var isHashTagsValid = true;
    if (hashTagsInput.value.length !== 0) {
      var hashTags = hashTagsInput.value.split(' ');
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
    }
    if (isHashTagsValid) {
      hashTagsInput.setCustomValidity('');
    }
    return isHashTagsValid;
  };

  var validateDescription = function () {
    var isDescriptionValid = true;
    if (descriptionInput.value.length !== 0) {
      var description = descriptionInput.value;
      if (description.length > DESCRIPTION_MAX_LENGTH) {
        isDescriptionValid = false;
        descriptionInput.setCustomValidity('Максимальное количество символов- ' + DESCRIPTION_MAX_LENGTH);
      }
    }
    if (isDescriptionValid) {
      descriptionInput.setCustomValidity('');
    }
    return isDescriptionValid;
  };

  var onFiltersFormSubmit = function () {
    validateHashTags();
    validateDescription();
  };

  submitButton.addEventListener('click', onFiltersFormSubmit);

  hashTagsInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.onFiltersFormEscPress);
  });

  descriptionInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.onFiltersFormEscPress);
  });

  hashTagsInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.onFiltersFormEscPress);
  });

  descriptionInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.onFiltersFormEscPress);
  });
})();
