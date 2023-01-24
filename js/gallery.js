document.getElementById('filterButton').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('filterSlideDiv').style.right = "0%";
})
document.getElementById('goBackButton').addEventListener('click', (e) => {
    document.getElementById('filterSlideDiv').style.right = "-100%";
})