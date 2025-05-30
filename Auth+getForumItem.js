import fetch from 'node-fetch';

// een simpel script om de authenticatie token te krijgen
const key = 'b3461c28-aa1d-458b-8626-fa84c094db3f';
const id = '6bd88406-205e-44c9-935f-ab322e8de8bf';

async function getToken() {
    const response = await fetch('http://localhost:3000/api/public/v1/getToken', {
        method: 'GET',
        headers: {
            'key': key,
        }
    });
    const data = await response.json();
    return data.token;
}
async function getForumItem() {
    const response = await fetch('http://localhost:3000/api/public/v1/getForumItem', {
        method: 'GET',
        headers: {
            'token': token,
            'id': id
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
        return {}; // Return empty object if response is empty
    }

    const data = JSON.parse(text);
    return data;
}

async function run() {

    token = await getToken();
    getForumItem().then(userInfo => {
            console.log('User Info:', userInfo);
        }
    ).catch(error => {
            console.error('Error fetching user info:', error);
        }
    );
}
let token = null;
run();