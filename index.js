const locationButton = document.getElementById("formSubmit");

locationButton.addEventListener('click', e =>{
    const weatherField = document.querySelector('.weatherInformation');
    e.preventDefault();
    locationButton.value = '';
    weatherField.innerHTML = '';
    getWeather();
    console.log("Button Clicked");
});

async function getWeather(){
    const locationName = document.getElementById("locationInput").value;
    const response = await fetch("http://api.weatherapi.com/v1/current.json?key= f2b1547cc854421da5e111905231504&q="+locationName+"&aqi=no");
    const data = await response.json();
    console.log(data);
    displayWeatherInfo(data);
}

function displayWeatherInfo(data){
    const weatherField = document.querySelector('.weatherInformation');
    const header = document.createElement('h2');
    const tempF = document.createElement('p');
    const humidity = document.createElement('p');
    const winds = document.createElement('p');
    const skys = document.createElement('p');
    header.innerText = data.location.name+", "+data.location.region;
    skys.innerText = data.current.condition.text;
    tempF.innerText = "Current: "+data.current.temp_f+ " \u00B0F" +" / "+data.current.temp_c+ " \u00B0C";
    humidity.innerText = "Humidity: " + data.current.humidity+"%";
    winds.innerText = "Wind: " + data.current.wind_mph+" mph" + " / " + data.current.wind_kph+" kph";

    weatherField.appendChild(header);
    weatherField.appendChild(skys);
    weatherField.appendChild(tempF);
    weatherField.appendChild(humidity);
    weatherField.appendChild(winds);
}

function fieldEmpty(div){
    if(div.innerHTML === ""){
        
    }
}