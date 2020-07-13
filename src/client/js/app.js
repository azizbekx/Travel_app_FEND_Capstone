/* Global Variables */
import {getGeonami,getWeather,getImage} from "./mainRequestAPI";

let locationURL = "api.geonames.org/searchJSON?q=";
let userGeonami = "&username=azizbekx";
let weatherAPI = "api.weatherbit.io/v2.0/forecast/daily?"
let weatherKey = "36ac43644a0c4b0e973d5c21841c07bf"
let imageAPI = "pixabay.com/api/";
let imageKey = "17414978-b184eb4052492f1ae7f3596d8"


const postURL = "http://localhost:4000/addData";
const getURL = "http://localhost:4000/all";

// Travel display variables
let mainAddDisplay = document.getElementById("main__display");
let addTripButton = document.getElementById("addTrip");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

// Event listener to add function to existing HTML DOM element
const submitFormTrip = async (url = '', data = {}) => {

    const cityName = document.getElementById("city").value;
    //departing value is example = 2020-07-20;
    const departing = document.getElementById("date").value;

    if(!(departing==="" && cityName==="" )){
        document.getElementById('submitForm').setAttribute('disabled', true);
        document.getElementById('removeForm').setAttribute('disabled', true);
    getGeonami(locationURL, cityName, userGeonami)
        .then(async (locationData) => {
            console.log("location Data", locationData);
            const locationCity = locationData.geonames[0].name;
            const locationCountry = locationData.geonames[0].countryName;
            const cityLat = locationData.geonames[0].lat;
            const cityLong = locationData.geonames[0].lng;
            const weather = await getWeather(weatherAPI, cityLat, cityLong, weatherKey);
            const image = await getImage(imageAPI, locationCity, imageKey);

            return {
                departing: departing,
                weather: weather,
                image: image,
                locationData: locationData
            }


        })
        .then(async function (data) {
            console.log("result all data", data)
            // msg.weather doesn't contain value
            const userData = await postData(postURL,
                {
                    weather: data.weather.data,
                    image: data.image.hits[0],
                    locationData: data.locationData.geonames[0],
                    departing: data.departing
                })
        })
        .then(function (newData) {
            updateUI();
        })

    }else {
        alert("Please Fill Input in form")
    }
}

