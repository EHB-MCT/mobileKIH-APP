import _ from 'lodash';

// import styles bundle
var swiperOptions1 = {
  loop: true,
  autoplay: {
    delay: 1,
    disableOnInteraction: false
  },
  slidesPerView: "auto",
  speed: 1000,
  grabCursor: true,
  mousewheelControl: true,
  keyboardControl: true
};

var swiperOptions2 = {
  loop: true,
  autoplay: {
    delay: 1,
    disableOnInteraction: true,
  },
  spaceBetween: 0,
  reverseDirection: true,
  grabCursor: true,
  a11y: false,
  freeMode: true,
  speed: 11000,
  loop: true,
  slidesPerView: "auto",
};

var swiper = new Swiper(".mySwiper", swiperOptions1);
var swiper = new Swiper(".mySwiper2", swiperOptions2);