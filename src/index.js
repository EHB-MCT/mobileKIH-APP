import _ from 'lodash';

// import styles bundle
var swiperOptions1 = {
  loop: true,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
	reverseDirection: true,
  },
  slidesPerView: "auto",
  speed: 3500,
  grabCursor: true,
  mousewheelControl: true,
  keyboardControl: true
};

var swiperOptions2 = {
  loop: true,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
	reverseDirection: false,
  },
  spaceBetween: 0,
  grabCursor: true,
  a11y: false,
  freeMode: true,
  speed: 3500,
  loop: true,
  slidesPerView: "auto",
};

var swiper = new Swiper(".mySwiper", swiperOptions1);
var swiper = new Swiper(".mySwiper2", swiperOptions2);