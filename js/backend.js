'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_DOWNLOAD = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = 10000;

  var ErrorMessages = {
    PAGE_NOT_FOUND: 404,
    PAGE_SUCCESS: 200,
    SERVER_ERROR: 500
  };

  var setup = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ErrorMessages.PAGE_SUCCESS:
          onLoad(xhr.response);
          break;
        case ErrorMessages.PAGE_NOT_FOUND:
          onError('Страница не найдена');
          break;
        case ErrorMessages.SERVER_ERROR:
          onError('Внутренняя ошибка сервера');
          break;
        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });


    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };


  var upload = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('GET', URL_DOWNLOAD);
    xhr.send();
  };


  window.backend = {
    upload: upload,
    load: load
  };

})();

