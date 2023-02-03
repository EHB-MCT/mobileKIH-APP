import Cookies from "js-cookie";
// import Avatar from "boring-avatars";

if (!Cookies.get('user')) window.location = './login.html';
let user = JSON.parse(Cookies.get('user'));
document.getElementById('profilepic').src = `https://source.boringavatars.com/marble/120/${user.firstname} ${user.lastname}?colors=fc6256,E9E5DC,00bd83,ffcfb5,CBD5FF`
function getLikes() {
    console.log(user)
    document.getElementById("likebutton").classList.toggle('button_inverse');
    document.getElementById("rentbutton").classList.toggle('button_inverse');

    fetch('https://dimetrondon-backend.onrender.com/getLikesOfuSER/' + user.iduser)
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
                        window.location.href = './artwork.html?id=' + e.idart;
                    })

                } else if (e.idgenre == 1) {
                    let test = document.createElement('img');
                    let blur = document.createElement('img');
                    test.classList.add('image')
                    blur.classList.add('blur')
                    test.src = "https://dimetrodon.fr/files/" + e.file.split('.')[0] + '.jpg';
                    document.querySelectorAll('.column')[i % 2].appendChild(test)
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
                    document.querySelectorAll('.column')[i % 2].appendChild(test)


                }
            });
        })

}
function getRents() {
    document.getElementById("rentbutton").classList.toggle('button_inverse');
    document.getElementById("likebutton").classList.toggle('button_inverse');
    
    fetch('https://dimetrondon-backend.onrender.com/getRentOfUser/' + JSON.parse(Cookies.get('user')).iduser)
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
                        window.location.href = './artwork.html?id=' + e.idart;
                    })

                } else if (e.idgenre == 1) {
                    let test = document.createElement('img');
                    let blur = document.createElement('img');
                    test.classList.add('image')
                    blur.classList.add('blur')
                    test.src = "https://dimetrodon.fr/files/" + e.file.split('.')[0] + '.jpg';
                    document.querySelectorAll('.column')[i % 2].appendChild(test)
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
                    document.querySelectorAll('.column')[i % 2].appendChild(test)


                }
            });
        })
}


getLikes()


document.getElementById("likebutton").addEventListener('click', () => {
    
    document.querySelectorAll('.column')[0].innerHTML = ""
    document.querySelectorAll('.column')[1].innerHTML = ""

    getLikes();
})
document.getElementById("rentbutton").addEventListener('click', () => {
    document.querySelectorAll('.column')[0].innerHTML = ""
    document.querySelectorAll('.column')[1].innerHTML = ""
    getRents();
})
