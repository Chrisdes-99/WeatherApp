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
    const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key=f2b1547cc854421da5e111905231504&q="+locationName+"&days=1&aqi=no&alerts=no");
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


    const header = document.createElement('h2');

    const forecastTable = document.createElement('div');
    forecastTable.className = "forecastTable";

    const forecastColumn1 = document.createElement('div');
    forecastColumn1.className = 'forecastColumn1';

    const forecastColumn2 = document.createElement('div');
    forecastColumn2.className = 'forecastColumn2';

    const tempCurrent = document.createElement('h3');
    const skyImage = document.createElement('img');
    skyImage.src = data.current.condition.icon;

    const skys = document.createElement('p');
    const feelsLike = document.createElement('p');
    const humidity = document.createElement('p');
    const winds = document.createElement('p');
    const time = document.createElement('p');
    time.innerText = showTime();

    header.innerText = data.location.name+", "+data.location.region;
    skys.innerText = data.current.condition.text;

    tempCurrent.innerText = data.current.temp_f+ " \u00B0F" +" / "+data.current.temp_c+ " \u00B0C";
    feelsLike.innerText = "Feels Like: "+data.current.feelslike_f+ " \u00B0F" +" / "+data.current.feelslike_c+ " \u00B0C";

    humidity.innerText = "Humidity: " + data.current.humidity+"%";
    winds.innerText = "Wind: " + data.current.wind_mph+" mph";

    weatherField.appendChild(weatherCard);
    weatherCard.appendChild(header);

    weatherCard.appendChild(forecastTable);

    forecastTable.appendChild(forecastColumn1);
    forecastColumn1.appendChild(tempCurrent);
    forecastColumn1.appendChild(skyImage);
    forecastColumn1.appendChild(skys);


    forecastTable.appendChild(forecastColumn2);
    forecastColumn2.appendChild(feelsLike);
    forecastColumn2.appendChild(humidity);
    forecastColumn2.appendChild(winds);

    weatherCard.appendChild(time);
}

function showTime(){
    var dateString = new Date().toLocaleString("en-US", {timeZone:'America/Los_Angeles'});
    var time = dateString.replace(", ", " - ");
    return time;
}

function changeBackground(){
    const footer = document.querySelector(".footer");
    footer.style.color = "white";
}

