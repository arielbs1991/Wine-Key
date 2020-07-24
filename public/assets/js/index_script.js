
//search button on click needs to take the information entered in the text field and navigate to searchedwine.handlebars, populating the table with each restaurant that has it, the quantity, and the phoneNumber

//for each restaurant listed under "update inventory" in dropdown menu: on click (or "change"), navigate to specificrestaurant.handlebars, populating with wineName, year, and quantity for each wine within that inventory
$(document).ready(function(){

//searching for a specific bottle using the search bar
$("#search").on("click", function (event) {
    wineSearchValue = $(".searchField").val().trim()
    console.log(wineSearchValue);
    event.preventDefault();
    deployWineSearch($(".searchField").val().trim());
    //if wine doesn't exist in our db, ask if user would like to enter a new wine, else SELECT wineId AND year FROM wines WHERE wineName = wineSearchValue, then SELECT restaurantId AND quantity FROM inventory WHERE wineId = this.wineId, then SELECT restaurantName AND phoneNumber where restaurantId = this.restaurantId, then populate table with this.wineName, this.year, this.quantity, this.restaurantName, and this.phoneNumber
});

function deployWineSearch(wineSearchValue) {
    $.ajax({
        url: `/api/wines/${wineSearchValue}`,
        method: "GET"
    }).then(data => {
        console.log("hey hey", data);
    }).fail(err => console.log(err));
}

//clicking on restaurant from dropdown menu and populating its handlebar page
$("select.locations").on("change", function (event) {
    event.preventDefault();
    console.log("Choice", $("select.locations").val())
    location.href="/restaurant/"+ $("select.locations").val()
})

function renderRestaurantPage() { //might not need this, rendering should be taken care of in the routes???
    var currentRestaurant = $(this)
    //$(.location).val(); for restaurant name (hopefully)
    //need to grab restaurantName === above value with $.get("/api/restaurants" + restaurantName)

    // The code below handles the case where we want to get blog posts for a specific wine
    // Looks for a query param in the url for wine_id

    //example code from post-author-joins
    //   var url = window.location.search;
    //   var wineId;
    //   if (url.indexOf("?wine_id=") !== -1) {
    //     wineId = url.split("=")[1];
    //     getRestaurants(wineId);
    //   }
}
})
