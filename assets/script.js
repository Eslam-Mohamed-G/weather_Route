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
    var citName = weatherData.location.name;
    console.log(citName);
    // current data for first div.condition.wind_kph.wind_dir
    var current = weatherData.current;
    console.log(current);
    
    // forecast data for two and three div
    var forecast = weatherData.forecast.forecastday;
    var nameDayAndMonth = formatDate(weatherData.forecast.forecastday[0].date)
    console.log(nameDayAndMonth);

    var forecastRow = document.getElementById("forecast");
    forecastRow.innerHTML = "";

    var today = document.createElement("div");
    today.classList.add("col-md-4", "p-0");
    today.innerHTML = 
    `
    <div class="today forecast">
        <div class="forecast-header d-flex justify-content-between">
            <div class="day">${nameDayAndMonth[0]}</div>
            <div class=" date">${nameDayAndMonth[1]}${nameDayAndMonth[2]} ${nameDayAndMonth[3]}</div>
        </div> 

        <div class="forecast-content">
            <div class="location">${citName}</div>
            <div class="degree">
                <div class="num">21.2<sup>o</sup>C</div>
        
                <div class="forecast-icon">
                    <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" alt="" width="90">
                </div>
        
            </div>
            <div class="custom">Partly cloudy</div>
        </div>

        <footer>
            <span><img src="images/icon-umberella.png" alt="">20%</span>
            <span><img src="images/icon-wind.png" alt="">18km/h</span>
            <span><img src="images/icon-compass.png" alt="">East</span>
        </footer>
    </div>
    `
    forecastRow.appendChild(today);
})

function formatDate(dateString) {
    var date = new Date(dateString);
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var dayName = days[date.getDate()];
    var day = date.getDate();
    var month = months[date.getDate()];

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
