import _ from 'lodash';

 import Swiper from 'swiper';
 // import styles bundle
 import 'swiper/css/bundle';
 var swiperOptions = {
	loop: true,
	autoplay: {
	  disableOnInteraction: false
	},
	slidesPerView: "auto",
	speed: 10000,
	grabCursor: true,
	mousewheelControl: true,
	keyboardControl: true
  };

  var swiper = new Swiper(".mySwiper", swiperOptions);
  var swiper = new Swiper(".mySwiper2", swiperOptions);