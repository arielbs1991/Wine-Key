//add wine: on click, needs to take the information from the three input fields within its div and create a new wine inventory item (wineId, restaurantId, and quantity). Will need a location.reload to display automatically. Will need to dynamically create a new line in the table with all table elements included (information and action buttons)
//update: "id specific" on click, needs to update the posted quantity of the unique id with the number entered into the input field, location.reload at the end
//remove: "id specific" on click, needs to remove all elements of the unique id from the database. location.reload at end

//NAVBAR: Home: should already be hooked up. Needs to be tested. Stores: will need same functionality as in index.handlebars "update inventory" dropdown menu. Hopefully can make accross-the-board interactive with classes. Wine Catalog: should be hooked up already, needs to be tested. Search: needs same functionality as the index.handlebars "search" button and field. Hopefully across the board functionality with class use

$(function () {

    $(".addWine").on("click", function (event) {
        event.preventDefault();
        var newWine = {
            wineName: $("#newWineName").val().trim(),
            wineYear: $("#newWineYear").val().trim(),
            wineQuantity: $("#newWineQuantity").val().trim(),
            wineVariety: $("#newWineVariety").val().trim(),
            restaurantId: $("#restaurantId").val().trim()
        };
        $.ajax({
            url: "/api/wines/",
            type: "POST",
            data: newWine
        }).then(
            function () {
                console.log("Added new wine");
                location.reload();
            }
        )
    });

    $(".changeQuantity").on("click", function (event) {
        var id = $(this).data("id");

        var newRestaurantQuantity = {
            quantity: $("#newQuantity").val().trim()
        };

        $.ajax("/api/inventories/" + id, {
            type: "PUT",
            data: newRestaurantQuantity
        }).then(
            function () {
                console.log("changed wine quantity to", newQuantity);
                location.reload();
            }
        );
    });


    $(".deleteWine").on("click", function (event) {
        var id = $(this).data("id");

        $.ajax("/api/wines/" + id, { //route for this restaurant's inventory
            type: "DELETE"
        }).then(
            function () {
                console.log("Deleted wine", id);
                location.reload();
            }
        );
    });

})

