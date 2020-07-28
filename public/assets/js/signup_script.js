$("#signupForm").submit(function(event){
    event.preventDefault();
    const userObj = {
        name:$("#signupName").val(),
        email:$("#signupEmail").val(),
        password:$("#signupPassword").val()
    }
    $.ajax({
        url:"/auth/signup",
        method:"POST",
        data: userObj
    }).done(function(data){
        console.log('data');
        location.href = "/auth/login"
    }).fail(function(err){
        console.log(err);
        document.getElementById("signupError").style.display="block"
        // alert("Something went wrong!  Please try again.")
        // location.reload();
    })
})