const { io } = require('../node_modules/socket.io/client-dist/socket.io.js')
var socket = io('https://dimetrondon-backend.onrender.com/');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const screenid = urlParams.get('id')
const slider = document.getElementById('range')
slider.addEventListener('input', (e) => {
    document.getElementById('settime').innerText = e.target.value;
});


fetch('https://dimetrondon-backend.onrender.com/getLikesOfuSER')
    .then(e => e.json())
    .then(data => {
        data[0].forEach((e, i) => {


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
                document.querySelectorAll('.column')[i % 2].appendChild(test)
                test.addEventListener('click', () => {
                    emitToDisplay(e.idart);

                })

            } else if (e.idgenre == 1) {
                let test = document.createElement('img');
                let blur = document.createElement('img');
                test.classList.add('image')
                blur.classList.add('blur')
                test.src = "https://dimetrodon.fr/files/" + e.file.split('.')[0] + '.jpg';
                document.querySelectorAll('.column')[i % 2].appendChild(test)

                test.addEventListener('click', () => {
                    emitToDisplay(e.idart);


                })



            } else {
                let test = document.createElement('img');
                let blur = document.createElement('img');
                test.classList.add('image')
                blur.classList.add('blur')
                test.src = "https://dimetrodon.fr/files/" + e.file;
                blur.src = "https://dimetrodon.fr/files/" + e.file;
                test.addEventListener('click', () => {
                    emitToDisplay(e.idart);
                })
                document.querySelectorAll('.column')[i % 2].appendChild(test)


            }
        });
    })


function emitToDisplay(display) {
    socket.emit('broadcast-dis', screenid+'-display+'+display)
    
}