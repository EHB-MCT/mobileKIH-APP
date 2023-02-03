import Cookies from "js-cookie";

if (document.URL.includes('home') && !Cookies.get('user')) window.location = './login.html'


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



var swiperOptions4 = {
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




{

fetch("https://dimetrondon-backend.onrender.com/getHomePage").then(e => e.json()).then(data => {
  data.forEach((e, i) => {
    if (e.idgenre == 3) {
      let source = document.createElement("source")
      source.src = "https://dimetrodon.fr/files/" + e.file;
      source.type = "video/mp4"
      let test = document.createElement('video');
      test.classList.add('test')
      test.autoplay = true;
      test.loop = true;
      test.muted = true;
      test.load();
      test.append(source)
      let di = document.createElement('dive')
      di.classList.add("swiper-slide");
      di.appendChild(test)
      document.querySelectorAll('.swiper-wrapper')[i % 2].appendChild(di)
      test.addEventListener('click', () => {
        document.location.href = "./artwork.html?id=" + e.idart
      })

    } else if (e.idgenre == 1) {
      let test = document.createElement('img');
      let blur = document.createElement('img');
      test.classList.add('image')
      blur.classList.add('blur')
      test.src = "https://dimetrodon.fr/files/" + e.file.split('.')[0] + '.jpg';
      let di = document.createElement('dive')
      di.classList.add("swiper-slide");
      di.appendChild(test)
      document.querySelectorAll('.swiper-wrapper')[i % 2].appendChild(di)

      test.addEventListener('click', () => {
        document.location.href = "./artwork.html?id=" + e.idart


      })



    } else {
      let test = document.createElement('img');
      let blur = document.createElement('img');
      test.classList.add('image')
      blur.classList.add('blur')
      test.src = "https://dimetrodon.fr/files/" + e.file;
      blur.src = "https://dimetrodon.fr/files/" + e.file;
      test.addEventListener('click', () => {
        document.location.href = "./artwork.html?id=" + e.idart
      })
      let di = document.createElement('dive')
      di.classList.add("swiper-slide");
      di.appendChild(test)
      document.querySelectorAll('.swiper-wrapper')[i % 2].appendChild(di)


    }
  });
  var swiper = new Swiper(".mySwiper", swiperOptions1);
  var swiper = new Swiper(".mySwiper2", swiperOptions2);
})

}


if (document.URL.includes('home')) {

  fetch("https://dimetrondon-backend.onrender.com/getNewest").then(e => e.json()).then(data => {
  data.forEach((e, i) => {
    if (e.idgenre == 3) {
      let source = document.createElement("source")
      source.src = "https://dimetrodon.fr/files/" + e.file;
      source.type = "video/mp4"
      let test = document.createElement('video');
      test.classList.add('test')
      test.autoplay = true;
      test.loop = true;
      test.muted = true;
      test.load();
      test.append(source)
      let di = document.createElement('dive')
      di.classList.add("swiper-slide");
      di.appendChild(test)
      document.querySelectorAll('.swiper-wrapper')[i % 2+2].appendChild(di)
      test.addEventListener('click', () => {
        document.location.href = "./artwork.html?id=" + e.idart
      })

    } else if (e.idgenre == 1) {
      let test = document.createElement('img');
      let blur = document.createElement('img');
      test.classList.add('image')
      blur.classList.add('blur')
      test.src = "https://dimetrodon.fr/files/" + e.file.split('.')[0] + '.jpg';
      let di = document.createElement('dive')
      di.classList.add("swiper-slide");
      di.appendChild(test)
      document.querySelectorAll('.swiper-wrapper')[i % 2+2].appendChild(di)

      test.addEventListener('click', () => {
        document.location.href = "./artwork.html?id=" + e.idart


      })



    } else {
      let test = document.createElement('img');
      let blur = document.createElement('img');
      test.classList.add('image')
      blur.classList.add('blur')
      test.src = "https://dimetrodon.fr/files/" + e.file;
      blur.src = "https://dimetrodon.fr/files/" + e.file;
      test.addEventListener('click', () => {
        document.location.href = "./artwork.html?id=" + e.idart
      })
      let di = document.createElement('dive')
      di.classList.add("swiper-slide");
      di.appendChild(test)
      document.querySelectorAll('.swiper-wrapper')[i % 2+2].appendChild(di)


    }
  });
  var swiper2 = new Swiper(".mySwiper3", swiperOptions1);
  var swiper3= new Swiper(".mySwiper4", swiperOptions2);
})
}