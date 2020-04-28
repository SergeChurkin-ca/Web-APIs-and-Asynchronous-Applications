// --------------------------------------------------
// Global varoables
// --------------------------------------------------
const apikey = 'bbbec3ba75bc468635dca07422eb073f';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?';

const messageBody = document.getElementById('content');


// --------------------------------------------------
// Get API url and set the date
// --------------------------------------------------
const createApiUrl = city => finalApiUrl = `${baseURL}q=${city}&appid=${apikey}`;
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();


/* Get Journal Records (Project Data) from the server*/
const getJournalRecords = async(url = '') => {
        const journalRecords = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        try {
            const records = await journalRecords.json();
            return records;
        } catch (error) {
            console.log('getJournalRecords', error);
        }

    } // end getJournalRecords


/* GET the Weather from OpenWeatherMap API */
const getWeatherData = async(url = '') => {
        const weatherData = await fetch(url);

        try {
            if (weatherData.status !== 200) {
                throw new Error("Not 200 response")
            } else {
                const data = await weatherData.json();
                return data;
            }
        } catch (error) {
            console.log('getWeatherData', error);
            alert('Please check your selection');
            return false;
        }
    } //end getWeatherData

/* POST a Record to the Journal(on local server) */
const postJournalRecord = async(url = '', data = {}) => {
        const returnedJournal = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        try {
            const res = await returnedJournal.json();
            return true;
        } catch (error) {
            console.log('postJournalRecord', error);
            return false;
        }
    } //end postJournalRecord

/* Add the Journal Data to the Page (Update UI) */
const updateUI = (items) => {
    let htmlData = items.map((item => {
        return ` 
        <p>  ${item.date} ${item.cityInput},${item.country}<br>
        ${Math.round(item.temp -273.15)}C 
        feels like ${Math.round(item.feelslike -273.15)}C, ${item.description}<br>
        ${item.content}
        </p>`;
    })).join(" ");

    messageBody.innerHTML = htmlData;
}


/* ===== Combination of above Functions using Promises===== */

/* Called by Event Listener => Creates a new Journal Record and Add to Journal */
const addRecordToJournal = () => {

    // get the User Data
    const city = document.getElementById('city').value;
    const feelings = document.getElementById('feelings').value;

    // Validation

    if (feelings.length < 5) {
        alert('Please, add some description!');
        return;
    }

    // execute
    getWeatherData(createApiUrl(city))
        .then(data => {
            //create the new record object
            if (data) {
                const newRecord = {}
                newRecord.date = newDate;
                newRecord.temp = data.main.temp;
                newRecord.content = feelings;
                newRecord.feelslike = data.main.feels_like;
                newRecord.city = data.name; //!
                newRecord.country = data.sys.country;
                newRecord.description = data.weather[0].description;
                newRecord.posstImage = postImage;
                postJournalRecord('/add', newRecord)
            }
        })
        .then(addJournalRecordsToPage)
        .then(clearInputFields)
        .catch((error) => console.log(error))
}

const addJournalRecordsToPage = () => {
    getJournalRecords('/get').then(data => {
        data.length >= 1 ? updateUI(data) : '';
    });
}


// --------------------------------------------
// Clear Input Fields
// --------------------------------------------
function clearInputFields() {
    document.getElementById("myForm").reset();
}



//end functions declarations

// --------------------------------------------
// Start execution
// --------------------------------------------

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    /* get the DOM */
    const button = document.getElementById('generate');
    const cityInput = document.getElementById('city');


    /* Add the Journal Records into the page if exists*/
    addJournalRecordsToPage();

    /*Event Listener: Click => on button button */
    button.addEventListener('click', addRecordToJournal);

});