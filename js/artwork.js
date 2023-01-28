const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idArtWork = urlParams.get('id')

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