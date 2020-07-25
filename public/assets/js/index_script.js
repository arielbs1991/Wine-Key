// const router = require("express").Router();
// const Router = require("/controllers/wine_controller")
//search button on click needs to take the information entered in the text field and navigate to searchedwine.handlebars, populating the table with each restaurant that has it, the quantity, and the phoneNumber

$(document).ready(function () {

    //searching for a specific bottle using the search bar
    $("#search").on("click", function (event) {
        wineSearchValue = $(".searchField").val().trim()
        console.log("wineSearchValue", wineSearchValue);
        event.preventDefault();
        deployWineSearch($(".searchField").val().trim());
        //if wine doesn't exist in our db, ask if user would like to enter a new wine
    });

    function deployWineSearch() {
        location.href = "/api/wines/" + $(".searchField").val().trim()
    }

    //clicking on restaurant from dropdown menu and populating its handlebar page
    $("select.locations").on("change", function (event) {
        event.preventDefault();
        console.log("Choice", $("select.locations").val())
        location.href = "/api/restaurants/" + $("select.locations").val()
    })
})


// Title animation Code

// const text = document.querySelector(".title");
// console.log(text);
// const strText = text.textContent;
// const splitText = strText.split("");
// text.textContent = "";

// for(let i=0; i < splitText.length; i++) {
//     text.innerHTML += "<span>" + splitText[i] + "</span>";
// }

// let char = 0;
// let timer = setInterval(onTick, 50);

// function onTick(){
//     const span = text.querySelectorAll('span')[char];
//     span.classList.add('fade');
//     char++
// }