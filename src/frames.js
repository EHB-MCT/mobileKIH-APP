const { io } = require('../node_modules/socket.io/client-dist/socket.io.js')
var socket = io('https://dimetrondon-backend.onrender.com/');

function toggles() {

    const toggleArrows = document.querySelectorAll('.room__title');


    document.querySelectorAll('.bxs-toggle-left').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('bxs-toggle-right');
            if (toggle.classList.contains('bxs-toggle-right')) {
                socket.emit('on', toggle.parentElement.id.split('-')[0]);
            } else {
                socket.emit('off', toggle.parentElement.id.split('-')[0]);
            }

        })
    })


    toggleArrows.forEach(button => {
        console.log(button.children);
        button.addEventListener('click', () => {
            console.log('arrow clicked');
            button.children[1].classList.toggle("bx-chevron-left--on");
            button.nextElementSibling.classList.toggle("room__frames--selected")
            console.log(button.nextElementSibling)
        });
    });
}




// add new room
document.getElementById('plus_addroom').addEventListener('click', () => {
        location.href = "./addframe.html"
});


fetch('https://dimetrondon-backend.onrender.com/getUserRoomsFrames/1')
    .then(e => e.json())
    .then(data => {
        data = data[0]
        const unique = [...new Set(data.map(item => item.idroom + '^' + item.roomname))]; // [ 'A', 'B']
        unique.forEach(element => {
            let div = document.createElement('div');
            let div2 = document.createElement('div');
            div2.classList.add('room__title')

            div.id = element.split('^')[0] + '-room';
            div.classList.add('room');
            let h3 = document.createElement('h3');
            h3.innerText = element.split('^')[1]
            div2.appendChild(h3)
            div.appendChild(div2)
            document.getElementById('rooms').appendChild(div)
        });
        data.forEach(element => {
            let div = document.createElement('div');
            div.classList.add('toggle');

            let ico = document.createElement('i');
            ico.classList.add('bx');
            ico.classList.add('bx-chevron-left');
            div.appendChild(ico);
            let mainDiv = document.createElement('div')
            mainDiv.classList.add('room__frames');
            mainDiv.id = element.idroom + '-room__frames';

            console.log(document.getElementById(element.idroom + '-room').childNodes[0].childNodes)
            if (document.getElementById(element.idroom + '-room').childNodes[0].childNodes.length == 1) {
                document.getElementById(element.idroom + '-room').childNodes[0].appendChild(div);
                document.getElementById(element.idroom + '-room').appendChild(mainDiv);

            }

            console.log(element)
            let frame = document.createElement('div')
            frame.classList.add('frame');
            frame.id = element.idframe + '-frame'

            let iv = document.createElement('i');
            iv.classList.add('bx');
            iv.classList.add('bxs-cog');
            iv.classList.add('settings');
            iv.addEventListener('click', () => {
                window.location.href = './oneFrameEx.html?id=' + element.guid;

            })

            let name = document.createElement('p');
            name.innerText = element.framename

            let another = document.createElement('i');
            another.classList.add('bx');
            another.classList.add('bxs');
            another.classList.add('bxs-toggle-left');
            if (element.state) another.classList.add('bxs-toggle-right')

            frame.appendChild(iv);
            frame.appendChild(name);
            frame.appendChild(another);

            document.getElementById(`${element.idroom}-room__frames`).appendChild(frame);



        })
        toggles();
    })