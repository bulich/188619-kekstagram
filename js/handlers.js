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
  console.log(isDuplicates);
  return isDuplicates;
};

var onHashTagInput = function (evt) {
  var inputTarget = evt.target;
  var hashTags = inputTarget.value.split(' ');
  var is = checkForDuplicates(hashTags);
  if (hashTags.length > 5) {
    inputTarget.setCustomValidity('Максимальное количество хэштегов - 5');
  } if (is) {
    inputTarget.setCustomValidity('Удалите повторяющиеся хэштеги ' + checkForDuplicates(hashTags));
  }
  hashTags.forEach(function (hashTag) {
    if (hashTag.charAt(0) !== '#') {
      inputTarget.setCustomValidity('Хештэг должен начинаться с символа #');
    } else if (hashTag.length > 20) {
      inputTarget.setCustomValidity('Максимальная длина одного хэштега - 20 символов');
    }
  });
};

hashTagsInput.addEventListener('change', onHashTagInput);
