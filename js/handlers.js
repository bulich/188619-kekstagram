'use strict';

var ESC_KEYCODE = 27;

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

