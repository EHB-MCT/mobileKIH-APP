let CHOSENCOLOR;

document.getElementById('coloroptions').addEventListener('click', (e) => {
    CHOSENCOLOR = e.target.id;
    console.log(CHOSENCOLOR)
    if (CHOSENCOLOR !== 'coloroptions') {
        document.getElementById('selectedcolorframe').innerHTML = `<img src="../images/shop_step3_classic_${CHOSENCOLOR}.svg">`;
    }
})

document.querySelectorAll('.coloroption').forEach(option => {
    option.addEventListener('click', () => {

        option.style.border = "1px solid #00bd83";
    })
})



document.getElementById('gotosize').addEventListener('click', () => {

    console.log('click')
    location.href = '../html/shopSize';
})