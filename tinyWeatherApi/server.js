app.post('/addCity', addCity);

function addCity(req, res) {

    newEntry = {
        animal: req.body.city_name,

    }

    cityData.push(newEntry)
    console.log(cityData)
}