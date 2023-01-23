const BASE_URL = "http://localhost:3001/";

document.getElementById('login_button').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('submitted');
    const user = {
        email: document.getElementById('login_email').value,
        password: document.getElementById('login_password').value
    }
    let result = postReq(`${BASE_URL}login`, user);
    console.log(result);
});
document.getElementById('signup_button').addEventListener('click', (event) => {
    event.preventDefault();
    const user = {
        email: document.getElementById('login_email').value,
        password: document.getElementById('login_password').value,
        firstname: document.getElementById('login_firstname').value,
        lastname: document.getElementById('login_lastname').value
    }

    if (checkPassword) {
        console.log('repeated password is not same');
    } else {
        console.log('signing up...');
    }

})


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

function checkPassword(pw, repeatpw) {
    if (pw == repeatpw) {
        return true;
    } else {
        return false;
    }
}