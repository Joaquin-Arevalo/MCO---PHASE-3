//gets the values from edit profile hbs, then routes, next is edit profile controller -arevalo

document.addEventListener("DOMContentLoaded", function(){
    var update_profile_button_submit = document.getElementById("profile-button");
    update_profile_button_submit.addEventListener('click', save_post_function);

    async function save_post_function(event){
        console.log("save post details part");
        event.preventDefault();

        var pfp_img = document.querySelector("#pfp-id").value;
        var bio_des = document.querySelector("#bio-des").value;
        var error_message = document.getElementById("error_issue");
        var acc_id = document.querySelector('input[name="acc_id"]').value; 

        var filtered_bio_des = word_filter(bio_des);
        bio_des = filtered_bio_des;

        try{
            const response = await fetch('/update_profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //username: req.session.Username,
                    body: bio_des,
                    image: pfp_img,
                    acc_ID: acc_id
                }),
            });
            const data = await response.json();
            if(data.success){
                window.location.href = '/profile';
                //maybe add the display function here?
            }else{
                error_message.textContent = "Something Went Wrong!";
            }
        }catch(error){
            console.error(error);
            error_message.textContent = "Create Post Controller Error";
        }
    }

});