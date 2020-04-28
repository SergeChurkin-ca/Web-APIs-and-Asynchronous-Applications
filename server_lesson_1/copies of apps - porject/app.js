/* Global Variables */


const apikey = 'bbbec3ba75bc468635dca07422eb073f';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';

const messageBody = document.getElementById('content');

const city = document.getElementById('city').value;

const feelings = document.getElementById('feelings').value;
const button = document.getElementById('generate');


const date = document.getElementById('date');
const temp = document.getElementById('temp');



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const getDate = () => {
    const date = new Date();
    return date.toDateString();
}

/* 
API call:
api.openweathermap.org/data/2.5/weather?id={city id}&appid={your api key} */


// ------------------------------------------
// Function called by event listener
// ------------------------------------------
button.addEventListener('click', performAction);


const getWeather = async(baseURL, city, apikey) => {

    const res = await fetch(baseURL + 'q=' + city + '&appid=' + apikey)
    console.log(res)

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
        window.alert('please check your selection')
    }
}

/* Function to GET Web API Data*/
const saveData = async() => {
    data.date = getDate();
    data.feelings = feelings.value;
    data.temp = await getTemp();
    updateUI();
}

const getTemp = async() => {

    const endpointUrl = baseURL + city + apikey;
    try {
        const response = await fetch(endpointUrl);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse.main.temp;
        }
    } catch (error) {
        console.log(error.message);
    }
}



// ------------------------------------------
// Funciton to post data
// ------------------------------------------

const postData = async(url = '/', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
        return false;
    };
};

/*Function to update UI*/
const updateUI = async() => {
    const request = await fetch('/');
    try {
        const allData = await request.json();
        const html = `
        <p>${data.name},${data.sys.country} ${Math.round(data.main.temp -273.15)}C ${data.weather[0].description}. ${feelings}</p>
        `;
        messageBody.innerHTML = html;

        document.getElementById('city').value = "";
        document.getElementById('feelings').value = "";
    } catch (error) {
        console.log("error", error);
    }
}


button.addEventListener('click', postData, false);


function performAction(e) {

    getWeather(baseURL, city, apikey)
    saveData();
}