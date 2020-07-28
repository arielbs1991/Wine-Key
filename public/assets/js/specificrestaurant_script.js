$(document).ready(function () {
    // document.getElementById("case").style.visibility='block';

    $(".addWine").off().on("click", function (event) {

        event.preventDefault();
        var newWine = {
            wineName: $("#createWineName").val().trim(),
            wineYear: $("#createWineYear").val().trim(),
        };
        var weHaveSuccess = false;

        $.ajax({
            url: "/api/wines/",
            type: "POST",
            data: newWine,
            
        }).done(
            function () {
                location.reload();
            }
        ).fail(function() {
            document.getElementById("wineUpdateError").style.display="block"
            // alert("That bottle of wine already exists.")
        })

    });

    $("#addInventory").off().on("click", function (event) {
        event.preventDefault();
        var newWine = {
            wineQuantity: $("#newWineQuantity").val().trim(),
            restaurantId: $("#restaurantId").val().trim(),
            wineId: $("#newWineName").val().trim()
        };
        var weHaveSuccess = false;

        $.ajax({
            url: "/api/inventories/",
            type: "POST",
            data: newWine,
          
        }).done(
            function () {
                location.reload();
            }
        ).fail(function() {
            document.getElementById("inventoryUpdateError").style.display="block"
            // alert("That bottle of wine already exists in this inventory. Please adjust quantity below.")
        })
    });

    $(".changeQuantity").each(function (index) {
        $(this).off().on("click", function (event) {
            var id = $(this).data("id");

            var newQuantity = {
                quantity: $(this).parent().parent().children("input").val().trim()
            };
            console.log("new quantity", newQuantity);

            $.ajax("/api/inventories/" + id, {
                type: "PUT",
                data: newQuantity
            }).then(
                function () {
                    location.reload();
                }
            );
        })
    });

    $(".deleteInventory").off().on("click", function (event) {
        var id = $(this).data("id");

        $.ajax("/api/inventories/" + id, {
            type: "DELETE"
        }).then(
            function () {
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
                location.reload();
            }
        );
    });

    $.ajax("/api/myRestaurants/all", {
        type: "GET"

    }).then(
        function (data) {
            console.log(data)
            for (let i = 0; i < data.length; i++) {

                let list = `<li><a href="/api/restaurants/${data[i].id}">${data[i].restaurantName}</a></li>`
                $("#restaurants").prepend(list)

            }
        }
    );

    $.ajax("/api/myWines/all", {
        type: "GET"

    }).then(
        function (data) {
            console.log(data)
            for (let i = 0; i < data.length; i++) {

                let opt = $("<option>")
                opt.attr("value", data[i])
                opt.text(data[i])
                $("#wines").append(opt)

            }
        }
    );

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

