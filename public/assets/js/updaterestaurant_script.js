$(".addRestaurant").off().on("click", function (event) {
    console.log("click!");
    // event.preventDefault();
    // var newRestaurant = {
    //     restaurantName: $("#createRestaurantName").val().trim(),
    //     phoneNumber: $("#createPhoneNumber").val().trim(),
    //     address: $("#createAddress").val().trim(),
    // };
    // $.ajax({
    //     url: "/api/restaurants/",
    //     type: "POST",
    //     data: newRestaurant
    // }).then(
    //     function () {
    //         console.log("Added new store");
    //         location.reload();
    //     }
    // )
});