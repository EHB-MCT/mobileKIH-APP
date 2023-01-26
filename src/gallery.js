const toggleArrows = document.querySelectorAll('.filter__section__title');
const THREE = require('three');
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';

import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
const filters = {
    genres: [],
    styles: [],
    subjects: []
}

document.getElementById('filterButton').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('filterSlideDiv').style.right = "0%";
})
document.getElementById('goBackButton').addEventListener('click', (e) => {
    document.getElementById('filterSlideDiv').style.right = "-100%";
})

//rotate arrows
toggleArrows.forEach(button => {
    button.addEventListener('click', () => {
        button.children[1].classList.toggle("bx-chevron-left--on");
        button.nextElementSibling.classList.toggle("filter__section__filters--selected")
    });
});

document.querySelectorAll('.filter__section__filters').forEach(section => {
    section.addEventListener('click', (e) => {

        if (e.target.id == "genres" || e.target.id == "styles" || e.target.id == "subjects") { } else {
            let array = section.id;
            let target = e.target.id
            const i = filters[array].findIndex(e => e.id === target);
            if (i > -1) {
                filters[array].splice(i, 1);
            } else {
                filters[array].push({ id: e.target.id, value: e.target.innerHTML });
            }
            document.getElementById(target).classList.toggle("filter__section__filters--active");

        }

    });
});


//appplyin filters
document.getElementById('filter_applyButton').addEventListener("click", () => {
    const filtersDiv = document.getElementById('selectedFilters');
    filtersDiv.innerHTML = '';
    for (const array in filters) {
        filters[array].forEach(tag => {
            let div = document.createElement('div')
            div.classList.add('selectedFilters__filter')
            div.id = tag.id;
            let p = document.createElement('p')
            p.innerHTML = tag.value;
            let cross = document.createElement('i')
            cross.classList.add('bx');
            cross.classList.add('bx-x');
            cross.classList.add('selectedFilter__filter__cross');

            div.appendChild(p)
            div.appendChild(cross)
            filtersDiv.appendChild(div)

            div.addEventListener('click', function () {
                const i = filters[array].findIndex(e => e.id === this.id);
                (document.querySelectorAll('.filter__section__filters--active').forEach(toRemove => {
                    if (toRemove.id == this.id) {
                        toRemove.classList.toggle("filter__section__filters--active");

                    }
                }))
                filters[array].splice(i, 1);
                this.remove();
            })
            //     filtersDiv.innerHTML += `<div class="selectedFilters__filter" id="${tag.id}">
            //     <p>${tag.value}</p>
            //     <i class='bx bx-x selectedFilter__filter__cross'></i>
            // </div>`;
        })
    }
    applyThemJuicyFilter()
    document.getElementById('filterSlideDiv').style.right = "-100%";
})

//removing a filter

// document.querySelectorAll('.selectedFilters__filter').forEach(cross => {
//     cross.addEventListener('click', (e) => {
//         const i = filters[array].findIndex(e => e.id === target);
//         filters[array].splice(i, 1);
//         document.getElementById(e.target.id).remove();


//     })
// })


function loadFilters() {
    fetch("https://dimetrondon-backend.onrender.com/getFilters", filters).then(e => e.json()).then(e => {
        e.forEach(element => {
            document.getElementById(Object.keys(element)[0]).innerHTML = ''
            element[Object.keys(element)][0].forEach(t => {
                document.getElementById(Object.keys(element)[0]).innerHTML += `<p id="${t.ID}-${Object.keys(element)[0]}">${t[Object.keys(element)[0].slice(0, -1)]}</p>`
            });
        });
    })


}

loadFilters();
applyThemJuicyFilter();

async function applyThemJuicyFilter() {
    document.querySelectorAll('.column')[0].innerHTML = ""
    document.querySelectorAll('.column')[1].innerHTML = ""
    await postData('https://dimetrondon-backend.onrender.com/applyThemJuicyFilter', filters)
        .then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call

            data.forEach((e, i) => {


                if (e.idgenre == 3) {
                    let source = document.createElement("source")
                    source.src = "https://dimetrodon.fr/files/" + e.file;
                    source.type = "video/mp4"
                    let test = document.createElement('video');
                    test.classList.add('test')
                    test.autoplay = true;
                    test.loop = true;
                    test.load();
                    test.append(source)
                    document.querySelectorAll('.column')[i % 2].appendChild(test)

                } else if (e.idgenre == 1) {
                    let test = document.createElement('img');
                    let blur = document.createElement('img');
                    test.classList.add('image')
                    blur.classList.add('blur')
                    test.src = "https://dimetrodon.fr/files/" + e.file.split('.')[0] + '.jpg';
                    document.querySelectorAll('.column')[i % 2].appendChild(test)





                } else {
                    let test = document.createElement('img');
                    let blur = document.createElement('img');
                    test.classList.add('image')
                    blur.classList.add('blur')
                    test.src = "https://dimetrodon.fr/files/" + e.file;
                    blur.src = "https://dimetrodon.fr/files/" + e.file;
                    document.querySelectorAll('.column')[i % 2].appendChild(test)


                }
            })
        });
}



async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

