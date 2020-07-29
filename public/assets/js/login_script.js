$("#loginForm").submit(function(event){
    event.preventDefault();
    const userObj = {
        email:$("#loginEmail").val(),
        password:$("#loginPassword").val()
    }
    $.ajax({
        url:"/auth/login",
        method:"POST",
        data: userObj
    }).done(function(data){
        console.log(data);
        location.href = "/home"
    }).fail(function(err){
        console.log(err);
        document.getElementById("loginError").style.display="block"
    })
})