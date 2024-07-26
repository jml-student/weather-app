async function getApiData(location, unit) {
    let errorMessage = '';
    try {
        let response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=Q5RFQXKFWUN3LADSR2DWBKFTH&contentType=json`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.status === 404) {
            errorMessage = 'Location not found';
            document.querySelector('.message').textContent = errorMessage;
            return null;
        }

        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null;
    }
}

async function filterData(data) {
    return {
        location: data.address,
        weather: data.currentConditions.conditions,
        feelslike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        precip: data.currentConditions.precip,
        cloudcover: data.currentConditions.cloudcover,
        temp: data.currentConditions.temp,
        description: data.description,
    };
}

function displayWeather(data, locationInput, unitInput) {
    document.getElementById('location').value = '';
    document.querySelector('.message').textContent = '';

    const content = document.querySelector('.content');
    const conditions = document.querySelector('.conditions');
    const address = document.querySelector('.address');
    const weatherSvg = document.querySelector('.weather-svg');
    const weather = document.querySelector('.weather');
    const temp = document.querySelector('.temp');
    const unit = document.querySelector('.unit');
    const description = document.querySelector('.description');
    const feelslike = document.querySelector('.feelslike');
    const precip = document.querySelector('.precip');
    const humidity = document.querySelector('.humidity');

    conditions.style.display = 'block';
    address.textContent = locationInput;
    weather.textContent = data.weather;
    temp.textContent = data.temp;
    unit.textContent = '°' + unitInput;
    description.textContent = data.description;
    feelslike.textContent = data.feelslike;
    precip.textContent = data.precip;
    humidity.textContent = data.humidity;
}

function getIconAndBg(cloudcover, precip) {}

document
    .getElementById('weatherForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault();

        let location = document.getElementById('location').value;
        let unitInput = document.getElementById('unit-select').value;
        let unit = '';

        if (unitInput === 'celsius') {
            unit = 'metric';
        } else if (unitInput === 'farenheit') {
            unit = 'us';
        }

        let apiData = await getApiData(location, unit);
        let data = await filterData(apiData);
        displayWeather(data, location, unit);
    });
