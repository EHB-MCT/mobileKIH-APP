const toggleArrows = document.querySelectorAll('.room__title');


document.querySelectorAll('.bxs-toggle-left').forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('bxs-toggle-right');
    })
})


toggleArrows.forEach(button => {
    console.log(button.children);
    button.addEventListener('click', () => {
        console.log('arrow clicked');
        button.children[1].classList.toggle("bx-chevron-left--on");
        button.nextElementSibling.classList.toggle("room__frames--selected")
    });
});

//add room