const slider = document.getElementById('range')

slider.addEventListener('input', (e) => {
    document.getElementById('settime').innerText = e.target.value;
});