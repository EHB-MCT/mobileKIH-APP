const { io } = require('../node_modules/socket.io/client-dist/socket.io.js')
var socket = io('https://dimetrondon-backend.onrender.com/');
import Cookies from "js-cookie";

if (!Cookies.get('user')) window.location = './login.html'
let user = JSON.parse(Cookies.get('user'));

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const screenid = urlParams.get('id')
const slider = document.getElementById('range')
if (!screenid) window.location = './frames.html'

slider.addEventListener('input', (e) => {
    document.getElementById('settime').innerText = e.target.value;
});

socket.on(screenid, (obj) => {
    let e = JSON.parse(obj)
    console.log(e);
    document.getElementById('showhere').innerHTML = ''


    if (e.genre == "Video") {
        let source = document.createElement("source")
        source.src = "https://dimetrodon.fr/files/" + e.file;
        source.type = "video/mp4"
        let test = document.createElement('video');

        test.name = e.idart
        test.autoplay = true;
        test.loop = true;
        test.muted = true;
        test.load();
        test.id = "displayed-art-img"

        test.append(source)
        document.getElementById('showhere').appendChild(test)


    } else if (e.genre == "3D") {
        let test = document.createElement('img');
        let blur = document.createElement('img');
        test.id = "displayed-art-img"

        test.name = e.idart
        test.src = "https://dimetrodon.fr/files/" + e.file.split('.')[0] + '.jpg';
        document.getElementById('showhere').appendChild(test)





    } else {
        let test = document.createElement("img");
        let blur = document.createElement("img");
        test.id = "displayed-art-img"
        test.src = "https://dimetrodon.fr/files/" + e.file;
        blur.src = "https://dimetrodon.fr/files/" + e.file;

        document.getElementById('showhere').appendChild(test)


    }
    // <img
    //   src="../images/16070866_nazar-boncuk-rectangle.png"
    //   id="displayed-art-img"
    // />
})


fetch('https://dimetrondon-backend.onrender.com/getLikesOfuSER/' + user.iduser)
    .then(e => e.json())
    .then(async data => {
        let fetchres = await fetch('https://dimetrondon-backend.onrender.com/getFrameSettings/' + screenid)

        let result = await fetchres.json();
        let settings = (JSON.parse(result[0][0].settings))
        let keysToCheck = []
        document.getElementById('range').value = settings.interval;
        document.getElementById('settime').innerText = settings.interval;

        if (Object.keys(settings).length) {
            keysToCheck = settings.ids;
        }
        console.log(keysToCheck.includes(32))
        data[0].forEach((e, i) => {


            if (e.idgenre == 3) {
                let source = document.createElement("source")
                source.src = "https://dimetrodon.fr/files/" + e.file;
                source.type = "video/mp4"
                let test = document.createElement('video');
                test.classList.add('test')
                if (keysToCheck.includes(e.idart)) {
                    test.classList.add('chek')

                } else {
                    test.classList.add('che')

                }
                test.name = e.idart
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
                if (keysToCheck.includes(e.idart)) {
                    test.classList.add('chek')

                } else {
                    test.classList.add('che')

                }
                test.name = e.idart
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
                if (keysToCheck.includes(e.idart)) {
                    test.classList.add('chek')

                } else {
                    test.classList.add('che')

                }
                test.name = e.idart
                test.src = "https://dimetrodon.fr/files/" + e.file;
                blur.src = "https://dimetrodon.fr/files/" + e.file;
                test.addEventListener('click', () => {
                    emitToDisplay(e.idart);
                })
                document.querySelectorAll('.column')[i % 2].appendChild(test)


            }
        });
        $(".che").imgCheckbox({
            graySelected: false,
            "styles": {
                "span.imgCheckbox.imgChked": {
                    "border": "0px solid #f3f0ec"
                },
                "span.imgCheckbox.imgChked img": {

                    // Let's change the amount of scaling from the default of "0.8"
                    "transform": "scale(0.9)"
                },

                "span.imgCheckbox.imgChked video": {
                    // Let's change the amount of scaling from the default of "0.8"
                    "transform": "scale(0.9)"
                }
            },
            onclick: async function (el) {
                let ids = getSelected();
                let res = await postReq("https://dimetrondon-backend.onrender.com/updateSettings", { idframe: screenid, settings: JSON.stringify({ ids: ids, interval: document.getElementById('range').value }) })
                console.log(res);
            }
        });
        $(".chek").imgCheckbox({
            graySelected: false,
            preselect: true,
            "styles": {
                "span.imgCheckbox.imgChked": {
                    "border": "0px solid #f3f0ec"
                },
                "span.imgCheckbox.imgChked img": {

                    // Let's change the amount of scaling from the default of "0.8"
                    "transform": "scale(0.9)"
                },

                "span.imgCheckbox.imgChked video": {
                    // Let's change the amount of scaling from the default of "0.8"
                    "transform": "scale(0.9)"
                }
            },
            onclick: async function (el) {
                let ids = getSelected();
                let res = await postReq("https://dimetrondon-backend.onrender.com/updateSettings", { idframe: screenid, settings: JSON.stringify({ ids: ids, interval: document.getElementById('range').value }) })
                console.log(res);
            }
        });
    })


function emitToDisplay(display) {
    socket.emit('broadcast-dis', screenid + '-display+' + display)

}


function getSelected() {
    let all = document.querySelectorAll('.imgChked');
    let idsList = []
    all.forEach(e => { idsList.push(parseInt(e.childNodes[0].name)) });
    console.log(idsList);
    return idsList;
};


async function postReq(url, data) {

    let resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await resp.json();
}

