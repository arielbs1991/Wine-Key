$(document).ready(function () {

    //searching for a specific bottle using the search bar
    $("#homeSearch").off().on("click", function (event) {
        console.log("click!")
        wineSearchValue = $(".homeSearchField").val().trim()
        console.log("wineSearchValue", wineSearchValue);
        event.preventDefault();
        deployWineHomeSearch($(".homeSearchField").val().trim());
    });
    
    $("#search").off().on("click", function (event) {
        console.log("click!")
        wineSearchValue = $(".searchField").val().trim()
        console.log("wineSearchValue", wineSearchValue);
        event.preventDefault();
        deployWineSearch($(".searchField").val().trim());
    });

    function deployWineHomeSearch() {
        location.href = "/api/wines/" + $(".homeSearchField").val().trim()
    }

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