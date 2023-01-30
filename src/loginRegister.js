const BASE_URL = "https://dimetrondon-backend.onrender.com/";
import Cookies from "js-cookie";
if (Cookies.get('user')) window.location = './home.html'
if (document.URL.includes('login')) {

    document.getElementById('login_button').addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('submitted');
        const user = {
            email: document.getElementById('login_email').value,
            password: document.getElementById('login_password').value
        }
        let result = await postReq(`${BASE_URL}login`, user);
        if (result.status == 'ok') {
            console.log(result);
            Cookies.set('user', JSON.stringify(result.data))
            location.href = "./home.html";
        }
    });
}


if (document.URL.includes('signup')) {



    document.getElementById('signup_button').addEventListener('click', async (event) => {
        event.preventDefault();
        const user = {
            email: document.getElementById('signup_email').value,
            password: document.getElementById('signup_password').value,
            firstname: document.getElementById('signup_firstname').value,
            lastname: document.getElementById('signup_lastname').value
        }

        if (checkPassword(document.getElementById('signup_password').value, document.getElementById('signup_repeatpassword').value)) {
            console.log('signing up...');
            let res = await postReq(`${BASE_URL}register`, user);
            if (res.status = 'ok') {
                Cookies.set('user', JSON.stringify(res.wat[0]))
            }

        } else {
            console.log('repeated password is not same');
        }

    })
}


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