//gets the values from the create post hbs, then routes, next is create post controller -Arevalo

document.addEventListener("DOMContentLoaded", function(){
    var create_post_button_submit = document.getElementById("create-post-button");
    create_post_button_submit.addEventListener('click', save_post_function);

    async function save_post_function(event){
        console.log("save post details part");
        event.preventDefault();

        var post_title_form = document.querySelector("#post-title").value;
        var post_category_form = document.querySelector("#category").value;
        var post_image_form = document.querySelector("#post-image").value;
        var post_body_form = document.querySelector("#post-body").value;
        var error_message = document.getElementById("error_issue");

        var cd = new Date();
        let month = cd.getMonth() + 1;
        let day = cd.getDate(); 
        let year = cd.getFullYear();
        var post_date_form = month + "/" + day + "/" + year;

        var filtered_post_title_form = word_filter(post_title_form);
        post_title_form = filtered_post_title_form;

        var filtered_post_body_form = word_filter(post_body_form);
        post_body_form = filtered_post_body_form;

        try{
            const response = await fetch('/save_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //username: req.session.Username,
                    title: post_title_form,
                    category: post_category_form,
                    body: post_body_form,
                    image: post_image_form,
                    date: post_date_form
                }),
            });
            const data = await response.json();
            if(data.success){
                window.location.href = '/view_post';
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