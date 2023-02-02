document.querySelectorAll('.info__title').forEach(item => {
    item.addEventListener('click', (e) => {
        console.log(item)
        item.classList.toggle('clickedTitle')
        item.children[1].classList.toggle('clicked');
        let panel = item.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    })
})