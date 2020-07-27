$("#loginForm").submit(function(event){
    event.preventDefault();
    const userObj = {
        email:$("#loginEmail").val(),
        password:$("#loginPassword").val()
    }
    // console.log(userObj);
    $.ajax({
        url:"/auth/login",
        method:"POST",
        data: userObj
    }).done(function(data){
        console.log(data);
        // DO WE WANT THIS??????????
        // alert('logged in!');
        location.href = "/home"
    }).fail(function(err){
        console.log(err);
        alert("Something went wrong!  Please Try Again.")
        location.reload();
    })
})