$("#signupForm").submit(function(event){
    event.preventDefault();
    const userObj = {
        name:$("#signupName").val(),
        email:$("#signupEmail").val(),
        password:$("#signupPassword").val()
    }
    // console.log(userObj);
    $.ajax({
        url:"/auth/signup",
        method:"POST",
        data: userObj
    }).done(function(data){
        console.log('data');
        // DO WE WANT THIS??????????????
        // alert('sign up worked!')
        location.href = "/auth/login"
    }).fail(function(err){
        console.log(err);
        alert("Something went wrong!  Please try again.")
        location.reload();
    })
})