// const router = require("express").Router();
// const Router = require("/controllers/wine_controller")
//search button on click needs to take the information entered in the text field and navigate to searchedwine.handlebars, populating the table with each restaurant that has it, the quantity, and the phoneNumber

//for each restaurant listed under "update inventory" in dropdown menu: on click (or "change"), navigate to specificrestaurant.handlebars, populating with wineName, year, and quantity for each wine within that inventory
$(document).ready(function () {

    //searching for a specific bottle using the search bar
    $("#search").on("click", function (event) {
        wineSearchValue = $(".searchField").val().trim()
        console.log("wineSearchValue", wineSearchValue);
        event.preventDefault();
        deployWineSearch($(".searchField").val().trim());
        //if wine doesn't exist in our db, ask if user would like to enter a new wine, else SELECT wineId AND year FROM wines WHERE wineName = wineSearchValue, then SELECT restaurantId AND quantity FROM inventory WHERE wineId = this.wineId, then SELECT restaurantName AND phoneNumber where restaurantId = this.restaurantId, then populate table with this.wineName, this.year, this.quantity, this.restaurantName, and this.phoneNumber
    });

    function deployWineSearch(wineSearchValue) {
        location.href = "/api/wines/ininventories" + wineSearchValue
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