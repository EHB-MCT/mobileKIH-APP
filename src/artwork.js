const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idArtWork = urlParams.get('id')
const Swal = require("sweetalert2");

let heart = document.querySelector('#heart'); // NTM ALI
let deleteT = document.querySelector('.artbutton'); // NTM ALI

import Cookies from "js-cookie";
if (idArtWork == null) window.location = "./gallery.html";
fetch('https://dimetrondon-backend.onrender.com/getArtPiecePage/' + idArtWork)
    .then(e => e.json())
    .then(async data => {
        {
            if (data[0][0].genre == "Video") {
                let source = document.createElement("source");
                source.src = "https://dimetrodon.fr/files/" + data[0][0].file;
                source.type = "video/mp4";
                let test = document.createElement("video");
                test.autoplay = true;
                test.loop = true;
                test.muted = true;
                test.load();
                test.append(source);
                document.querySelector(".zyzzcontainer").innerHTML = '';

                document.querySelector(".zyzzcontainer").appendChild(test);
            } else if (data[0][0].genre == "3D") {
                document.querySelector(
                    ".zyzzcontainer"
                ).innerHTML = `<model-viewer class="model" src="https://dimetrodon.fr/files/${data[0][0].file
                }" poster="https://dimetrodon.fr/files/${data[0][0].file.split(".")[0]
                    }.jpg" shadow-intensity="4" auto-rotate auto-rotate-delay="10" touch-action="pan-y" alt="A 3D model carousel">`;
            } else {
                let test = document.createElement("img");
                test.classList.add("image");
                test.src = "https://dimetrodon.fr/files/" + data[0][0].file;
                document.querySelector(".zyzzcontainer").innerHTML = '';

                document.querySelector(".zyzzcontainer").appendChild(test);

            }

        }
        let res = await fetch('https://dimetrondon-backend.onrender.com/getStock/' + idArtWork);
        let total = await res.json();
        total = total[0][0].total;
        if (total > 0) {
            document.querySelector('#hereplz').innerText = total + ' Kunstwerken beschikbaar.'
        }

        document.getElementById('artname').innerText = data[0][0].name
        document.querySelector('.artistname ').innerText = data[0][0].artistname;

            document.querySelector('.artistname ').addEventListener('click', () => {
                window.location.href = './artist.html?id=' + data[0][0].idartist;

            })

        document.querySelector('.arttext ').innerText = data[0][0].description

        let style = document.createElement('p');
        let genre = document.createElement('p');
        let subject = document.createElement('p');

        style.classList.add('selectedFilters__filter')
        genre.classList.add('selectedFilters__filter')
        subject.classList.add('selectedFilters__filter')

        style.innerText = data[0][0].style
        genre.innerText = data[0][0].genre
        subject.innerText = data[0][0].subject

        document.getElementById('contFilter').appendChild(style);
        document.getElementById('contFilter').appendChild(subject);
        document.getElementById('contFilter').appendChild(genre);
    })



async function test() {

    if (Cookies.get('user')) {
        // likeStatePiece
        let res = await postReq('https://dimetrondon-backend.onrender.com/likeStatePiece', { iduser: JSON.parse(Cookies.get('user')).iduser, idpiece: idArtWork })
        if (res[0].total != 0) {
            document.getElementById('heart').classList.add('ri-heart-fill')
        }
        heart.onclick = async () => {
            heart.classList.toggle('ri-heart-fill');
            let res = await postReq('https://dimetrondon-backend.onrender.com/toggleLike', { iduser: JSON.parse(Cookies.get('user')).iduser, idpiece: idArtWork })
        }
        $(function () {
            var start = moment()
            var end = moment().add(1, "days");

            function cb(start, end) {
                console.log(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
            }

            $('#rentbutton').daterangepicker({
                "autoApply": true,
                ranges: {
                    '1 Week': [moment(), moment().add(7, 'days')],
                    '2 Weken': [moment(), moment().add(14, 'days')],
                    '1 Maand': [moment(), moment().add(1, 'months')],
                    '2 Maanden': [moment(), moment().add(2, 'months')],
                    '3 Maanden': [moment(), moment().add(3, 'months')]
                },
                "showCustomRangeLabel": false,
                "opens": "center",
                "startDate": "01/25/2023",
                "endDate": "01/31/2023"
            }, function (start, end, label) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: `Wilt U did kunstwerk van &#10; ${start.format('L')} tot ${end.format('L')} uitlenen ? `,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        let res = await postReq('https://dimetrondon-backend.onrender.com/addHistory', { iduser: JSON.parse(Cookies.get('user')).iduser, idart: idArtWork, status: "renting", fromdate: start.format("YYYY-MM-DD HH:mm:ss"), todate: end.format("YYYY-MM-DD HH:mm:ss") })
                        Swal.fire(
                            'Succes!',
                            'Het kunstwerk werd gehuurd.',
                            'success'
                        ).then(e => {
          window.location.href = "./profile.html";
                            console.log("done")
                        })
                    }
                })
            });

            cb(start, end);

        });

        fetch('https://dimetrondon-backend.onrender.com/getRentOfUser/' + JSON.parse(Cookies.get('user')).iduser)
        .then(e => e.json())
        .then(data => {
            let idg = (data[0].map(e=> {return e.idart}))
            console.log(idg.includes(idArtWork))
            console.log((idArtWork))
            console.log((idg))

            if(idg.includes(parseInt(idArtWork))){
                document.getElementById('rentbutton').remove();

            }
        })

    } else {
        deleteT.remove();
    }
    fetch('https://dimetrondon-backend.onrender.com/getSimilarPieces/' + idArtWork).then(e => e.json()).then(
        fields => {
            console.log(fields);
            fields.forEach((e, i) => {
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
                    document.querySelectorAll('.artcolumn')[i % 2].appendChild(test)
                    test.addEventListener('click', () => {
                        window.location.href = './artwork.html?id=' + e.idart;
                    })

                } else if (e.idgenre == 1) {
                    let test = document.createElement('img');
                    let blur = document.createElement('img');
                    test.classList.add('image')
                    blur.classList.add('blur')
                    test.src = "https://dimetrodon.fr/files/" + e.file.split('.')[0] + '.jpg';
                    document.querySelectorAll('.artcolumn')[i % 2].appendChild(test)
                    test.addEventListener('click', () => {
                        window.location.href = './artwork.html?id=' + e.idart;
                    })




                } else {
                    let test = document.createElement('img');
                    let blur = document.createElement('img');
                    test.classList.add('image')
                    blur.classList.add('blur')
                    test.src = "https://dimetrodon.fr/files/" + e.file;
                    blur.src = "https://dimetrodon.fr/files/" + e.file;
                    test.addEventListener('click', () => {
                        window.location.href = './artwork.html?id=' + e.idart;
                    })
                    document.querySelectorAll('.artcolumn')[i % 2].appendChild(test)


                }
            });
        }
    )

}

test();

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
