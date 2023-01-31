const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idArtWork = urlParams.get('id')

let heart = document.querySelector('#heart'); // NTM ALI

import Cookies from "js-cookie";
if (idArtWork == null) window.location = "./gallery.html";
fetch('https://dimetrondon-backend.onrender.com/getArtPiecePage/' + idArtWork)
    .then(e => e.json())
    .then(data => {
        console.log(data);
        document.querySelector('.artimg').src = "https://dimetrodon.fr/files/" + data[0][0].file;
        document.getElementById('artname').innerText = data[0][0].name
        document.querySelector('.artistname ').innerText = data[0][0].artistname
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
        let res = await postReq('http://localhost:3000/likeStatePiece', { iduser: JSON.parse(Cookies.get('user')).iduser, idpiece: idArtWork })
        if (res[0].total != 0) {
            document.getElementById('heart').classList.add('ri-heart-fill')
        }
        heart.onclick = async () => {
            heart.classList.toggle('ri-heart-fill');
            let res = await postReq('http://localhost:3000/toggleLike', { iduser: JSON.parse(Cookies.get('user')).iduser, idpiece: idArtWork })
        }
    }
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
