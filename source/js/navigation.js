'use strict'
var navigation = document.querySelector('.navigation');
var navToggle = document.querySelector('.navigation__toggle');

navigation.classList.remove('navigation--nojs');

navToggle.addEventListener('click', function () {
  if (navigation.classList.contains('navigation--closed')) {
    navigation.classList.remove('navigation--closed');
    navigation.classList.add('navigation--opened');
  } else {
    navigation.classList.add('navigation--closed');
    navigation.classList.remove('navigation--opened');
  }
});
