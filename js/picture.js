'use strict';

(function () {
  var photoTemplate = document.querySelector('#picture').content;
  var errorForm = document.querySelector('.img-upload__message--error');

  var errorHandler = function (errorMessage) {
    errorForm.classList.remove('hidden');
    errorForm.textContent = errorMessage;
  };

  var successHandler = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (element, i) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.querySelector('.picture__img').src = data[i].url;
      photoElement.querySelector('.picture__stat--likes').textContent = data[i].likes;
      photoElement.querySelector('.picture__stat--comments').textContent = data[i].comments.length;
      fragment.appendChild(photoElement);
    });
    renderFragment(fragment, '.pictures');
    window.preview.setPreview(data);
  };

  var renderFragment = function (fragment, containerSelector) {
    var fragmentContainer = document.querySelector(containerSelector);
    fragmentContainer.appendChild(fragment);
  };

  window.backend.load(successHandler, errorHandler);

})();
