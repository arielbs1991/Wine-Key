const { endsWith } = require("sequelize/types/lib/operators")

//Search "submit" button
$(".search-wine").on("submit")

//on click for submit button, grab value from input field then location.href=backend route+wine name (concatenate) wine name
//back end route req.params.name, api/wine/search/:name, 