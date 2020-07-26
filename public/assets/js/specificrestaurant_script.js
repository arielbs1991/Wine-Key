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

    $(".deleteInventory").off().on("click", function (event) {
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

    //Below code definitely belongs to the updatewinecatalog page
    $(".updateName").each(function (index) {
        $(this).off().on("click", function (event) {
            var id = $(this).data("id");
            console.log("id", id);

            var newName = {
                wineName: $(this).parent().parent().children("input").val().trim()
            };
            console.log("new name", newName);

            $.ajax("/api/wines/winename/" + id, {
                type: "PUT",
                data: newName
            }).then(
                function () {
                    console.log("changed wine name to", newName);
                    location.reload();
                }
            );
        })
    });
    $(".updateYear").each(function (index) {
        $(this).off().on("click", function (event) {
            var id = $(this).data("id");
            console.log("id", id);

            var newYear = {
                year: $(this).parent().parent().children("input").val().trim()
            };
            console.log("new year", newYear);

            $.ajax("/api/wines/year/" + id, {
                type: "PUT",
                data: newYear
            }).then(
                function () {
                    console.log("changed wine year to", newYear);
                    location.reload();
                }
            );
        })
    });

    $(".deleteWine").off().on("click", function (event) {
        var id = $(this).data("id");
        console.log()

        $.ajax("/api/wines/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("Deleted wine", id);
                location.reload();
            }
        );
    });

    // $("#expandWineFormBtn").off().on("click", function (event) {
    //     event.preventDefault();
    //     // $("#expandedForm").empty();
    //     $("#expandedForm").append(
    //         `<div class="grid-container fluid">
    //             <form>
    //                 <div class= "medium-2 cell">
    //                     <label for="Bottle Name" style="display:block; color:white;">Bottle Name</label>
    //                     <input id="createWineName" name="wineName" type="text" placeholder="Bottle Name">
    //                     </div>
    //                     <div class="medium-2 cell">
    //                     <label for="Vintage" style="display:block; color:white;">Vintage</label>
    //                     <input id="createWineYear" name="wineYear" type="text" placeholder="Vintage">
    //                 </div>
    //             </form>
    //             <div id="addwinepadding"><button type="button" class="button rounded bordered shadow primary bulkAddWine"
    //                 style="margin-top:23px">Add Wine</button>
    //             </div>
    //         </div>`);

    // })
});

