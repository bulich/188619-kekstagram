'use strict';

(function () {
  var SCALE_STEP = 25;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var ENTER_KEYCODE = 13;
  var FILTER_EFFECT_PREFIX = 'effects__preview--';

  var filtersForm = document.querySelector('.img-upload__form');
  var filterPin = filtersForm.querySelector('.scale__pin');
  var previewImage = filtersForm.querySelector('.img-upload__preview img');
  var effectItems = [].slice.call(document.querySelectorAll('.effects__item'));
  var scaleLine = filtersForm.querySelector('.scale__line');
  var scaleLevel = filtersForm.querySelector('.scale__level');
  var resizeButtons = filtersForm.querySelectorAll('.resize__control');
  var resizeInput = filtersForm.querySelector('.resize__control--value');
  var percentageInput = filtersForm.querySelector('.scale__value');
  var scaleFieldset = filtersForm.querySelector('.img-upload__scale');
  var filtersModal = document.querySelector('.img-upload__overlay');
  var filtersFormInput = document.querySelector('#upload-file');
  var filtersFormClose = document.querySelector('#upload-cancel');
  var resendLinks = document.querySelectorAll('.error__link');


  var onFiltersFormEscPress = function (evt) {
    if (evt.keyCode === window.preview.ESC_KEYCODE) {
      closeFiltersForm();
    }
  };

  var openFiltersForm = function () {
    filtersModal.classList.remove('hidden');
    resetForm();
    document.addEventListener('keydown', onFiltersFormEscPress);
  };

  var resetForm = function () {
    filtersForm.reset();
    resetFilter();
    resetScale();
    window.validate.resetValidity();
  };

  var closeFiltersForm = function () {
    filtersModal.classList.add('hidden');
    filtersFormInput.value = '';
    document.removeEventListener('keydown', onFiltersFormEscPress);
  };

  var imageSettings = {
    scale: 100,
    changeScale: function (step) {
      var newScale = this.scale + step;
      if (newScale >= MIN_SCALE_VALUE && newScale <= MAX_SCALE_VALUE) {
        this.scale = newScale;
        setScale();
      }
    },
    changeFilterPercentage: function () {
      var pinPosX = filterPin.offsetLeft;
      var scaleLineWidth = scaleLine.offsetWidth;
      percentageInput.value = Math.round(100 * pinPosX / scaleLineWidth);
      setFilterPercentage();
    }
  };

  var setScale = function () {
    resizeInput.value = imageSettings.scale + '%';
    previewImage.style.transform = 'scale(' + imageSettings.scale * 0.01 + ')';
  };

  var resetScale = function () {
    previewImage.style.removeProperty('transform');
    imageSettings.scale = 100;
  };

  var onEffectItemCLick = function (evt) {
    var eventTarget = evt.currentTarget;
    var selectedEffect = eventTarget.querySelector('.effects__radio').value;
    setEffect(selectedEffect);
  };

  var setEffect = function (effect) {
    resetFilter();
    previewImage.classList.add(FILTER_EFFECT_PREFIX + effect);
    scaleFieldset.style.display = (effect === 'none') ? 'none' : 'block';
  };

  var onResizeButtonClick = function (evt) {
    var resizeButton = evt.currentTarget;
    if (resizeButton.classList.contains('resize__control--minus')) {
      imageSettings.changeScale(-SCALE_STEP);
    } else if (resizeButton.classList.contains('resize__control--plus')) {
      imageSettings.changeScale(SCALE_STEP);
    }
  };

  var setFilterPercentage = function () {
    var currentFilter = previewImage.classList;
    var filterPercentage = percentageInput.value;
    if (currentFilter.contains('effects__preview--chrome')) {
      var filterRate = filterPercentage * 0.01;
      previewImage.style.filter = 'grayscale(' + filterRate + ')';
    } else if (currentFilter.contains('effects__preview--sepia')) {
      filterRate = filterPercentage * 0.01;
      previewImage.style.filter = 'sepia(' + filterRate + ')';
    } else if (currentFilter.contains('effects__preview--marvin')) {
      previewImage.style.filter = 'invert(' + filterPercentage + '%)';
    } else if (currentFilter.contains('effects__preview--phobos')) {
      filterRate = filterPercentage * 0.03;
      previewImage.style.filter = 'blur(' + filterRate + 'px)';
    } else if (currentFilter.contains('effects__preview--heat')) {
      filterRate = (filterPercentage * 0.02) + 1;
      previewImage.style.filter = 'brightness(' + filterRate + ')';
    } else {
      previewImage.style.filter = 'none';
    }
  };

  var resetFilter = function () {
    previewImage.style.removeProperty('filter');
    previewImage.className = '';
    scaleFieldset.style.display = 'none';
    percentageInput.value = 100;
    filterPin.style.left = percentageInput.value + '%';
    scaleLevel.style.width = percentageInput.value + '%';
  };


  filterPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoord = evt.clientX;
    var onFilterPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;
      if ((filterPin.offsetLeft - shift) >= 0 && (filterPin.offsetLeft - shift) <= scaleLine.offsetWidth) {
        imageSettings.changeFilterPercentage();
        filterPin.style.left = (filterPin.offsetLeft - shift) + 'px';
        scaleLevel.style.width = percentageInput.value + '%';
      }
    };

    var onFilterPinMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onFilterPinMouseMove);
      document.removeEventListener('mouseup', onFilterPinMouseUp);
    };

    document.addEventListener('mousemove', onFilterPinMouseMove);
    document.addEventListener('mouseup', onFilterPinMouseUp);
  });

  effectItems.forEach(function (element) {
    element.addEventListener('click', onEffectItemCLick);
  });

  resizeButtons.forEach(function (element) {
    element.addEventListener('click', onResizeButtonClick);
  });

  filtersFormInput.addEventListener('change', function () {
    openFiltersForm();
  });

  filtersFormClose.addEventListener('click', function () {
    closeFiltersForm();
  });

  resendLinks.forEach(function (element) {
    element.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openFiltersForm();
      }
    });
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      openFiltersForm();
    });
  });

  window.form = {
    onFiltersFormEscPress: onFiltersFormEscPress,
    filtersForm: filtersForm,
    closeFiltersForm: closeFiltersForm,
    resetForm: resetForm
  };
})();
