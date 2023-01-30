const BASE_URL = "https://dimetrondon-backend.onrender.com/";
import Cookies from "js-cookie";

console.log(JSON.parse(Cookies.get('user')))
if(document.URL.includes('login'))
{



document.getElementById('login_button').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('submitted');
    const user = {
        email: document.getElementById('login_email').value,
        password: document.getElementById('login_password').value
    }
    let result = await postReq(`${BASE_URL}login`, user);
    if(result.status== 'ok'){
        console.log(result);
        Cookies.set('user',JSON.stringify(result.data))
        location.href = "./index.html";
    }
});
}


if(document.URL.includes('signup')){



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