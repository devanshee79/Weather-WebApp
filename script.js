const wrapper = document.querySelector(".wrapper");
const inputPart = wrapper.querySelector(".input_part");
const infoTxt = inputPart.querySelector(".info_txt");
const inputField = inputPart.querySelector("input");
const locationBtn = inputPart.querySelector("button");
const wIcon = document.querySelector(".weather-part img");
const arrowBack = wrapper.querySelector(".back_icon img");

// APIs data
let api;
const apiKey = '73809624b16bd549dd943c165372a84c';




// Funtion to respond the output of API
function weatherDetails(info){
    if(info.cod == 404)
    {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = "Please enter a valid city ";
        inputField.value = " ";
    }

    else{

        infoTxt.classList.remove("pending");

        // getting required properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        console.log(humidity, temp, country);

        // passing above values to a particular html element
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;


        if(id == 800){
            wIcon.src = "weather-app-icons/clear.svg";
        }
        else if(id >= 200 && id <= 232){
            wIcon.src = "weather-app-icons/storm.svg";
        }
        else if(id >= 600 && id <= 622){
            wIcon.src = "weather-app-icons/snow.svg";
        }
        else if(id >= 701 && id <= 781){
            wIcon.src = "weather-app-icons/haze.svg";
        }
        else if(id >= 801 && id <= 804){
            wIcon.src = "weather-app-icons/cloud.svg";
        }
        else if(id >= 300 && id <= 321){
            wIcon.src = "weather-app-icons/rain.svg";
        }

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
         console.log(info);
    }    
}


// Function to fetch data from API
function fetchData(){
    infoTxt.innerText = "Getting weather details......";
    infoTxt.classList.add("pending");
    //getting api response and returning it with parsing into js object and in nother
    //then fuction calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => {
        console.log(result);
        weatherDetails(result)});
}




// // //////////////////////getting the live location/////////////////////////



// if able to get the live location
function onSuccess(position){
    // getting latitude and lingitude of the user device from coords object
    const {latitude, longitude} = position.coords;
    console.log(latitude, longitude);
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}

// unable to get the live location
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

// Putting the event listener on button
locationBtn.addEventListener("click", ()=> {
    if(navigator.geolocation){
        // if browser supportsgeolaction api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        alert("Your browser does not support geolocation api try using different Browser");
    }
});







// ///////////////////////////// Getting the city name from user //////////////////////

// requesting the API for user given city
function requestApi(city)
{
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    console.log(api);
    fetchData();
}


// Adding event listener to inputfield
inputField.addEventListener("keyup", e =>{
    //if user pressed enter and the input is not empty
    if(e.key == "Enter" && inputField.value != " "){
        // console.log(inputField.value);
        requestApi(inputField.value);
      
    }
});


// for going bck to first page making backarrow working
arrowBack.addEventListener("click", () =>{
    wrapper.classList.remove("active");
    inputField.value = " ";
})