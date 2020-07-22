$(document).ready(function() {
    // Getting references to the name input and restaurant container, as well as the table body
    var nameInput = $("#restaurant-name");
    var restaurantList = $("tbody");
    var restaurantContainer = $(".restaurant-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an restaurant
    $(document).on("submit", "#restaurant-form", handleRestaurantFormSubmit);
    $(document).on("click", ".delete-restaurant", handleDeleteButtonPress);
  
    // Getting the initial list of restaurants
    getRestaurants();
  
    // A function to handle what happens when the form is submitted to create a new Restaurant
    function handleRestaurantFormSubmit(event) {
      event.preventDefault();
      // Don't do anything if the name fields hasn't been filled out
      if (!nameInput.val().trim().trim()) {
        return;
      }
      // Calling the upsertRestaurant function and passing in the value of the name input
      upsertRestaurant({
        name: nameInput
          .val()
          .trim()
      });
    }
  
    // A function for creating an restaurant. Calls getRestaurant upon completion
    function upsertRestaurant(restaurantData) {
      $.post("/api/restaurant", restaurantData)
        .then(getRestaurant);
    }
  
    // Function for creating a new list row for restaurants
    function createRestaurantRow(restaurantData) {
      var newTr = $("<tr>");
      newTr.data("restaurant", restaurantData);
      newTr.append("<td>" + restaurantData.name + "</td>");
      if (restaurantData.Posts) {
        newTr.append("<td> " + restaurantData.Posts.length + "</td>");
      } else {
        newTr.append("<td>0</td>");
      }
      newTr.append("<td><a href='/home?restaurant_id=" + restaurantData.id + "'>Go to Wine</a></td>");
      newTr.append("<td><a href='/wine?restaurant_id=" + restaurantData.id + "'>Create a Wine</a></td>");
      newTr.append("<td><a style='cursor:pointer;color:red' class='delete-restaurant'>Delete Restaurant</a></td>");
      return newTr;
    }
  
    // Function for retrieving restaurants and getting them ready to be rendered to the page
    function getRestaurant() {
      $.get("/api/restaurant", function(data) {
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createRestaurantRow(data[i]));
        }
        renderRestaurantList(rowsToAdd);
        nameInput.val("");
      });
    }
  
    // A function for rendering the list of restaurant to the page
    function renderRestaurantList(rows) {
      restaurantList.children().not(":last").remove();
      restaurantContainer.children(".alert").remove();
      if (rows.length) {
        console.log(rows);
        restaurantList.prepend(rows);
      }
      else {
        renderEmpty();
      }
    }
  
    // Function for handling what to render when there are no restaurants
    function renderEmpty() {
      var alertDiv = $("<div>");
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("You must create an Restaurant before you can create a Wine.");
      restaurantContainer.append(alertDiv);
    }
  
    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("restaurant");
      var id = listItemData.id;
      $.ajax({
        method: "DELETE",
        url: "/api/restaurant/" + id
      })
        .then(getRestaurant);
    }
  });
  