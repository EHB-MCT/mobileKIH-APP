"use strict"
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let heart = document.querySelector('#heart');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}

heart.onclick = () => {
    heart.classList.toggle('ri-heart-fill');
}