/* Function to POST data */
const postData = async (url = "", data = {}) => {
    console.log("data app.js post route", data);
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response;
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

addTripButton.addEventListener("click", () => {
    addTripButton.setAttribute("disabled", true)
    const formTrip = `<div id="form__trip" class="container my-3">
            <div class="form-add-trip p-3  p-md-5 ">
                <div class="row d-flex flex-column flex-xl-row align-items-center justify-content-center">
                    <div class="col-12 col-xl-4 ">
                        <label for="city" class="mr-md-1 mb-0 mb-md-1">My trip to:</label>
                        <input type="text" id="city" value="" placeholder="Enter Location" required>
                    </div>
                    <div class="col-12 col-xl-4 mt-2 mt-xl-0">
                        <label for="date" class="mr-md-1 mb-0 mb-md-1">Departing:</label>
                        <input type="date" id="date" value="" required>
                    </div>
                </div>
                <div class="row d-flex justify-content-center mt-4 mt-md-5 ">
                    <button id="submitForm"
                        class="btn btn-light btn-outline-primary btn-save mr-2 mr-md-4">Submit</button>
                    <button id="removeForm" class="btn btn-light btn-outline-danger btn-remove">Remove</button>
                </div>

            </div>
        </div>`

    //add Form trip section
    mainAddDisplay.insertAdjacentHTML("afterbegin", formTrip)
    //submit Form and get data called event listener
    document.getElementById("submitForm").addEventListener('click', submitFormTrip)

    //REMOVE FORM SECTION BUTTON
    let removeFormBtn = document.getElementById("removeForm")
    let formTripSection = document.getElementById("form__trip")
    removeFormBtn.addEventListener("click", ()=>{
        formTripSection.remove();
    })

})

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch(getURL);
    try {
        //GET RESPONSE IN BACK-END
        const jsonResponse = await request.json();
        // CALCULATE DEADLINE AND COUTDOWN
        let deadlineMs = Math.abs((new Date(jsonResponse.departing)) - (new Date(newDate)));
        let deadline = Math.ceil(deadlineMs / (1000 * 60 * 60 * 24));

        // REMOVE FORM SECTION
        let formTrip = document.getElementById("form__trip")
        formTrip.remove();
        addTripButton.removeAttribute("disabled");
        // ADD LOCATION DATA IN DISPLAY
        let sectionLocation = ` <section class="location pb-md-5 mb-3 mb-md-4 mb-xl-5 mx-md-5">
        <div class="d-flex flex-md-row flex-column mt-3 ">
            <div class="location__left ml-md-3 ml-xl-5 ">
                <div class="location__image">
                
                </div>
                <div class="d-flex flex-column align-items-center align-items-md-start  ">
                    <div class="location__add-packing-list  mt-3 ml-md-4 ">
               
                        <button class="btn btn-light btn-outline-primary btn-sm px-2 mt-1">
                            <i class="fa fa-plus-circle"></i>
                           &#10133; add packing list
                        </button>
                    </div>
                    <div class="location__add-packing-list mt-2 ml-md-4">
                        
                        <button class="btn btn-light btn-outline-primary btn-sm px-2">
                            <i class="fa fa-plus-circle"></i>
                           &#10133; add lodgin info
                        </button>

                    </div>
                    <div class="location__add-packing-list mt-2 ml-md-4">
                      
                        <button class="btn btn-light btn-outline-primary btn-sm px-2">
                            <i class="fa fa-plus-circle"></i>
                           &#10133; add notes
                        </button>
                    </div>
                </div>
            </div>
            <div class=" location__right ml-md-3 ml-xl-4 mt-4 mt-md-0 px-3 pl-md-3">
                <div class="trip__info">
                    <div class="location__info border-bottom-bg ">
                        <div class="d-flex  location__name mt-md-3">
                            <h3 class="mr-md-3">My Trip to :</h3>
                            <h3 class="city-name">${jsonResponse.locationData.name}, ${jsonResponse.locationData.countryName}</h3>
                        </div>
                        <div class="d-flex location__date">
                            <h3 class="mr-md-3">Departing &#9992;:</h3>
                            <h3 class="departing">${jsonResponse.departing}</h3>
                        </div>
                    </div>
                    <div class="flight__info py-2 pr-1 pr-md-3 d-flex justify-content-between border-bottom-bg ">
                        <h4>Flight info:</h4>
                        <div class="enter__flight mr-md-3">
                            <button class="btn btn-light btn-outline-primary btn-sm px-2 my-2">
                              &#10133 add flight info
                            </button>
                            <p class="text-right  border-right border-bottom p-1">ORD 3:00PM <br>Flight 22 UDACITY AIR
                            </p>
                            <p class="text-right mt-md-1 border-right border-bottom p-1">ORD 3:00PM <br>Flight 22
                                UDACITY AIR</p>
                        </div>
                    </div>
                    <div class="days-deadline  border-bottom-bg py-2">
                        <h4 class="bg-size "><span class="city-name">${jsonResponse.locationData.name}, ${jsonResponse.locationData.countryName}</span> is <span
                                class="days-result">${deadline}</span> days away</h4>
                    </div>
                    <div class="container">
                        <div class="row weather__data">
                            
                        </div>
                    </div>
                </div>
                <div class="row d-flex justify-content-center mt-4 mb-5 mb-md-0 mt-md-4 ">
                    <button class="btn btn-light btn-outline-primary btn-save mr-2 mr-md-4">Export/Print</button>
                    <button class="btn btn-light btn-outline-danger btn-remove trip-data-remove">Remove Trip</button>
                </div>
            </div>
        </div>
    </section>`

        mainAddDisplay.insertAdjacentHTML("afterbegin", sectionLocation)
        console.log("json Response", jsonResponse)

        // REMOVE TRIP BUTTON
        document.querySelector(".trip-data-remove").addEventListener('click', () => {
            let tripData = document.querySelector(".location");
            tripData.remove();
        })
        //ADD IMAGE TRIP IN DISPLAY
        const locationImage = document.querySelector(".location__image");
        if (!(typeof jsonResponse.image === "undefined")) {
            locationImage.innerHTML = `<img class="location__img" src="${jsonResponse.image.webformatURL}" alt="location img" />`
        }
        else {
            let randomImage = `trip_${(Math.floor(Math.random() * 2) + 1)}`;
            let localImage = new Image()
            localImage.src = Client[randomImage];
            locationImage.appendChild(localImage);
        }
        //ADD WEATHER DATA IN DISPLAY
        if (deadline <= 16) {
            console.log(deadline);
            for (let i = 15 - deadline; i >= 0; i--) {
                let weatherData = `<div class="col-6 col-xl-4 weather__info border-bottom py-2">
                                <h4 class="bg-size mb-1"><span class="weather-day">${jsonResponse.weather[i].datetime}</span> weather: </h4>
                                <div class="weather-icon">
                                   
                                </div>
                                <div><i class="fas fa-arrow-up mr-0 mr-md-1 " style="color: #ff6b6b;"></i>
                                    <span class="mr-0 mr-md-0" style="color: blue">&#10138;</span>
                                    <span class="high-temp"> ${jsonResponse.weather[i].max_temp}℃</span>
                                    <span class="mr-0 mr-md-0" style="color: #339af0;"></span>
                                    <span style="color: orangered">&#10136;</span>
                                    <span class="low-temp">${jsonResponse.weather[i].low_temp}℃</span>
                                </div>
                                <p class="weather-description">${jsonResponse.weather[i].weather.description}</p>
                            </div> `
                let weatherDisplay = document.querySelector(".weather__data")
                weatherDisplay.insertAdjacentHTML("afterbegin", weatherData);
                const weatherIcon = new Image();
                weatherIcon.src = Client[jsonResponse.weather[i].weather.icon];
               document.querySelector(".weather-icon").appendChild(weatherIcon);
            }
        } else {
            let errorWeather = '<div class="col-12 col-xl-12 weather__info border-bottom py-2">' +
                '<p>Sorry not exict weather data. Weather is 16 days information </p>';
            let weatherDisplay = document.querySelector(".weather__data")
            weatherDisplay.insertAdjacentHTML("afterbegin", errorWeather)
        }
    } catch (error) {
        console.log("error", error);
    }
}

export{updateUI, postData,submitFormTrip}