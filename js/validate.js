'use strict';

(function () {
  var HASTAGS_MAX_QUANTITY = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var DESCRIPTION_MAX_LENGTH = 140;

  var hashTagsInput = window.form.filtersForm.querySelector('.text__hashtags');
  var descriptionInput = window.form.filtersForm.querySelector('.text__description');
  var submitButton = window.form.filtersForm.querySelector('.img-upload__submit');
  var errorForm = document.querySelector('.img-upload__message--error');
  var uploadButton = document.querySelector('.upload-file');

  var ValidityErrors = {
    HASHTAGS_QUANTITY: 'Максимальное количество хэштегов- ',
    DUPLICATES: 'Удалите повторяющиеся хэштеги',
    SYNTAX: 'Хэштеги должны начинаться с символа #, отделяться друг от друга пробелом и соддержать только цифры и буквы. ' +
    'Максимальная длина одного хэштега - ' + HASHTAG_MAX_LENGTH + ' символов',
    DESCRIPTION_LENGTH: 'Максимальное количество символов- ' + DESCRIPTION_MAX_LENGTH
  };

  var hasDuplicates = function (values) {
    values = values.slice(0).sort();
    return values.some(function (value, index) {
      if (index) {
        return values[index].toLowerCase() === values[index - 1].toLowerCase();
      }
      return false;
    });
  };

  var errorHandler = function (errorMessage) {
    errorForm.classList.remove('hidden');
    var errorBlock = window.preview.makeElement('p', 'errorMessage');
    errorBlock.textContent = errorMessage;
    errorForm.appendChild(errorBlock);
    window.form.closeFiltersForm();
  };

  var successHandler = function () {
    window.form.closeFiltersForm();
    window.form.resetForm();
    uploadButton.style.display = 'none';
  };

  var resetValidity = function () {
    hashTagsInput.style.borderColor = 'white';
    descriptionInput.style.borderColor = 'white';
  };

  var inputsValidity = {
    hashTagsState: true,
    descriptionState: true
  };

  var onHashTagsInput = function () {
    inputsValidity.hashTagsState = true;
    if (hashTagsInput.value.length !== 0) {
      var hashTags = hashTagsInput.value.split(' ');
      if (hashTags.length > HASTAGS_MAX_QUANTITY) {
        inputsValidity.hashTagsState = false;
        hashTagsInput.setCustomValidity(ValidityErrors.HASHTAGS_QUANTITY + HASTAGS_MAX_QUANTITY);
        hashTagsInput.reportValidity();
      } else if (hasDuplicates(hashTags)) {
        inputsValidity.hashTagsState = false;
        hashTagsInput.setCustomValidity(ValidityErrors.DUPLICATES);
        hashTagsInput.reportValidity();
      }
      hashTags.forEach(function (hashTag) {
        if ((!(/^(#[A-Za-z0-9А-Яа-я]+)$/g.test(hashTag))) || (hashTag.length > HASHTAG_MAX_LENGTH)) {
          inputsValidity.hashTagsState = false;
          hashTagsInput.setCustomValidity(ValidityErrors.SYNTAX);
          hashTagsInput.reportValidity();
        }
      });
    }
    if (inputsValidity.hashTagsState) {
      hashTagsInput.setCustomValidity('');
      hashTagsInput.style.borderColor = 'white';
    } else {
      hashTagsInput.style.borderColor = 'red';
    }
  };

  var onDescriptionInput = function () {
    inputsValidity.descriptionState = true;
    if (descriptionInput.value.length !== 0) {
      var description = descriptionInput.value;
      if (description.length > DESCRIPTION_MAX_LENGTH) {
        inputsValidity.descriptionState = false;
        descriptionInput.setCustomValidity(ValidityErrors.DESCRIPTION_LENGTH);
        descriptionInput.reportValidity();
        descriptionInput.style.borderColor = 'red';
      }
    }
    if (inputsValidity.descriptionState) {
      descriptionInput.setCustomValidity('');
      descriptionInput.style.borderColor = 'white';
    }
  };

  var onFiltersFormSubmit = function (evt) {
    var data = new FormData(window.form.filtersForm);
    if (!(inputsValidity.hashTagsState && inputsValidity.descriptionState)) {
      window.form.filtersForm.checkValidity();
      window.form.filtersForm.reportValidity();
      evt.preventDefault();
    } else {
      evt.preventDefault();
      window.backend.upload(data, successHandler, errorHandler);
    }
  };

  submitButton.addEventListener('click', onFiltersFormSubmit);

  hashTagsInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.onFiltersFormEscPress);
  });

  hashTagsInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.onFiltersFormEscPress);
  });

  hashTagsInput.addEventListener('input', onHashTagsInput);

  descriptionInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.onFiltersFormEscPress);
  });

  descriptionInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.onFiltersFormEscPress);
  });

  descriptionInput.addEventListener('input', onDescriptionInput);

  window.validate = {
    resetValidity: resetValidity,
    errorForm: errorForm
  };
})();
