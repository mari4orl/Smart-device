'use strict';

var accList = document.querySelectorAll('.acc');

var openBtn = document.querySelector('.navigation__btn');
var modalElem = document.querySelector('.modal');
var overlayElem = document.querySelector('.modal__overlay');
var closeBtn = document.querySelector('.modal__close-btn');

var userName;
var userPhone;
var messageContent;
var isStorageSupport = true;

var anchorList = document.querySelectorAll('.anchor-link');
var anchor;

var phoneInputList = document.querySelectorAll('.phone');
var phoneInput;

var ESC_KEYCODE = 27

//модальное окно

function onEscKeyDown(e) {
  if(e.keyCode === ESC_KEYCODE) {
    modalElem.classList.add('modal--closed');
    document.body.classList.remove('stop-scrolling');
  }
}

function closeModal() {
  if (!modalElem.classList.contains('modal--closed')) {
    modalElem.classList.add('modal--closed');
    document.removeEventListener('keydown', onEscKeyDown)
    document.body.classList.remove('stop-scrolling');
  }
}

try {
  localStorage.getItem('userName');
  localStorage.getItem('userPhone');
  localStorage.getItem('messageContent');
} catch (err) {
  isStorageSupport = false;
}

if (openBtn) {
  userName = modalElem.querySelector('[id=modal-name]');
  userPhone = modalElem.querySelector('[id=modal-phone]');
  messageContent = modalElem.querySelector('[id=modal-message]');

  openBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    document.body.classList.add('stop-scrolling');
    if (modalElem.classList.contains('modal--closed')) {
      modalElem.classList.remove('modal--closed');
      document.addEventListener('keydown', onEscKeyDown)
    }
    userName.focus();
  });

  modalElem.addEventListener('submit', function (evt) {
    if (!userName.value || !userPhone.value || messageContent.value === '') {
      evt.preventDefault();
      modalElem.classList.remove('modal-error');
      modalElem.offsetWidth = modalElem.offsetWidth;
      modalElem.classList.add('modal-error');
      if (!userName.value) {
        userName.focus();
      } else {
        if (!userPhone.value) {
          userPhone.focus();
        } else {
          if (messageContent.value === '') {
            messageContent.focus();
          }
        }
      }
    } else {
      if (isStorageSupport) {
        localStorage.setItem('userName', userName.value);
        localStorage.setItem('userPhone', userPhone.value);
      }
    }
  });
}

closeBtn.addEventListener('click', closeModal);
overlayElem.addEventListener('click', closeModal);


//аккордеон

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

//скролл

for (i = 0; i < anchorList.length; i++) {
  anchor = anchorList[i];
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var link = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    var blockID = link.getAttribute('href').substr(1);
    window.scrollTo({
      top: document.getElementById(blockID).offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  });
}

//Валидация номера телефона

for (var i = 0; i < phoneInputList.length; i++) {
  phoneInput = phoneInputList[i];
  phoneInput.addEventListener('click', addPhone);
  phoneInput.addEventListener('keydown', checkPhone);
}

function addPhone(evt) {
  var inp = evt.target;
  if (!inp.value.length) {
    inp.value = '+7(';
  }
}

function checkPhone(evt) {
  var inp = evt.target;
  var curLen = inp.value.length;
  if (!/\d/.test(evt.key)) {
    if (evt.keyCode === 8 || evt.keyCode === 9) {
      return;
    } else {
      evt.preventDefault();
    }
  }
  if (curLen === 0) {
    inp.value = inp.value + '+7(';
  }
  if (curLen === 2) {
    inp.value = inp.value + '(';
  }
  if (curLen === 6) {
    inp.value = inp.value + ') ';
  }
  if (curLen === 10) {
    inp.value = inp.value + '-';
  }
  if (curLen === 13) {
    inp.value = inp.value + '-';
  }
  if (curLen > 16) {
    inp.value = inp.value.substring(0, inp.value.length - 1);
  }
}
