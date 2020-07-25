$(document).ready(function () {

    $(".addWine").off().on("click", function (event) {
        event.preventDefault();
        var newWine = {
            wineName: $("#createWineName").val().trim(),
            wineYear: $("#createWineYear").val().trim(),
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

    $("#addInventory").off().on("click", function (event) {
        event.preventDefault();
        var newWine = {
            wineQuantity: $("#newWineQuantity").val().trim(),
            restaurantId: $("#restaurantId").val().trim(),
            wineId: $("#newWineName").val().trim()
        };
        console.log(newWine);
        $.ajax({
            url: "/api/inventories/",
            type: "POST",
            data: newWine
        }).then(
            function () {
                console.log("Added new wine");
                location.reload();
            }
        )
    });

    $(".changeQuantity").each(function (index) {
        $(this).off().on("click", function (event) {
            var id = $(this).data("id");
            console.log("id", id);

            var newQuantity = {
                quantity: $(this).parent().parent().children("input").val().trim()
            };
            console.log("new quantity", newQuantity);

            $.ajax("/api/inventories/" + id, {
                type: "PUT",
                data: newQuantity
            }).then(
                function () {
                    console.log("changed wine quantity to", newQuantity);
                    location.reload();
                }
            );
        })
    });

    $(".deleteWine").off().on("click", function (event) {
        var id = $(this).data("id");
        console.log()

        $.ajax("/api/inventories/" + id, { 
            type: "DELETE"
        }).then(
            function () {
                console.log("Deleted wine", id);
                location.reload();
            }
        );
    });
});

