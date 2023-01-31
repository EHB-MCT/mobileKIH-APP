const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idArtWork = urlParams.get('id')

let heart = document.querySelector('#heart'); // NTM ALI
let rent = document.querySelector('#heart'); // NTM ALI
let deleteT = document.querySelector('.artbutton'); // NTM ALI

import Cookies from "js-cookie";
if (idArtWork == null) window.location = "./gallery.html";
fetch('https://dimetrondon-backend.onrender.com/getArtPiecePage/' + idArtWork)
    .then(e => e.json())
    .then(data => {
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
                ).innerHTML = `<model-viewer class="model" src="https://dimetrodon.fr/files/${
                  data[0][0].file
                }" poster="https://dimetrodon.fr/files/${
                  data[0][0].file.split(".")[0]
                }.jpg" shadow-intensity="4" auto-rotate auto-rotate-delay="10" touch-action="pan-y" alt="A 3D model carousel">`;
              } else {
                let test = document.createElement("img");
                test.classList.add("image");
                test.src = "https://dimetrodon.fr/files/" + data[0][0].file;
                document.querySelector(".zyzzcontainer").innerHTML = '';
        
                document.querySelector(".zyzzcontainer").appendChild(test);
        
              }

        }



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
        let res = await postReq('https://dimetrondon-backend.onrender.com/likeStatePiece', { iduser: JSON.parse(Cookies.get('user')).iduser, idpiece: idArtWork })
        if (res[0].total != 0) {
            document.getElementById('heart').classList.add('ri-heart-fill')
        }
        heart.onclick = async () => {
            heart.classList.toggle('ri-heart-fill');
            let res = await postReq('https://dimetrondon-backend.onrender.com/toggleLike', { iduser: JSON.parse(Cookies.get('user')).iduser, idpiece: idArtWork })
        }
        $(function() {
            var start = moment()
            var end = moment().add(1,"days");
        
            function cb(start, end) {
                console.log(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
            }
        
            $('#rentbutton').daterangepicker({
                "autoApply": true,
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().add(29, 'days'), moment()],
                    'Last Month': [moment().add(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                "showCustomRangeLabel": false,
                "opens":"center",
                "startDate": "01/25/2023",
                "endDate": "01/31/2023"
            }, function(start, end, label) {
              console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
            });
        
            cb(start, end);
        
        });


    }else{
        deleteT.remove();
    }
    fetch('https://dimetrondon-backend.onrender.com/getSimilarPieces/'+idArtWork).then(e=> e.json()).then(
        fields=>{
            console.log(fields);
            fields.forEach((e,i) => {
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
