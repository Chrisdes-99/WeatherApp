const locationButton = document.getElementById("formSubmit");

locationButton.addEventListener('click', e =>{

    const weatherField = document.querySelector('.weatherBoard');
    const location = document.getElementById("locationInput");

    e.preventDefault();

    weatherField.innerHTML = '';
    getWeather();
    location.value = " ";

    //console.log("Button Clicked");
});

async function getWeather(){
    const locationName = document.getElementById("locationInput").value;

    try{
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key= f2b1547cc854421da5e111905231504&q="+locationName+"&aqi=no");
    const data = await response.json();

    console.log(data);
    displayWeatherInfo(data);
    changeBackground();

    }catch(error){
        console.error(error);
    }
}

function displayWeatherInfo(data){
    const weatherField = document.querySelector('.weatherBoard');

    const weatherCard = document.createElement('div');
    weatherCard.className = "weatherInformation";

    //const weatherHeader = document.querySelector('#weatherHeader');

    const header = document.createElement('h2');
    const tempF = document.createElement('p');
    const humidity = document.createElement('p');
    const winds = document.createElement('p');
    const skys = document.createElement('p');

    const skyImage = document.createElement('img');
    skyImage.src = data.current.condition.icon;

    header.innerText = data.location.name+", "+data.location.region;
    skys.innerText = data.current.condition.text;
    tempF.innerText = "Temperature: "+data.current.temp_f+ " \u00B0F" +" / "+data.current.temp_c+ " \u00B0C";
    humidity.innerText = "Humidity: " + data.current.humidity+"%";
    winds.innerText = "Wind: " + data.current.wind_mph+" mph" + " / " + data.current.wind_kph+" kph";

    weatherField.appendChild(weatherCard);

    weatherCard.appendChild(header);
    weatherCard.appendChild(skyImage);
    weatherCard.appendChild(skys);
    weatherCard.appendChild(tempF);
    weatherCard.appendChild(humidity);
    weatherCard.appendChild(winds);
}

function showTime(){

    const timeDiv = document.querySelector(".currentTime");

    var dateString = new Date().toLocaleString("en-US", {timeZone:'America/Los_Angeles'});
    var time = dateString.replace(", ", " - ");

    timeDiv.innerText = time;
}

function changeBackground(){
    const footer = document.querySelector(".footer");
    footer.style.color = "white";
}

setInterval(showTime,1000);

showTime();