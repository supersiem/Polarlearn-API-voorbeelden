import fetch from 'node-fetch';

// een simpel script om de authenticatie token te krijgen
const key = 'b3461c28-aa1d-458b-8626-fa84c094db3f';

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
async function getForum() {
    const response = await fetch('http://localhost:3000/api/public/v1/getForum', {
        method: 'GET',
        headers: {
            'token': token,
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
    getForum().then(userInfo => {
            console.log('User Info:', userInfo);
        }
    ).catch(error => {
            console.error('Error fetching user info:', error);
        }
    );
}
let token = null;
run();