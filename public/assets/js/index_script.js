$(document).ready(function () {

    //searching for a specific bottle using the search bar
    $("#search").off().on("click", function (event) {
        wineSearchValue = $(".searchField").val().trim()
        console.log("wineSearchValue", wineSearchValue);
        event.preventDefault();
        deployWineSearch($(".searchField").val().trim());
    });

    function deployWineSearch() {
        location.href = "/api/wines/" + $(".searchField").val().trim()
    }

    //clicking on restaurant from dropdown menu and populating its handlebar page
    $("select.locations").off().on("change", function (event) {
        event.preventDefault();
        console.log("Choice", $("select.locations").val())
        location.href = "/api/restaurants/" + $("select.locations").val()
    })

})