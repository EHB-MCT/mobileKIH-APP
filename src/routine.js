import Swiper from 'swiper';
// import styles bundle
import 'swiper/css/bundle';
import Cookies from "js-cookie";

if (Cookies.get('user')) window.location = './login.html'

var swiper = new Swiper(".mySwiper", {
	slidesPerView: 3,
	spaceBetween: 10,
	freeMode: true,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});