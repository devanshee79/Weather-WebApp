const wrapper = document.querySelector(".wrapper");
const inputPart = wrapper.querySelector(".input_part");
const info = inputPart.querySelector(".info_txt");
const inputField = inputPart.querySelector("input");

inputField.addEventListener("keyup", e =>{
    //if user pressed enter and the input is not empty
    if(e.key == "Enter" && inputField.value != " "){
        console.log("hello");
        requestApi(inputField.value);
    }
});

function requestApi(city)
{
    console.log(city);
}