const { endsWith } = require("sequelize/types/lib/operators")

//Search "submit" button
$(".search-wine").on("submit")

//on click for submit button, grab value from input field then location.href=backend route+wine name (concatenate) wine name
//back end route req.params.name, api/wine/search/:name, 
//button click event to go from home page to individual restaurant page - for each restaurant
// $(document).ready(function() {
  
//     $(".devour-form").on("submit", function(event) {
//       event.preventDefault();
    
//       var burger_id = $(this).children(".burger_id").val();
//       $.ajax({
//         method: "PUT",
//         url: "/burgers/update/" + burger_id
//       }).then(function(data) {
       
//         location.reload();
//       });
    
//     });
//   });

  //submit button to grab wine name from input field and search for wine id, returning inventory information with restaurant id
