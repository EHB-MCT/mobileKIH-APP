import _ from 'lodash';

 import Swiper from 'swiper';
 // import styles bundle
 import 'swiper/css/bundle';
 var swiperOptions1 = {
	loop: true,
	autoplay: {
		delay: 1,
		 },
	reverseDirection: true,
	grabCursor: true,
	a11y: false,
	freeMode: true,
	speed: 11000,
	loop: true,	
	slidesPerView: "auto",
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