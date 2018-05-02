'use strict';


var SCALE_STEP = 25;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;


var filterPin = document.querySelector('.scale__pin');
var previewImage = document.querySelector('.img-upload__preview img');
var effectItems = [].slice.call(document.querySelectorAll('.effects__item'));
var scaleLine = document.querySelector('.scale__line');
var scaleLevel = document.querySelector('.scale__level');
var resizeControls = document.querySelector('.img-upload__resize');
var resizeButtons = document.querySelectorAll('.resize__control');
var resizeInput = document.querySelector('.resize__control--value');
var percentageInput = document.querySelector('.scale__value');

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
  resizeControls.style.zIndex = 2;
};

var onEffectItemCLick = function (evt) {
  var eventTarget = evt.currentTarget;
  var selectedEffect = eventTarget.querySelector('.effects__radio').value;
  setEffect(selectedEffect);
};

var setEffect = function (effect) {
  previewImage.className = '';
  resetPercentage();
  previewImage.classList.add('effects__preview--' + effect);
  resizeControls.style.zIndex = 2;
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

var resetPercentage = function () {
  previewImage.style.removeProperty('filter');
  percentageInput.value = 100;
  setPinPosition();
};

var setPinPosition = function () {
  filterPin.style.left = percentageInput.value + '%';
  scaleLevel.style.width = percentageInput.value + '%';
};
setPinPosition();

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

