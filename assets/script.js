var menuBTN = document.querySelector(".menu-toggle");
var menuContent = document.querySelector(".menu");
menuBTN.addEventListener("click", function () {
    menuContent.classList.toggle("open");
})


// API Key: 787f5ac38c8d46be95d133218240512

var keyAPI = "787f5ac38c8d46be95d133218240512";
var url = "https://api.weatherapi.com/v1/forecast.json";

var search = document.getElementById("search");
var submitbtn = document.getElementById("submit");
// submitbtn.addEventListener("click", function () {
//     var city = search.value;
//     if (!search.value) {
//         city = "Mansoura"
//     } else {
//         city = search.value;
//     }
//     fetch(`${url}?key=${keyAPI}&q=${city}&days=3&aqi=no&alerts=no`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("City not found");
//             }
//             return response.json();
//         })
//         .then(data => {
//             weatherData = data
//             // console.log("Data fetched:", weatherData);
//         })
//     .catch(error=> console.error(error))

//     console.log(weatherData)
// })

let weatherData;
submitbtn.addEventListener("click", async function () {
    try{
        var city = search.value;
        if (!search.value) {
            city = "Mansoura"
        } else {
            city = search.value;
        }
        var response = await fetch(`${url}?key=${keyAPI}&q=${city}&days=3&aqi=no&alerts=no`);
        if(!response.ok){
            throw new Error("City not found");
        }
    
        weatherData = await response.json()
    }catch{
        console.error(error);
    }

    // console.log(weatherData);
    // var location = weatherData.location;
    // console.log(location);
    var citName = weatherData.location.name;
    console.log(citName);
    //! start current data for first div
    var current = weatherData.current;
    var currentDayAndMonth = formatDate(current.last_updated);
    var currentTemp = current.temp_c;
    var currentCondition = current.condition.text;
    var conditionIcon = current.condition.icon;
    var windSpeed = current.wind_kph;
    var windDirction = current.wind_dir;

    var iconUrl = conditionIcon.startsWith("//")
    ? `https:${conditionIcon}`
    : conditionIcon;
    console.log(current);
    // current data for first div
    
    var forecastRow = document.getElementById("forecast");
    forecastRow.innerHTML = "";

    var today = document.createElement("div");
    today.classList.add("col-md-4", "p-0");
    today.innerHTML = 
    `
    <div class="today forecast">
        <div class="forecast-header d-flex justify-content-between">
            <div class="day">${currentDayAndMonth[0]}</div>
            <div class=" date">${currentDayAndMonth[1]}${currentDayAndMonth[2]} ${currentDayAndMonth[3]}</div>
        </div> 

        <div class="forecast-content">
            <div class="location">${citName}</div>
            <div class="degree">
                <div class="num">${currentTemp}°C</div>
        
                <div class="forecast-icon">
                    <img src="${iconUrl}" alt="conditionIcon" width="90">
                </div>
        
            </div>
            <div class="custom">${currentCondition}</div>
        </div>

        <footer>
            <span><i class="fa-solid fa-umbrella"></i>20%</span>
            <span><i class="fa-solid fa-wind"></i>${windSpeed}km/h</span>
            <span><i class="fa-solid fa-compass"></i>${windDirction}</span>
        </footer>
    </div>
    `
    //! end current data for first div

    forecastRow.appendChild(today);
    
    //! start forecast data for two and three div
    var forecastData = weatherData.forecast.forecastday; 
    for (i = 1; i < forecastData.length; i++) {
        var nameDayAndMonth = formatDate(forecastData[i].date);
        var maxtemp = forecastData[i].day.maxtemp_c;
        var mintemp = forecastData[i].day.mintemp_c;
        var condition = forecastData[i].day.condition.text;
        var forecastIcon = forecastData[i].day.condition.icon;
        console.log(nameDayAndMonth[0]);

        var forecastIconUrl = forecastIcon.startsWith("//")
            ? `https:${forecastIcon}`
            : forecastIcon;

        var forecastDay = document.createElement("div");
        forecastDay.classList.add("col-md-4", "p-0");
        forecastDay.innerHTML =
            `
            <div class="today forecast">
                <div class="forecast-header d-flex justify-content-between">
                    <div class="day">${nameDayAndMonth[0]}</div>
                </div> 

                <div class="forecast-content">
                    <div class="degree">
                        <div class="num">
                            <p>${maxtemp}°C</p>
                            <p>${mintemp}°C</p>
                        </div>
        
                        <div class="forecast-icon">
                            <img src="${forecastIconUrl}" alt="conditionIcon" width="90">
                        </div>
        
                    </div>
                    <div class="custom">${condition}</div>
                </div>
            </div>
            `
        forecastRow.appendChild(forecastDay);
        //! end forecast data for two and three div
    }

})

function formatDate(dateString) {
    var date = new Date(dateString);
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var dayName = days[date.getDay()];
    var day = date.getDate();
    var month = months[date.getMonth()];

    let ordinal;
    if (day % 10 === 1 && day !== 11) {
        ordinal = "st";
    } else if (day % 10 === 2 && day !== 12) {
        ordinal = "nd";
    } else if (day % 10 === 3 && day !== 13) {
        ordinal = "rd";
    } else {
        ordinal = "th";
    }

    return [dayName, day, ordinal, month]
}
