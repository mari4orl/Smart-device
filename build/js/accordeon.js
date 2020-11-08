'use strict';

var accList = document.querySelectorAll('.acc');

for (var i = 0; i < accList.length; i++) {
  var acc = accList[i];
  acc.addEventListener('click', function (evt) {
    if (evt.target.checked) {
      for (var j = 0; j < accList.length; j++) {
        accList[j].checked = accList[j] === evt.target ? true : false;
      }
    }
  });
}
