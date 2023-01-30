let CHOSENCOLOR;

let next = document.querySelector('#nextBtn');
let fullscreen = document.querySelector('.fullscreen');

next.onclick = () => {
    fullscreen.classList.toggle('open');
}

document.getElementById('coloroptions').addEventListener('click', (e) => {
    CHOSENCOLOR = e.target.id;
    console.log(CHOSENCOLOR)
    if (CHOSENCOLOR !== 'coloroptions') {

        document.getElementById('selectedcolorframe').innerHTML = `<img src="../images/shop_step3_classic_${CHOSENCOLOR}.svg">`;
    }
})

document.querySelectorAll('.coloroption').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.coloroption').forEach(item => {
            item.classList.remove('selectedcolor');
        })
        option.classList.add('selectedcolor');
    })
})



document.getElementById('gotosize').addEventListener('click', () => {

    console.log('click')
    location.href = '../html/shopSize';
})


