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
// var infoData = []
// if(sessionStorage.getItem("infoData") !=null){
//     infoData = JSON.parse(sessionStorage.getItem("infoData"));
//     console.log(infoData);
// }
            // infoData.push(data)
            // sessionStorage.setItem("infoData", JSON.stringify(infoData))


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

    console.log(weatherData);
})