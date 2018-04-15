'use strict';

var ESC_KEYCODE = 27;

var filtersForm = document.querySelector('.img-upload__overlay');
var filtersFormInput = document.querySelector('#upload-file'); //глагол в переменной?
var filtersFormOClose = document.querySelector('#upload-cancel');


//структура, обработчики первыми?

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
  filtersFormInput.value = ''; //???77777777777777
  document.removeEventListener('keydown', onFiltersFormEscPress);
};

filtersFormInput.addEventListener('change', function () {
  openFiltersForm();
});

filtersFormOClose.addEventListener('click', function () {
  closeFiltersForm();
});

