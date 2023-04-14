const locationName = document.getElementById("locationInput");
const locationButton = document.getElementById("formSubmit");

locationButton.addEventListener('click', e =>{
    e.preventDefault();
    console.log("Button Clicked");
});