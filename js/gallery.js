const toggleArrows = document.querySelectorAll('.filter__section__title');

const filters = {
    type: [],
    artist: [],
    subject: []
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
    console.log(button.children);
    button.addEventListener('click', () => {
        console.log('arrow clicked');
        button.children[1].classList.toggle("bx-chevron-left--on");
        button.nextElementSibling.classList.toggle("filter__section__filters--selected")
    });
});

document.querySelectorAll('.filter__section__filters').forEach(section => {
    section.addEventListener('click', (e) => {

        if (e.target.id == "type" || e.target.id == "artist" || e.target.id == "subject") {} else {
            let array = section.id;
            console.log(e.target.id);
            if (filters[array].includes(e.target.id)) {
                let index = filters[array].indexOf(e.target.id);
                filters[array].splice(index, 1);

            } else {
                filters[array].push(e.target.id);
            }
            console.log(filters);
            document.getElementById(e.target.id).classList.toggle("filter__section__filters--active");

        }

    });
});


//appplyin filters
document.getElementById('filter_applyButton').addEventListener("click", () => {
    const filtersDiv = document.getElementById('selectedFilters');
    filtersDiv.innerHTML = '';
    for (const array in filters) {
        filters[array].forEach(tag => {

            filtersDiv.innerHTML += `<div class="selectedFilters__filter" id="${tag}">
            <p>${tag}</p>
            <i class='bx bx-x selectedFilter__filter__cross'></i>
        </div>`;
        })
    }

    document.getElementById('filterSlideDiv').style.right = "-100%";
})

//removing a filter

document.querySelectorAll('.selectedFilter__filter__cross').forEach(cross => {
    cross.addEventListener('click', (e) => {
        console.log(e.target.id)
        document.getElementById(e.target.id).remove();
    })
})