'use strict';

var openBtn = document.querySelector('.navigation__btn');
var modalElem = document.querySelector('.modal');
var overlayElem = document.querySelector('.modal__overlay');
var closeBtn = document.querySelector('.modal__close-btn');

var userName;
var userPhone;
var messageContent;
var isStorageSupport = true;

var ESC_KEYCODE = 27

function onEscKeyDown(e) {
  if(e.keyCode === ESC_KEYCODE) {
    modalElem.classList.add('modal--closed');
  }
}

function closeModal() {
  if (!modalElem.classList.contains('modal--closed')) {
    modalElem.classList.add('modal--closed');
    document.removeEventListener('keydown', onEscKeyDown)
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
