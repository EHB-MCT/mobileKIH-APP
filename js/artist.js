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
        data[1].forEach((e, i) => {
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
    })