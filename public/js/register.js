//gets the values from the register hbs, then routes, next is register controller -arevalo

document.addEventListener("DOMContentLoaded", function(){
    var register_button_submit = document.getElementById("register-button");
    register_button_submit.addEventListener('click', register_account_function);

    //register_button_submit.onclick = function(event){
    async function register_account_function(event){
        console.log("register part");
        event.preventDefault();

        var username_input = document.getElementById("username_id").value;
        var password_input = document.getElementById("password").value;
        var confirm_password_input = document.getElementById("confirm-password").value;
        // var account_type_input = document.querySelector("input[name='account_type']:checked").value;
        var error_message = document.getElementById("error_issue");

        // console.log("username reg "+ username_input);
        // console.log("pass reg "+ password_input);

        //testing here
        if(password_input !== confirm_password_input){
            error_message.textContent = "Passwords Do Not Match!";
            return false;
        }
        try{
            const response = await fetch('/register_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username_input,
                    password: password_input,
                    confirm_password: confirm_password_input,
                    // account_type: account_type_input,
                }),
            });
            const data = await response.json();
            if(data.success){
                window.location.href = '/login';
            }else{
                error_message.textContent = data.message;
            }
        }catch(error){
            console.error(error);
            error_message.textContent = "Register Controller Error";
        }
    }
});