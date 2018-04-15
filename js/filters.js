'use strict';

var filterProcentage = 0;
var filterPin = document.querySelector('.scale__pin');
var privewImage = document.querySelector('.img-upload__preview img');
var effectItems = [].slice.call(document.querySelectorAll('.effects__item'));

var onEffectItemCLick = function (evt) {
  var eventTarget = evt.currentTarget;
  var selectedEffect = eventTarget.querySelector('.effects__radio').value;
  setEffect(selectedEffect, filterProcentage);
};

var onFilterPinMouseUp = function () {
  calculateFilterProcantage();
};

var calculateFilterProcantage = function () {
  var pinPosX = filterPin.offsetLeft;
  var scaleLine = document.querySelector('.scale__line');
  var scaleLineWidth = scaleLine.offsetWidth;
  filterProcentage = Math.round(100 * pinPosX / scaleLineWidth);
};

var setEffect = function (effect, filterProcentage) {
  privewImage.className = ''; //????? mozhno?
  privewImage.classList.add('effects__preview--' + effect);
};

effectItems.forEach(function (element) {
  element.addEventListener('click', onEffectItemCLick);
});

filterPin.addEventListener('mouseup', onFilterPinMouseUp);

