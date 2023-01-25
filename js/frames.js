const toggleArrows = document.querySelectorAll('.room__title');


document.querySelectorAll('.bxs-toggle-left').forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('bxs-toggle-right');
    })
})


toggleArrows.forEach(button => {
    console.log(button.children);
    button.addEventListener('click', () => {
        console.log('arrow clicked');
        button.children[1].classList.toggle("bx-chevron-left--on");
        button.nextElementSibling.classList.toggle("room__frames--selected")
    });
});

//add room

let PREVIOUSLY_CHOSEN = '';
let CHOSEN_ROOM;

document.querySelectorAll('.choice__existingRooms').forEach(room => {
    room.addEventListener('click', (e) => {
        if (CHOSEN_ROOM == e.target.id) {
            CHOSEN_ROOM = '';
        } else {
            PREVIOUSLY_CHOSEN = CHOSEN_ROOM;
            CHOSEN_ROOM = e.target.id;
            document.getElementById(e.target.id).parentElement.classList.toggle('choice__existingRooms__room--selected');
        }
        console.log(CHOSEN_ROOM);

    });
});


// add new room
document.getElementById('plus_addroom').addEventListener('click', () => {
    document.getElementById('plus_addroom').classList.toggle('plus--active')
    document.getElementById('addRoom-wrapper').classList.toggle('addRoom-wrapper--active');
})