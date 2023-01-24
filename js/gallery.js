const toggleArrows = document.querySelectorAll('.filter__section__title');

document.getElementById('filterButton').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('filterSlideDiv').style.right = "0%";
})
document.getElementById('goBackButton').addEventListener('click', (e) => {
    document.getElementById('filterSlideDiv').style.right = "-100%";
})

//rotate arrows
toggleArrows.forEach(button => {
    console.log(button.children);
    button.addEventListener('click', () => {
        console.log('arrow clicked');
        button.children[1].classList.toggle("bx-chevron-left--on");
        button.nextElementSibling.classList.toggle("filter__section__filters--selected")
    });
});