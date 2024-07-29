async function getApiData(location, unit) {
    try {
        let response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=Q5RFQXKFWUN3LADSR2DWBKFTH&contentType=json`
        );

        if (!response.ok) {
            if (response.status === 404) {
                document.querySelector('.conditions').style.display = 'none';
                document.querySelector('.message').textContent =
                    'Location not found';
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function filterData(data) {
    return {
        location: data.resolvedAddress,
        weather: data.currentConditions.conditions,
        feelslike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        precip: data.currentConditions.precip,
        cloudcover: data.currentConditions.cloudcover,
        temp: data.currentConditions.temp,
        description: data.description,
    };
}

function displayWeather(data, locationInput, unitInput, icon, img) {
    document.getElementById('location').value = '';
    document.querySelector('.message').textContent = '';

    const content = document.querySelector('.content-container');
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

    content.style.backgroundImage = `url('./img/${img}')`;
    conditions.style.display = 'block';
    address.textContent = locationInput;
    weatherSvg.innerHTML = icon;
    weather.textContent = data.weather;
    temp.textContent = data.temp;
    unit.textContent = '°' + unitInput;
    description.textContent = data.description;
    feelslike.textContent = data.feelslike;
    precip.textContent = data.precip;
    humidity.textContent = data.humidity;
}

function getIconAndBgImg(cloudcover, precip) {
    let icon = '';
    let img = '';

    if (cloudcover < 25) {
        icon =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-1{isolation:isolate;}.cls-2{fill:#fb0;}.cls-3,.cls-8{fill:#fff;}.cls-4,.cls-5{fill:none;}.cls-4{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.cls-6{opacity:0.25;mix-blend-mode:multiply;}.cls-7,.cls-8{mix-blend-mode:overlay;}</style></defs><title>Icon Color</title><g class="cls-1"><g id="Layer_1" data-name="Layer 1"><g id="Vector"><path class="cls-2" d="M48.85,32.9A16.85,16.85,0,1,1,32,16.05,16.85,16.85,0,0,1,48.85,32.9Z"/><path class="cls-2" d="M37.24,12.74a.72.72,0,0,1-.4-.12s-1.43-.81-4.84-.81-4.83.81-4.84.81a.76.76,0,0,1-1.06-1l5.24-9.08a.77.77,0,0,1,1.32,0L37.9,11.6a.77.77,0,0,1-.66,1.14Z"/><path class="cls-2" d="M23.05,14.09a.94.94,0,0,1-.38.17s-1.62.29-4.23,2.48-3.18,3.73-3.19,3.74a.76.76,0,0,1-1.46-.11L12,10.05a.75.75,0,0,1,.26-.71A.76.76,0,0,1,13,9.21l9.85,3.58a.77.77,0,0,1,.5.8A.85.85,0,0,1,23.05,14.09Z"/><path class="cls-2" d="M13.05,24.24a.8.8,0,0,1-.18.37s-1.06,1.28-1.65,4.63,0,4.9,0,4.91a.77.77,0,0,1-.27.89A.75.75,0,0,1,10,35L2,28.28A.77.77,0,0,1,2.19,27L12,23.4a.76.76,0,0,1,.89.29A.78.78,0,0,1,13.05,24.24Z"/><path class="cls-2" d="M11.91,38.45a.7.7,0,0,1,.1.4s0,1.65,1.72,4.6,3.11,3.78,3.13,3.79a.77.77,0,0,1,.37.85.76.76,0,0,1-.73.57H6a.76.76,0,0,1-.66-.38.77.77,0,0,1,0-.75l5.24-9.08a.75.75,0,0,1,1.31,0Z"/><path class="cls-2" d="M20.18,50.06a.73.73,0,0,1,.33.25s1.07,1.26,4.27,2.42,4.82.89,4.83.89a.78.78,0,0,1,.84.42.75.75,0,0,1-.2.9l-8,6.74a.76.76,0,0,1-.74.13.78.78,0,0,1-.49-.58L19.17,50.91a.76.76,0,0,1,.44-.83A.8.8,0,0,1,20.18,50.06Z"/><path class="cls-2" d="M34,53.65a.75.75,0,0,1,.42,0s1.63.28,4.83-.89,4.26-2.41,4.27-2.42a.76.76,0,0,1,.9-.22.75.75,0,0,1,.44.82L43,61.23a.76.76,0,0,1-1.24.45l-8-6.74a.75.75,0,0,1-.2-.91A.78.78,0,0,1,34,53.65Z"/><path class="cls-2" d="M46.85,47.53a.81.81,0,0,1,.29-.29s1.43-.84,3.13-3.79S52,38.87,52,38.85a.77.77,0,0,1,.55-.75.76.76,0,0,1,.86.35l5.24,9.08a.77.77,0,0,1,0,.75.76.76,0,0,1-.66.38H47.5a.75.75,0,0,1-.73-.57A.72.72,0,0,1,46.85,47.53Z"/><path class="cls-2" d="M52.77,34.56a.84.84,0,0,1,0-.41s.56-1.56,0-4.91-1.64-4.61-1.65-4.63a.75.75,0,0,1-.05-.92A.74.74,0,0,1,52,23.4L61.81,27a.77.77,0,0,1,.48.58.74.74,0,0,1-.26.71L54,35a.75.75,0,0,1-.94,0A.8.8,0,0,1,52.77,34.56Z"/><path class="cls-2" d="M49,20.82a.67.67,0,0,1-.23-.34s-.58-1.55-3.19-3.74-4.22-2.48-4.23-2.49a.75.75,0,0,1-.64-.67.73.73,0,0,1,.49-.78L51,9.21a.76.76,0,0,1,.74.13.75.75,0,0,1,.26.71L50.21,20.37a.75.75,0,0,1-1.23.45Z"/><ellipse class="cls-3" cx="40.65" cy="23.32" rx="1.39" ry="3.07" transform="translate(-4.59 35.57) rotate(-45)"/><ellipse class="cls-3" cx="44.34" cy="27.86" rx="0.87" ry="1.92" transform="translate(-7.65 21.62) rotate(-25.3)"/></g><g id="Line"><path class="cls-4" d="M48.85,32.9A16.85,16.85,0,1,1,32,16.05,16.85,16.85,0,0,1,48.85,32.9Z"/><path class="cls-4" d="M37.24,12.74a.72.72,0,0,1-.4-.12s-1.43-.81-4.84-.81-4.83.81-4.84.81a.76.76,0,0,1-1.06-1l5.24-9.08a.77.77,0,0,1,1.32,0L37.9,11.6a.77.77,0,0,1-.66,1.14Z"/><path class="cls-4" d="M23.05,14.09a.94.94,0,0,1-.38.17s-1.62.29-4.23,2.48-3.18,3.73-3.19,3.74a.76.76,0,0,1-1.46-.11L12,10.05a.75.75,0,0,1,.26-.71A.76.76,0,0,1,13,9.21l9.85,3.58a.77.77,0,0,1,.5.8A.85.85,0,0,1,23.05,14.09Z"/><path class="cls-4" d="M13.05,24.24a.8.8,0,0,1-.18.37s-1.06,1.28-1.65,4.63,0,4.9,0,4.91a.77.77,0,0,1-.27.89A.75.75,0,0,1,10,35L2,28.28A.77.77,0,0,1,2.19,27L12,23.4a.76.76,0,0,1,.89.29A.78.78,0,0,1,13.05,24.24Z"/><path class="cls-4" d="M11.91,38.45a.7.7,0,0,1,.1.4s0,1.65,1.72,4.6,3.11,3.78,3.13,3.79a.77.77,0,0,1,.37.85.76.76,0,0,1-.73.57H6a.76.76,0,0,1-.66-.38.77.77,0,0,1,0-.75l5.24-9.08a.75.75,0,0,1,1.31,0Z"/><path class="cls-4" d="M20.18,50.06a.73.73,0,0,1,.33.25s1.07,1.26,4.27,2.42,4.82.89,4.83.89a.78.78,0,0,1,.84.42.75.75,0,0,1-.2.9l-8,6.74a.76.76,0,0,1-.74.13.78.78,0,0,1-.49-.58L19.17,50.91a.76.76,0,0,1,.44-.83A.8.8,0,0,1,20.18,50.06Z"/><path class="cls-4" d="M34,53.65a.75.75,0,0,1,.42,0s1.63.28,4.83-.89,4.26-2.41,4.27-2.42a.76.76,0,0,1,.9-.22.75.75,0,0,1,.44.82L43,61.23a.76.76,0,0,1-1.24.45l-8-6.74a.75.75,0,0,1-.2-.91A.78.78,0,0,1,34,53.65Z"/><path class="cls-4" d="M46.85,47.53a.81.81,0,0,1,.29-.29s1.43-.84,3.13-3.79S52,38.87,52,38.85a.77.77,0,0,1,.55-.75.76.76,0,0,1,.86.35l5.24,9.08a.77.77,0,0,1,0,.75.76.76,0,0,1-.66.38H47.5a.75.75,0,0,1-.73-.57A.72.72,0,0,1,46.85,47.53Z"/><path class="cls-4" d="M52.77,34.56a.84.84,0,0,1,0-.41s.56-1.56,0-4.91-1.64-4.61-1.65-4.63a.75.75,0,0,1-.05-.92A.74.74,0,0,1,52,23.4L61.81,27a.77.77,0,0,1,.48.58.74.74,0,0,1-.26.71L54,35a.75.75,0,0,1-.94,0A.8.8,0,0,1,52.77,34.56Z"/><path class="cls-4" d="M49,20.82a.67.67,0,0,1-.23-.34s-.58-1.55-3.19-3.74-4.22-2.48-4.23-2.49a.75.75,0,0,1-.64-.67.73.73,0,0,1,.49-.78L51,9.21a.76.76,0,0,1,.74.13.75.75,0,0,1,.26.71L50.21,20.37a.75.75,0,0,1-1.23.45Z"/><ellipse class="cls-5" cx="40.65" cy="23.32" rx="1.39" ry="3.07" transform="translate(-4.59 35.57) rotate(-45)"/><ellipse class="cls-5" cx="44.34" cy="27.86" rx="0.87" ry="1.92" transform="translate(-7.65 21.62) rotate(-25.3)"/></g><g id="Shadow" class="cls-6"><path d="M12.23,9.34a.75.75,0,0,0-.26.71l1.82,10.32a.76.76,0,0,0,1.46.11A10.49,10.49,0,0,1,18.19,17l-1.11-6.25L13,9.21A.76.76,0,0,0,12.23,9.34Z"/><path d="M36.84,12.62a.72.72,0,0,0,.4.12.77.77,0,0,0,.74-.91l-1,0a16.89,16.89,0,0,0-2.5.17A7.36,7.36,0,0,1,36.84,12.62Z"/><path d="M21,61.23a.78.78,0,0,0,.49.58.76.76,0,0,0,.74-.13l3.36-2.81-1.11-6.26a10.4,10.4,0,0,1-4-2.3.73.73,0,0,0-.33-.25.8.8,0,0,0-.57,0,.76.76,0,0,0-.44.83Z"/><path d="M1.71,27.56a.74.74,0,0,0,.26.71L10,35a.75.75,0,0,0,.92,0,.77.77,0,0,0,.27-.89A7.25,7.25,0,0,1,11,31.62L7,28.27a.74.74,0,0,1-.26-.71A.77.77,0,0,1,7.19,27l5.41-2a3.17,3.17,0,0,1,.27-.41.8.8,0,0,0,.18-.37.78.78,0,0,0-.12-.55A.76.76,0,0,0,12,23.4L2.19,27A.77.77,0,0,0,1.71,27.56Z"/><path d="M6,48.66h5a.76.76,0,0,1-.65-.38.77.77,0,0,1,0-.75l2.88-5A9.34,9.34,0,0,1,12,38.85a.7.7,0,0,0-.1-.4.75.75,0,0,0-1.31,0L5.36,47.53a.77.77,0,0,0,0,.75A.76.76,0,0,0,6,48.66Z"/><path d="M34.5,49.55a16.83,16.83,0,0,1,0-33.29,17.21,17.21,0,0,0-2.5-.21,16.84,16.84,0,0,0-14.09,7.62s0,0,0,0a.78.78,0,0,1,.12.55.8.8,0,0,1-.18.37s-1.06,1.28-1.65,4.63,0,4.9,0,4.91a.76.76,0,0,1-.87,1,16.38,16.38,0,0,0,.66,3,.74.74,0,0,1,.49,0,.78.78,0,0,1,.44.35.7.7,0,0,1,.1.4,9.83,9.83,0,0,0,1.35,3.93,16.84,16.84,0,0,0,13.64,7A17.21,17.21,0,0,0,34.5,49.55Z"/><path d="M31,11.83a.63.63,0,0,1,.08-.23l3.4-5.88-1.84-3.2a.77.77,0,0,0-1.32,0L26.1,11.6a.78.78,0,0,0-.07.54l1.21.44A10.26,10.26,0,0,1,31,11.83Z"/></g><g id="Highligth" class="cls-7"><path class="cls-8" d="M42.52,61.81a.78.78,0,0,0,.49-.58l1.82-10.32a.75.75,0,0,0-.44-.82.76.76,0,0,0-.9.22,10.28,10.28,0,0,1-4,2.3l-1.11,6.26,3.35,2.81A.78.78,0,0,0,42.52,61.81Z"/><path class="cls-8" d="M51.77,9.34A.76.76,0,0,0,51,9.21l-4.12,1.5L45.81,17a10.44,10.44,0,0,1,2.94,3.52.67.67,0,0,0,.23.34.75.75,0,0,0,1.23-.45L52,10.05A.75.75,0,0,0,51.77,9.34Z"/><path class="cls-8" d="M32.66,2.52a.77.77,0,0,0-1.32,0L29.5,5.72l3.4,5.88a.63.63,0,0,1,.08.23,10.26,10.26,0,0,1,3.78.75L38,12.14a.78.78,0,0,0-.07-.54Z"/><path class="cls-8" d="M27,11.81l-1,0a.75.75,0,0,0,1.14.79A7.68,7.68,0,0,1,29.5,12,16.89,16.89,0,0,0,27,11.81Z"/><path class="cls-8" d="M62.29,27.56a.77.77,0,0,0-.48-.58L52,23.4a.74.74,0,0,0-.88.29.75.75,0,0,0,.05.92,3.59,3.59,0,0,1,.27.41l5.41,2a.77.77,0,0,1,.48.58.74.74,0,0,1-.26.71l-4,3.35a7.22,7.22,0,0,1-.23,2.53.82.82,0,0,0,0,.41.8.8,0,0,0,.3.48A.75.75,0,0,0,54,35l8-6.74A.74.74,0,0,0,62.29,27.56Z"/><path class="cls-8" d="M58.64,48.28a.77.77,0,0,0,0-.75L53.4,38.45a.76.76,0,0,0-.86-.35.77.77,0,0,0-.55.75,9.3,9.3,0,0,1-1.23,3.69l2.88,5a.77.77,0,0,1,0,.75.76.76,0,0,1-.66.38h5A.76.76,0,0,0,58.64,48.28Z"/><path class="cls-8" d="M46.09,23.67A16.84,16.84,0,0,0,32,16.05a17.21,17.21,0,0,0-2.5.21,16.83,16.83,0,0,1,0,33.29,17.21,17.21,0,0,0,2.5.21,16.84,16.84,0,0,0,13.64-7A9.86,9.86,0,0,0,47,38.85a.77.77,0,0,1,.55-.75.79.79,0,0,1,.48,0,16.38,16.38,0,0,0,.66-3,.75.75,0,0,1-.61-.12.8.8,0,0,1-.3-.48.82.82,0,0,1,0-.41s.56-1.56,0-4.91-1.64-4.61-1.65-4.63a.75.75,0,0,1-.05-.92Z"/></g></g></g></svg>';
    } else if (25 < cloudcover && cloudcover < 50) {
        icon =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-1{isolation:isolate;}.cls-2{fill:#fb0;}.cls-3{fill:#e2e2e2;}.cls-4,.cls-9{fill:#fff;}.cls-5,.cls-6{fill:none;}.cls-5{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.cls-7{opacity:0.25;mix-blend-mode:multiply;}.cls-8,.cls-9{mix-blend-mode:overlay;}</style></defs><title>Icon Color</title><g class="cls-1"><g id="Layer_1" data-name="Layer 1"><g id="Vector"><path class="cls-2" d="M45.62,34.51a13.51,13.51,0,0,1-2.83,8.3,5.86,5.86,0,0,0-1-.35l-.33-.09h0a6.28,6.28,0,0,0-1.38-.15A6.39,6.39,0,0,0,35.7,44a6.27,6.27,0,0,0-2,4,12.54,12.54,0,0,1-1.75.12,13.61,13.61,0,0,1-4.87-26.33h7.26a1.49,1.49,0,0,0,1.11-.45A13.63,13.63,0,0,1,45.62,34.51Z"/><path class="cls-2" d="M16.68,27.51a.61.61,0,0,1-.15.3,8.56,8.56,0,0,0-1.33,3.74,8.29,8.29,0,0,0,0,4,.63.63,0,0,1-.22.72.62.62,0,0,1-.75,0L7.73,30.77a.62.62,0,0,1,.18-1.05l8-2.89a.62.62,0,0,1,.72.23A.61.61,0,0,1,16.68,27.51Z"/><path class="cls-2" d="M15.76,39a.62.62,0,0,1,.09.32A8.29,8.29,0,0,0,17.23,43a8.31,8.31,0,0,0,2.53,3.06.62.62,0,0,1,.3.69.61.61,0,0,1-.59.46H11a.6.6,0,0,1-.53-.3.62.62,0,0,1,0-.62L14.7,39a.62.62,0,0,1,.7-.28A.57.57,0,0,1,15.76,39Z"/><path class="cls-2" d="M26.16,50.53a8.3,8.3,0,0,1-3.44-2,.67.67,0,0,0-.28-.19.63.63,0,0,0-.45,0,.61.61,0,0,0-.36.66L23.1,57.4a.59.59,0,0,0,.4.46.58.58,0,0,0,.59-.1l3.2-2.68v0a5.76,5.76,0,0,1,.12-1.18,7.15,7.15,0,0,1,.47-1.51,5.72,5.72,0,0,1,.71-1.16A12.06,12.06,0,0,1,26.16,50.53Z"/><path class="cls-2" d="M53.53,46.32,49.28,39a.6.6,0,0,0-.69-.28.61.61,0,0,0-.44.6A8.45,8.45,0,0,1,46.76,43a13.23,13.23,0,0,1-1.36,2,6.25,6.25,0,0,1,.67,1.28,4,4,0,0,1,.22.61,6.42,6.42,0,0,1,1.77-.26,6.11,6.11,0,0,1,2.66.61H53a.66.66,0,0,0,.54-.3A.65.65,0,0,0,53.53,46.32Z"/><path class="cls-2" d="M48.78,35.85a.57.57,0,0,1,0-.34,8.4,8.4,0,0,0,0-4,8.48,8.48,0,0,0-1.33-3.74.63.63,0,0,1-.05-.75.6.6,0,0,1,.71-.23l8,2.89a.6.6,0,0,1,.39.47.62.62,0,0,1-.2.58l-6.49,5.44a.63.63,0,0,1-.76,0A.65.65,0,0,1,48.78,35.85Z"/><path class="cls-2" d="M45.72,24.74a.52.52,0,0,1-.19-.27,8.33,8.33,0,0,0-2.58-3,8.21,8.21,0,0,0-3.42-2,.62.62,0,0,1-.51-.55.59.59,0,0,1,.39-.63l8-2.9a.62.62,0,0,1,.6.11.6.6,0,0,1,.21.57l-1.47,8.34a.62.62,0,0,1-.56.51A.6.6,0,0,1,45.72,24.74Z"/><path class="cls-3" d="M61,58.43h0a1.6,1.6,0,0,1-1.34.71h-30a1.6,1.6,0,0,1-1.37-.75,6.58,6.58,0,0,1-.94-2.89c0-.13,0-.28,0-.42v0a5.76,5.76,0,0,1,.12-1.18,7.15,7.15,0,0,1,.47-1.51,5.72,5.72,0,0,1,.71-1.16,6.21,6.21,0,0,1,2.23-1.87,6.34,6.34,0,0,1,2.88-.69,4.21,4.21,0,0,1,0-.62,6.27,6.27,0,0,1,2-4,6.39,6.39,0,0,1,4.41-1.76,6.28,6.28,0,0,1,1.38.15h0l.33.09a5.86,5.86,0,0,1,1,.35,6.28,6.28,0,0,1,2,1.38,7.29,7.29,0,0,1,.66.81,6.25,6.25,0,0,1,.67,1.28,4,4,0,0,1,.22.61,6.42,6.42,0,0,1,1.77-.26,6.11,6.11,0,0,1,2.66.61,6,6,0,0,1,1.68,1.17,4.74,4.74,0,0,1,.79.93,6.11,6.11,0,0,1,2.57-.56,6.26,6.26,0,0,1,6.15,5.07A6.91,6.91,0,0,1,61,58.43Z"/><path class="cls-3" d="M36.69,17.16a7.94,7.94,0,0,1,0,.84,6,6,0,0,1-.6,2.42,3.48,3.48,0,0,1-.35.66.39.39,0,0,1-.08.1.61.61,0,0,1-.16.16,1.49,1.49,0,0,1-1.11.45h-30A1.6,1.6,0,0,1,3,21a6.42,6.42,0,0,1-1-3.36,5,5,0,0,1,.12-1.17,6.37,6.37,0,0,1,6.28-5.24A6.42,6.42,0,0,1,16.22,5h0A6.4,6.4,0,0,1,21,9.54a6.41,6.41,0,0,1,1.77-.25,6.15,6.15,0,0,1,4.34,1.77,5,5,0,0,1,.79.93,6.28,6.28,0,0,1,2.58-.56h.12a6.31,6.31,0,0,1,6,5.08C36.65,16.7,36.67,16.92,36.69,17.16Z"/><ellipse class="cls-4" cx="38.89" cy="26.94" rx="1.44" ry="2.83" transform="translate(-7.31 37.1) rotate(-47.12)"/><ellipse class="cls-4" cx="41.8" cy="31.37" rx="0.86" ry="1.7" transform="translate(-9.34 20.6) rotate(-25)"/></g><g id="Line"><path class="cls-5" d="M45.62,34.51a13.51,13.51,0,0,1-2.83,8.3,5.86,5.86,0,0,0-1-.35l-.33-.09h0a6.28,6.28,0,0,0-1.38-.15A6.39,6.39,0,0,0,35.7,44a6.27,6.27,0,0,0-2,4,12.54,12.54,0,0,1-1.75.12,13.61,13.61,0,0,1-4.87-26.33h7.26a1.49,1.49,0,0,0,1.11-.45A13.63,13.63,0,0,1,45.62,34.51Z"/><path class="cls-5" d="M16.68,27.51a.61.61,0,0,1-.15.3,8.56,8.56,0,0,0-1.33,3.74,8.29,8.29,0,0,0,0,4,.63.63,0,0,1-.22.72.62.62,0,0,1-.75,0L7.73,30.77a.62.62,0,0,1,.18-1.05l8-2.89a.62.62,0,0,1,.72.23A.61.61,0,0,1,16.68,27.51Z"/><path class="cls-5" d="M15.76,39a.62.62,0,0,1,.09.32A8.29,8.29,0,0,0,17.23,43a8.31,8.31,0,0,0,2.53,3.06.62.62,0,0,1,.3.69.61.61,0,0,1-.59.46H11a.6.6,0,0,1-.53-.3.62.62,0,0,1,0-.62L14.7,39a.62.62,0,0,1,.7-.28A.57.57,0,0,1,15.76,39Z"/><path class="cls-5" d="M26.16,50.53a8.3,8.3,0,0,1-3.44-2,.67.67,0,0,0-.28-.19.63.63,0,0,0-.45,0,.61.61,0,0,0-.36.66L23.1,57.4a.59.59,0,0,0,.4.46.58.58,0,0,0,.59-.1l3.2-2.68v0a5.76,5.76,0,0,1,.12-1.18,7.15,7.15,0,0,1,.47-1.51,5.72,5.72,0,0,1,.71-1.16A12.06,12.06,0,0,1,26.16,50.53Z"/><path class="cls-5" d="M53.53,46.32,49.28,39a.6.6,0,0,0-.69-.28.61.61,0,0,0-.44.6A8.45,8.45,0,0,1,46.76,43a13.23,13.23,0,0,1-1.36,2,6.25,6.25,0,0,1,.67,1.28,4,4,0,0,1,.22.61,6.42,6.42,0,0,1,1.77-.26,6.11,6.11,0,0,1,2.66.61H53a.66.66,0,0,0,.54-.3A.65.65,0,0,0,53.53,46.32Z"/><path class="cls-5" d="M48.78,35.85a.57.57,0,0,1,0-.34,8.4,8.4,0,0,0,0-4,8.48,8.48,0,0,0-1.33-3.74.63.63,0,0,1-.05-.75.6.6,0,0,1,.71-.23l8,2.89a.6.6,0,0,1,.39.47.62.62,0,0,1-.2.58l-6.49,5.44a.63.63,0,0,1-.76,0A.65.65,0,0,1,48.78,35.85Z"/><path class="cls-5" d="M45.72,24.74a.52.52,0,0,1-.19-.27,8.33,8.33,0,0,0-2.58-3,8.21,8.21,0,0,0-3.42-2,.62.62,0,0,1-.51-.55.59.59,0,0,1,.39-.63l8-2.9a.62.62,0,0,1,.6.11.6.6,0,0,1,.21.57l-1.47,8.34a.62.62,0,0,1-.56.51A.6.6,0,0,1,45.72,24.74Z"/><path class="cls-5" d="M61,58.43h0a1.6,1.6,0,0,1-1.34.71h-30a1.6,1.6,0,0,1-1.37-.75,6.58,6.58,0,0,1-.94-2.89c0-.13,0-.28,0-.42v0a5.76,5.76,0,0,1,.12-1.18,7.15,7.15,0,0,1,.47-1.51,5.72,5.72,0,0,1,.71-1.16,6.21,6.21,0,0,1,2.23-1.87,6.34,6.34,0,0,1,2.88-.69,4.21,4.21,0,0,1,0-.62,6.27,6.27,0,0,1,2-4,6.39,6.39,0,0,1,4.41-1.76,6.28,6.28,0,0,1,1.38.15h0l.33.09a5.86,5.86,0,0,1,1,.35,6.28,6.28,0,0,1,2,1.38,7.29,7.29,0,0,1,.66.81,6.25,6.25,0,0,1,.67,1.28,4,4,0,0,1,.22.61,6.42,6.42,0,0,1,1.77-.26,6.11,6.11,0,0,1,2.66.61,6,6,0,0,1,1.68,1.17,4.74,4.74,0,0,1,.79.93,6.11,6.11,0,0,1,2.57-.56,6.26,6.26,0,0,1,6.15,5.07A6.91,6.91,0,0,1,61,58.43Z"/><path class="cls-5" d="M36.69,17.16a7.94,7.94,0,0,1,0,.84,6,6,0,0,1-.6,2.42,3.48,3.48,0,0,1-.35.66.39.39,0,0,1-.08.1.61.61,0,0,1-.16.16,1.49,1.49,0,0,1-1.11.45h-30A1.6,1.6,0,0,1,3,21a6.42,6.42,0,0,1-1-3.36,5,5,0,0,1,.12-1.17,6.37,6.37,0,0,1,6.28-5.24A6.42,6.42,0,0,1,16.22,5h0A6.4,6.4,0,0,1,21,9.54a6.41,6.41,0,0,1,1.77-.25,6.15,6.15,0,0,1,4.34,1.77,5,5,0,0,1,.79.93,6.28,6.28,0,0,1,2.58-.56h.12a6.31,6.31,0,0,1,6,5.08C36.65,16.7,36.67,16.92,36.69,17.16Z"/><ellipse class="cls-6" cx="38.89" cy="26.94" rx="1.44" ry="2.83" transform="translate(-7.31 37.1) rotate(-47.12)"/><ellipse class="cls-6" cx="41.8" cy="31.37" rx="0.86" ry="1.7" transform="translate(-9.34 20.6) rotate(-25)"/></g><g id="Shadow" class="cls-7"><path d="M20.71,26.88l.16-.05a3.28,3.28,0,0,0-1.23,1c-.41.58-.32.88-.69,2.75-.1.49-.33,1.57-.54,3a3.15,3.15,0,0,0,0,.94,3.23,3.23,0,0,0,.84,1.7l-.78-.66a13.47,13.47,0,0,0,.93,4L19.7,39c-.31.27-.36.46-.34.59a1.59,1.59,0,0,0,.15.38L20,41a6.51,6.51,0,0,0,2.21,2,7.3,7.3,0,0,1,2.09,2.72A13.47,13.47,0,0,0,32,48.12,12.54,12.54,0,0,0,33.74,48a4.21,4.21,0,0,0,0,.62,6.34,6.34,0,0,0-2.88.69,6.07,6.07,0,0,0-1,.65c.24.21.54.42.74.33s.07-.61.28-1c.46-.82,2.3-.25,2.48-.65s-2.9-1.92-5.38-4.34c-.83-.81-4.44-4.51-4.55-9.81A13.27,13.27,0,0,1,24,30.3a13.62,13.62,0,0,1,8.08-8.51h-5A13.69,13.69,0,0,0,20.71,26.88Z"/><path d="M7.52,30.19a.7.7,0,0,0,0,.32.61.61,0,0,0,.19.26l6.48,5.44a.62.62,0,0,0,.75,0,.63.63,0,0,0,.22-.72,6.94,6.94,0,0,1-.13-2.81l-2.32-1.94L9.6,28.65C8.37,29.31,7.55,29.93,7.52,30.19Z"/><path d="M32.86,11.92l0,.07L33,12Z"/><path d="M14.7,39l-4.23,7.33a.62.62,0,0,0,0,.62.6.6,0,0,0,.53.3h5a2.09,2.09,0,0,0-.53-.3,2.9,2.9,0,0,0-2.42.3l3.16-6.36h0a11.63,11.63,0,0,1-.36-1.57.67.67,0,0,0,0-.25l0-.07C15.7,38.88,15.26,38.87,14.7,39Z"/><path d="M22.72,48.57a.67.67,0,0,0-.28-.19.54.54,0,0,0-.45,0,.61.61,0,0,0-.36.66L23.1,57.4a.59.59,0,0,0,.4.46.58.58,0,0,0,.59-.1l3.2-2.68c0,.14,0,.29,0,.42a6.58,6.58,0,0,0,.94,2.89,1.6,1.6,0,0,0,1.37.75h5a1.6,1.6,0,0,1-1.37-.75,5.67,5.67,0,0,1-.94-2.89,23.34,23.34,0,0,1,1-6.84,5.39,5.39,0,0,0-4.21,9.1.65.65,0,0,1-.59.1.59.59,0,0,1-.4-.46l-1.16-6.61c-.25-.07-.5-.16-.78-.26A8.3,8.3,0,0,1,22.72,48.57Z"/><path d="M4.35,21.79h5A1.6,1.6,0,0,1,8,21a6.42,6.42,0,0,1-1-3.36,5,5,0,0,1,.12-1.17,6.37,6.37,0,0,1,6.28-5.24,6.37,6.37,0,0,1,2-4.65,6.2,6.2,0,0,1,1.89-1.24A7.07,7.07,0,0,0,16.22,5h0a6.43,6.43,0,0,0-7.8,6.26,6.37,6.37,0,0,0-6.28,5.24A5,5,0,0,0,2,17.68,6.42,6.42,0,0,0,3,21,1.6,1.6,0,0,0,4.35,21.79Z"/></g><g id="Highligth" class="cls-8"><path class="cls-9" d="M53.53,46.94a.65.65,0,0,0,0-.62L49.28,39a.6.6,0,0,0-.69-.28.61.61,0,0,0-.44.6A8.45,8.45,0,0,1,46.76,43l-.07.12,1.84,3.17a.65.65,0,0,1,0,.62.54.54,0,0,1-.16.14,4.94,4.94,0,0,1,3.34,1.78,6.63,6.63,0,0,1,1.42.4,5.45,5.45,0,0,0-.73-.85,6,6,0,0,0-1.68-1.17H53A.66.66,0,0,0,53.53,46.94Z"/><path class="cls-9" d="M48.94,32.71a7.12,7.12,0,0,1-.12,2.8.57.57,0,0,0,0,.34.65.65,0,0,0,.24.39.63.63,0,0,0,.76,0l6.49-5.44a.62.62,0,0,0,.2-.58.6.6,0,0,0-.39-.47Z"/><path class="cls-9" d="M55.76,48.78a6.3,6.3,0,0,0-2.51.53,6.27,6.27,0,0,1,3.66,4.54,6.91,6.91,0,0,1-.9,4.58h0a1.6,1.6,0,0,1-1.34.71h5A1.6,1.6,0,0,0,61,58.43h0a6.91,6.91,0,0,0,.9-4.58A6.26,6.26,0,0,0,55.76,48.78Z"/><path class="cls-9" d="M43.51,21.82c-.44-.32-.55-.38-.56-.37s2.5,2.78,2.58,3a.52.52,0,0,0,.19.27.6.6,0,0,0,.43.15.62.62,0,0,0,.56-.51L48.18,16a.6.6,0,0,0-.21-.57.62.62,0,0,0-.6-.11L45.52,16Z"/><path class="cls-9" d="M31.08,20.42a3.48,3.48,0,0,1-.35.66.39.39,0,0,1-.08.1.61.61,0,0,1-.16.16,13.6,13.6,0,0,1,8.05,20.38,3.88,3.88,0,0,1,1.72.14,6.58,6.58,0,0,1,1.7.81c1.87-1.47,2.15-2.12,2-2.45a1,1,0,0,1-.11-.54,1.17,1.17,0,0,1,.4-.69l.35.6a13.69,13.69,0,0,0,.95-4.05l-.8.67s.69.33.68.34a.94.94,0,0,1-.68-.34c-.28-.43.27-1,.5-1.77.37-1.2-.61-1.35-.73-3.38a8.73,8.73,0,0,0-.35-2.59,1.77,1.77,0,0,0-.3-.58c-.55-.68-1.51-.66-1.49-.83s.36-.2.71-.23l.15.05a13.47,13.47,0,0,0-1.79-2.13.55.55,0,0,1-.33.14.6.6,0,0,1-.43-.15.52.52,0,0,1-.19-.27,4.85,4.85,0,0,0-.65-1,13.55,13.55,0,0,0-4.39-2.08.61.61,0,0,0,.16-.16.39.39,0,0,0,.08-.1,3.48,3.48,0,0,0,.35-.66c0-.08.07-.16.11-.25l-.11.25s.37-1,.37-1l.24-2a2.43,2.43,0,0,1,0-.27c0-.24,0-.46-.06-.65a6.31,6.31,0,0,0-6-5.08h-.12A6.15,6.15,0,0,0,28,12a5.92,5.92,0,0,1,1.05.57,6.2,6.2,0,0,1,2.61,4c0,.19,0,.41.06.65a7.94,7.94,0,0,1,0,.84A6,6,0,0,1,31.08,20.42Z"/></g></g></g></svg>';
    } else if (50 < cloudcover && cloudcover < 75) {
        icon =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-1{isolation:isolate;}.cls-2{fill:#fb0;}.cls-3,.cls-6{fill:none;}.cls-4{fill:#e2e2e2;}.cls-5,.cls-9{fill:#fff;}.cls-6{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.cls-7{opacity:0.25;mix-blend-mode:multiply;}.cls-8,.cls-9{mix-blend-mode:overlay;}</style></defs><title>Icon Color</title><g class="cls-1"><g id="Layer_1" data-name="Layer 1"><g id="Vector"><path class="cls-2" d="M48.7,29.29a11.27,11.27,0,0,1-3.1,7.78A10.8,10.8,0,0,0,38,34a11,11,0,0,0-3.1.44,11.22,11.22,0,0,0-8.4-7.92h0A11.28,11.28,0,0,1,48.7,29.29Z"/><line class="cls-3" x1="48.71" y1="18.01" x2="52.38" y2="14.33"/><path class="cls-4" d="M60.68,54.62s0,0,0,0a2.79,2.79,0,0,1-2.36,1.23H5.7a2.81,2.81,0,0,1-2.41-1.31,11.22,11.22,0,0,1-1.66-5.88,10.84,10.84,0,0,1,.19-2.07,11.2,11.2,0,0,1,11-9.17A11.24,11.24,0,0,1,24.07,26.21a10.69,10.69,0,0,1,2.42.27h0a11.22,11.22,0,0,1,8.4,7.92A11,11,0,0,1,38,34a10.8,10.8,0,0,1,7.61,3.1A9.82,9.82,0,0,1,47,38.69,11,11,0,0,1,62.25,46.6,12,12,0,0,1,60.68,54.62Z"/><line class="cls-3" x1="26.13" y1="18.01" x2="22.46" y2="14.33"/><path class="cls-3" d="M25.53,30.19a5.6,5.6,0,0,1,5.16,5.73"/><path class="cls-3" d="M34.25,38.17s6.38-3.47,9.66,3.28"/><ellipse class="cls-5" cx="41.23" cy="22.21" rx="0.93" ry="2.12" transform="translate(2.7 48.83) rotate(-62.95)"/><ellipse class="cls-5" cx="44.14" cy="24.86" rx="0.6" ry="1.37" transform="translate(-6.38 28.63) rotate(-33.66)"/></g><g id="Line"><path class="cls-6" d="M48.7,29.29a11.27,11.27,0,0,1-3.1,7.78A10.8,10.8,0,0,0,38,34a11,11,0,0,0-3.1.44,11.22,11.22,0,0,0-8.4-7.92h0A11.28,11.28,0,0,1,48.7,29.29Z"/><line class="cls-6" x1="37.42" y1="13.33" x2="37.42" y2="8.14"/><line class="cls-6" x1="53.38" y1="29.29" x2="58.57" y2="29.29"/><line class="cls-6" x1="48.71" y1="18.01" x2="52.38" y2="14.33"/><path class="cls-6" d="M60.68,54.62s0,0,0,0a2.79,2.79,0,0,1-2.36,1.23H5.7a2.81,2.81,0,0,1-2.41-1.31,11.22,11.22,0,0,1-1.66-5.88,10.84,10.84,0,0,1,.19-2.07,11.2,11.2,0,0,1,11-9.17A11.24,11.24,0,0,1,24.07,26.21a10.69,10.69,0,0,1,2.42.27h0a11.22,11.22,0,0,1,8.4,7.92A11,11,0,0,1,38,34a10.8,10.8,0,0,1,7.61,3.1A9.82,9.82,0,0,1,47,38.69,11,11,0,0,1,62.25,46.6,12,12,0,0,1,60.68,54.62Z"/><line class="cls-6" x1="26.13" y1="18.01" x2="22.46" y2="14.33"/><path class="cls-6" d="M25.53,30.19a5.6,5.6,0,0,1,5.16,5.73"/><path class="cls-6" d="M34.25,38.17s6.38-3.47,9.66,3.28"/><ellipse class="cls-3" cx="41.23" cy="22.21" rx="0.93" ry="2.12" transform="translate(2.7 48.83) rotate(-62.95)"/><ellipse class="cls-3" cx="44.14" cy="24.86" rx="0.6" ry="1.37" transform="translate(-6.38 28.63) rotate(-33.66)"/></g><g id="Shadow" class="cls-7"><path d="M5.7,55.86h5a2.81,2.81,0,0,1-2.41-1.31,11.23,11.23,0,0,1-1.67-5.88,10.84,10.84,0,0,1,.2-2.07,11.2,11.2,0,0,1,11-9.17A11.24,11.24,0,0,1,29.07,26.21a10.69,10.69,0,0,1,2.42.27,11.3,11.3,0,0,1,8.43-8.18,10.83,10.83,0,0,0-2.5-.29,11.29,11.29,0,0,0-10.93,8.47,10.69,10.69,0,0,0-2.42-.27A11.24,11.24,0,0,0,12.84,37.43a11.2,11.2,0,0,0-11,9.17,10.84,10.84,0,0,0-.2,2.07,11.23,11.23,0,0,0,1.67,5.88A2.81,2.81,0,0,0,5.7,55.86Z"/><path d="M54,38a11.31,11.31,0,0,0-2.49-.29h-.26a9.78,9.78,0,0,1,.75.95A11.74,11.74,0,0,1,54,38Z"/></g><g id="Highligth" class="cls-8"><path class="cls-9" d="M43.7,29.29a11.31,11.31,0,0,1-1.64,5.85,3.81,3.81,0,0,1,1.33.75,4.1,4.1,0,0,1,.94.92l.3.32a5.24,5.24,0,0,1,1.09.65c.17,0,.35,0,.52,0a8.07,8.07,0,0,0-.64-.67A11.29,11.29,0,0,0,37.42,18a10.89,10.89,0,0,0-2.5.29A11.26,11.26,0,0,1,43.7,29.29Z"/><path class="cls-9" d="M57.25,46.6a12,12,0,0,1-1.57,8s0,0,0,0a2.79,2.79,0,0,1-2.36,1.23h5a2.79,2.79,0,0,0,2.36-1.23s0,0,0,0a12,12,0,0,0,1.57-8A11,11,0,0,0,49,38,11,11,0,0,1,57.25,46.6Z"/></g></g></g></svg>';
    } else if (cloudcover > 75 && precip < 10) {
        icon =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-1{isolation:isolate;}.cls-2{fill:#e2e2e2;}.cls-3,.cls-4{fill:none;}.cls-4{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.cls-5{opacity:0.25;mix-blend-mode:multiply;}.cls-6,.cls-7{mix-blend-mode:overlay;}.cls-7{fill:#fff;}</style></defs><title>Icon Color</title><g class="cls-1"><g id="Layer_1" data-name="Layer 1"><g id="Vector"><path class="cls-2" d="M60.68,45.58s0,0,0,0a2.79,2.79,0,0,1-2.36,1.23H5.7a2.82,2.82,0,0,1-2.41-1.3,11.26,11.26,0,0,1-1.66-5.89,10.84,10.84,0,0,1,.19-2.07,11.2,11.2,0,0,1,11-9.17A11.24,11.24,0,0,1,24.07,17.18a10.69,10.69,0,0,1,2.42.26h0a11.22,11.22,0,0,1,8.4,7.92,11,11,0,0,1,3.1-.44A10.84,10.84,0,0,1,45.6,28,9.5,9.5,0,0,1,47,29.66a11,11,0,0,1,15.26,7.9A12,12,0,0,1,60.68,45.58Z"/><path class="cls-3" d="M25.53,21.16a5.6,5.6,0,0,1,5.16,5.72"/><path class="cls-3" d="M34.25,29.13s6.38-3.47,9.66,3.28"/></g><g id="Line"><path class="cls-4" d="M60.68,45.58s0,0,0,0a2.79,2.79,0,0,1-2.36,1.23H5.7a2.82,2.82,0,0,1-2.41-1.3,11.26,11.26,0,0,1-1.66-5.89,10.84,10.84,0,0,1,.19-2.07,11.2,11.2,0,0,1,11-9.17A11.24,11.24,0,0,1,24.07,17.18a10.69,10.69,0,0,1,2.42.26h0a11.22,11.22,0,0,1,8.4,7.92,11,11,0,0,1,3.1-.44A10.84,10.84,0,0,1,45.6,28,9.5,9.5,0,0,1,47,29.66a11,11,0,0,1,15.26,7.9A12,12,0,0,1,60.68,45.58Z"/><path class="cls-4" d="M25.53,21.16a5.6,5.6,0,0,1,5.16,5.72"/><path class="cls-4" d="M34.25,29.13s6.38-3.47,9.66,3.28"/></g><g id="Shadow" class="cls-5"><path d="M8.29,45.52a11.26,11.26,0,0,1-1.66-5.89,10.84,10.84,0,0,1,.19-2.07,11.2,11.2,0,0,1,11-9.17,11.24,11.24,0,0,1,8.71-10.92l-.06,0h0a10.69,10.69,0,0,0-2.42-.26A11.24,11.24,0,0,0,12.84,28.39a11.2,11.2,0,0,0-11,9.17,10.84,10.84,0,0,0-.19,2.07,11.26,11.26,0,0,0,1.66,5.89,2.82,2.82,0,0,0,2.41,1.3h5A2.82,2.82,0,0,1,8.29,45.52Z"/></g><g id="Highligth" class="cls-6"><path class="cls-7" d="M51.5,28.69A10.85,10.85,0,0,0,49,29a10.92,10.92,0,0,1,8.26,8.57,12,12,0,0,1-1.57,8s0,0,0,0a2.79,2.79,0,0,1-2.36,1.23h5a2.79,2.79,0,0,0,2.36-1.23s0,0,0,0a12,12,0,0,0,1.57-8A10.94,10.94,0,0,0,51.5,28.69Z"/></g></g></g></svg>';
    } else if (cloudcover > 75 && precip > 10) {
        icon =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><style>.cls-1{isolation:isolate;}.cls-2{fill:#cecece;}.cls-3,.cls-5{fill:none;}.cls-4{fill:#0095e8;}.cls-5{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.cls-6{opacity:0.25;mix-blend-mode:multiply;}.cls-7,.cls-8{mix-blend-mode:overlay;}.cls-8{fill:#fff;}</style></defs><title>Icon Color</title><g class="cls-1"><g id="Layer_1" data-name="Layer 1"><g id="Vector"><path class="cls-2" d="M60.68,32.69s0,0,0,0a2.78,2.78,0,0,1-2.36,1.24H5.7a2.83,2.83,0,0,1-2.41-1.31,11.26,11.26,0,0,1-1.66-5.89,10.74,10.74,0,0,1,.19-2.06,11.2,11.2,0,0,1,11-9.18A11.24,11.24,0,0,1,24.07,4.29a11.29,11.29,0,0,1,2.42.26h0a11.22,11.22,0,0,1,8.4,7.92A11,11,0,0,1,38,12a10.84,10.84,0,0,1,7.61,3.1A10.32,10.32,0,0,1,47,16.77a11,11,0,0,1,15.26,7.91A12,12,0,0,1,60.68,32.69Z"/><path class="cls-3" d="M25.53,8.27A5.6,5.6,0,0,1,30.69,14"/><path class="cls-3" d="M34.25,16.24s6.38-3.47,9.66,3.28"/><path class="cls-4" d="M19.47,56.89a3.29,3.29,0,0,1-3.71,2.76,3.29,3.29,0,0,1-2.18-4.07c.42-1.89,4.24-5.19,4.24-5.19S19.89,55,19.47,56.89Z"/><path class="cls-4" d="M22.48,45.23A3.28,3.28,0,0,1,18.78,48a3.29,3.29,0,0,1-2.18-4.08c.42-1.88,4.24-5.19,4.24-5.19S22.9,43.34,22.48,45.23Z"/><path class="cls-4" d="M33.89,56.89a3.29,3.29,0,0,1-3.7,2.76A3.28,3.28,0,0,1,28,55.58c.42-1.89,4.24-5.19,4.24-5.19S34.31,55,33.89,56.89Z"/><path class="cls-4" d="M36.91,45.23A3.29,3.29,0,0,1,33.21,48,3.29,3.29,0,0,1,31,43.92c.42-1.88,4.25-5.19,4.25-5.19S37.33,43.34,36.91,45.23Z"/><path class="cls-4" d="M47.44,56.89a3.29,3.29,0,0,1-3.7,2.76,3.28,3.28,0,0,1-2.18-4.07c.42-1.89,4.24-5.19,4.24-5.19S47.86,55,47.44,56.89Z"/><path class="cls-4" d="M50.46,45.23A3.29,3.29,0,0,1,46.76,48a3.3,3.3,0,0,1-2.19-4.08c.42-1.88,4.25-5.19,4.25-5.19S50.88,43.34,50.46,45.23Z"/></g><g id="Line"><path class="cls-5" d="M60.68,32.69s0,0,0,0a2.78,2.78,0,0,1-2.36,1.24H5.7a2.83,2.83,0,0,1-2.41-1.31,11.26,11.26,0,0,1-1.66-5.89,10.74,10.74,0,0,1,.19-2.06,11.2,11.2,0,0,1,11-9.18A11.24,11.24,0,0,1,24.07,4.29a11.29,11.29,0,0,1,2.42.26h0a11.22,11.22,0,0,1,8.4,7.92A11,11,0,0,1,38,12a10.84,10.84,0,0,1,7.61,3.1A10.32,10.32,0,0,1,47,16.77a11,11,0,0,1,15.26,7.91A12,12,0,0,1,60.68,32.69Z"/><path class="cls-5" d="M25.53,8.27A5.6,5.6,0,0,1,30.69,14"/><path class="cls-5" d="M34.25,16.24s6.38-3.47,9.66,3.28"/><path class="cls-5" d="M19.47,56.89a3.29,3.29,0,0,1-3.71,2.76,3.29,3.29,0,0,1-2.18-4.07c.42-1.89,4.24-5.19,4.24-5.19S19.89,55,19.47,56.89Z"/><path class="cls-5" d="M22.48,45.23A3.28,3.28,0,0,1,18.78,48a3.29,3.29,0,0,1-2.18-4.08c.42-1.88,4.24-5.19,4.24-5.19S22.9,43.34,22.48,45.23Z"/><path class="cls-5" d="M33.89,56.89a3.29,3.29,0,0,1-3.7,2.76A3.28,3.28,0,0,1,28,55.58c.42-1.89,4.24-5.19,4.24-5.19S34.31,55,33.89,56.89Z"/><path class="cls-5" d="M36.91,45.23A3.29,3.29,0,0,1,33.21,48,3.29,3.29,0,0,1,31,43.92c.42-1.88,4.25-5.19,4.25-5.19S37.33,43.34,36.91,45.23Z"/><path class="cls-5" d="M47.44,56.89a3.29,3.29,0,0,1-3.7,2.76,3.28,3.28,0,0,1-2.18-4.07c.42-1.89,4.24-5.19,4.24-5.19S47.86,55,47.44,56.89Z"/><path class="cls-5" d="M50.46,45.23A3.29,3.29,0,0,1,46.76,48a3.3,3.3,0,0,1-2.19-4.08c.42-1.88,4.25-5.19,4.25-5.19S50.88,43.34,50.46,45.23Z"/></g><g id="Shadow" class="cls-6"><path d="M19.71,39.78c-1.16,1.13-2.84,2.92-3.11,4.14A3.29,3.29,0,0,0,18.78,48a2.43,2.43,0,0,0,.93,0Z"/><path d="M16.29,51.84c-1.12,1.12-2.47,2.66-2.71,3.74a3.29,3.29,0,0,0,2.18,4.07,2.38,2.38,0,0,0,.53.05Z"/><path d="M5.7,33.94h5a2.83,2.83,0,0,1-2.41-1.31,11.26,11.26,0,0,1-1.66-5.89,10.74,10.74,0,0,1,.19-2.06,11.2,11.2,0,0,1,11-9.18A11.24,11.24,0,0,1,26.55,4.58l-.06,0h0a11.29,11.29,0,0,0-2.42-.26A11.24,11.24,0,0,0,12.84,15.5a11.2,11.2,0,0,0-11,9.18,10.74,10.74,0,0,0-.19,2.06,11.26,11.26,0,0,0,1.66,5.89A2.83,2.83,0,0,0,5.7,33.94Z"/></g><g id="Highligth" class="cls-7"><path class="cls-8" d="M45.8,50.39s-.89.77-1.86,1.78h1.17v7.41a3.58,3.58,0,0,0,2.33-2.69C47.86,55,45.8,50.39,45.8,50.39Z"/><path class="cls-8" d="M48.82,38.73s-.34.29-.82.75V48a3.57,3.57,0,0,0,2.46-2.74C50.88,43.34,48.82,38.73,48.82,38.73Z"/><path class="cls-8" d="M51.5,15.8a10.85,10.85,0,0,0-2.51.3,10.92,10.92,0,0,1,8.26,8.58,12,12,0,0,1-1.57,8s0,0,0,0a2.78,2.78,0,0,1-2.36,1.24h5a2.78,2.78,0,0,0,2.36-1.24s0,0,0,0a12,12,0,0,0,1.57-8A10.94,10.94,0,0,0,51.5,15.8Z"/></g></g></g></svg>';
    }

    if (cloudcover < 33) {
        img = 'sunny.jpg';
    } else if (cloudcover < 33 && cloudcover < 66) {
        img = 'suncloudy.jpg';
    } else if (cloudcover > 66) {
        img = 'cloudy.jpg';
    }

    return [icon, img];
}

document
    .getElementById('weatherForm')
    .addEventListener('submit', async function (event) {
        event.preventDefault();

        let location = document.getElementById('location').value;
        let unitInput = document.getElementById('unit-select').value;
        let unit = '';

        if (unitInput === 'C') {
            unit = 'metric';
        } else if (unitInput === 'F') {
            unit = 'us';
        }

        let apiData = await getApiData(location, unit);
        let data = await filterData(apiData);

        let [icon, img] = getIconAndBgImg(data.cloudcover, data.precip);

        displayWeather(data, data.location, unitInput, icon, img);
    });
