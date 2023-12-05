//gets the values from the login hbs, then routes, next is the login controller -arevalo

document.addEventListener("DOMContentLoaded", function(){
    var login_button_submit = document.getElementById("login-button");
    login_button_submit.addEventListener('click', login_account_function);

    async function login_account_function(event){
        console.log("login part");
        event.preventDefault();

        var Lusername_input = document.getElementById("login_username_id").value;
        var Lpassword_input = document.getElementById("login_password_id").value;
        var error_message = document.getElementById("error_issue");

        console.log("email log "+ Lusername_input);
        console.log("pass log "+ Lpassword_input);

        try{
            const response = await fetch('/login_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: Lusername_input,
                    password: Lpassword_input,
                }),
            });
            const data = await response.json();

            if(data.success){
                window.location.href = '/view_post';
                //console.log("login success");
            }else{
                error_message.textContent = data.message;
            }
        }catch(error){
            console.error(error);
            //res.status(500).json({success: false, message: "Login Controller Error!"});
            error_message.textContent = "Login Controller Error";
        }
    }   
});