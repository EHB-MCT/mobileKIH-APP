const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idArtist = urlParams.get('id')
if (idArtist == null) window.location = "./gallery.html";

fetch('https://dimetrondon-backend.onrender.com/getArtist/' + idArtist)
    .then(e => e.json())
    .then(data => {
        document.getElementById('artistname').innerText = data[0][0].artistname;
        document.getElementById('bio').innerText = data[0][0].bio;
        document.getElementById('artistimg').src = "https://dimetrodon.fr/files/" + data[0][0].image;
        data[1].forEach((element, i) => {
            console.log(element);
            let img = document.createElement('img');
            img.src = "https://dimetrodon.fr/files/" + element.file
            document.querySelectorAll('.artcolumn')[i % 2].appendChild(img)

        });
    })