//var city_names = ["Aberdeen", "Abilene", "Akron", "Albany", "Albuquerque", "Alexandria", "Allentown", "Amarillo", "Anaheim", "Anchorage", "Ann Arbor", "Antioch", "Apple Valley", "Appleton", "Arlington", "Arvada", "Asheville", "Athens", "Atlanta", "Atlantic City", "Augusta", "Aurora", "Austin", "Bakersfield", "Baltimore", "Barnstable", "Baton Rouge", "Beaumont", "Bel Air", "Bellevue", "Berkeley", "Bethlehem", "Billings", "Birmingham", "Bloomington", "Boise", "Boise City", "Bonita Springs", "Boston", "Boulder", "Bradenton", "Bremerton", "Bridgeport", "Brighton", "Brownsville", "Bryan", "Buffalo", "Burbank", "Burlington", "Cambridge", "Canton", "Cape Coral", "Carrollton", "Cary", "Cathedral City", "Cedar Rapids", "Champaign", "Chandler", "Charleston", "Charlotte", "Chattanooga", "Chesapeake", "Chicago", "Chula Vista", "Cincinnati", "Clarke County", "Clarksville", "Clearwater", "Cleveland", "College Station", "Colorado Springs", "Columbia", "Columbus", "Concord", "Coral Springs", "Corona", "Corpus Christi", "Costa Mesa", "Dallas", "Daly City", "Danbury", "Davenport", "Davidson County", "Dayton", "Daytona Beach", "Deltona", "Denton", "Denver", "Des Moines", "Detroit", "Downey", "Duluth", "Durham", "El Monte", "El Paso", "Elizabeth", "Elk Grove", "Elkhart", "Erie", "Escondido", "Eugene", "Evansville", "Fairfield", "Fargo", "Fayetteville", "Fitchburg", "Flint", "Fontana", "Fort Collins", "Fort Lauderdale", "Fort Smith", "Fort Walton Beach", "Fort Wayne", "Fort Worth", "Frederick", "Fremont", "Fresno", "Fullerton", "Gainesville", "Garden Grove", "Garland", "Gastonia", "Gilbert", "Glendale", "Grand Prairie", "Grand Rapids", "Grayslake", "Green Bay", "GreenBay", "Greensboro", "Greenville", "Gulfport-Biloxi", "Hagerstown", "Hampton", "Harlingen", "Harrisburg", "Hartford", "Havre de Grace", "Hayward", "Hemet", "Henderson", "Hesperia", "Hialeah", "Hickory", "High Point", "Hollywood", "Honolulu", "Houma", "Houston", "Howell", "Huntington", "Huntington Beach", "Huntsville", "Independence", "Indianapolis", "Inglewood", "Irvine", "Irving", "Jackson", "Jacksonville", "Jefferson", "Jersey City", "Johnson City", "Joliet", "Kailua", "Kalamazoo", "Kaneohe", "Kansas City", "Kennewick", "Kenosha", "Killeen", "Kissimmee", "Knoxville", "Lacey", "Lafayette", "Lake Charles", "Lakeland", "Lakewood", "Lancaster", "Lansing", "Laredo", "Las Cruces", "Las Vegas", "Layton", "Leominster", "Lewisville", "Lexington", "Lincoln", "Little Rock", "Long Beach", "Lorain", "Los Angeles", "Louisville", "Lowell", "Lubbock", "Macon", "Madison", "Manchester", "Marina", "Marysville", "McAllen", "McHenry", "Medford", "Melbourne", "Memphis", "Merced", "Mesa", "Mesquite", "Miami", "Milwaukee", "Minneapolis", "Miramar", "Mission Viejo", "Mobile", "Modesto", "Monroe", "Monterey", "Montgomery", "Moreno Valley", "Murfreesboro", "Murrieta", "Muskegon", "Myrtle Beach", "Naperville", "Naples", "Nashua", "Nashville", "New Bedford", "New Haven", "New London", "New Orleans", "New York", "New York City", "Newark", "Newburgh", "Newport News", "Norfolk", "Normal", "Norman", "North Charleston", "North Las Vegas", "North Port", "Norwalk", "Norwich", "Oakland", "Ocala", "Oceanside", "Odessa", "Ogden", "Oklahoma City", "Olathe", "Olympia", "Omaha", "Ontario", "Orange", "Orem", "Orlando", "Overland Park", "Oxnard", "Palm Bay", "Palm Springs", "Palmdale", "Panama City", "Pasadena", "Paterson", "Pembroke Pines", "Pensacola", "Peoria", "Philadelphia", "Phoenix", "Pittsburgh", "Plano", "Pomona", "Pompano Beach", "Port Arthur", "Port Orange", "Port Saint Lucie", "Port St. Lucie", "Portland", "Portsmouth", "Poughkeepsie", "Providence", "Provo", "Pueblo", "Punta Gorda", "Racine", "Raleigh", "Rancho Cucamonga", "Reading", "Redding", "Reno", "Richland", "Richmond", "Richmond County", "Riverside", "Roanoke", "Rochester", "Rockford", "Roseville", "Round Lake Beach", "Sacramento", "Saginaw", "Saint Louis", "Saint Paul", "Saint Petersburg", "Salem", "Salinas", "Salt Lake City", "San Antonio", "San Bernardino", "San Buenaventura", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Santa Barbara", "Santa Clara", "Santa Clarita", "Santa Cruz", "Santa Maria", "Santa Rosa", "Sarasota", "Savannah", "Scottsdale", "Scranton", "Seaside", "Seattle", "Sebastian", "Shreveport", "Simi Valley", "Sioux City", "Sioux Falls", "South Bend", "South Lyon", "Spartanburg", "Spokane", "Springdale", "Springfield", "St. Louis", "St. Paul", "St. Petersburg", "Stamford", "Sterling Heights", "Stockton", "Sunnyvale", "Syracuse", "Tacoma", "Tallahassee", "Tampa", "Temecula", "Tempe", "Thornton", "Thousand Oaks", "Toledo", "Topeka", "Torrance", "Trenton", "Tucson", "Tulsa", "Tuscaloosa", "Tyler", "Utica", "Vallejo", "Vancouver", "Vero Beach", "Victorville", "Virginia Beach", "Visalia", "Waco", "Warren", "Washington", "Waterbury", "Waterloo", "West Covina", "West Valley City", "Westminster", "Wichita", "Wilmington", "Winston", "Winter Haven", "Worcester", "Yakima", "Yonkers", "York", "Youngstown"];

//console.log(city_names.length);
