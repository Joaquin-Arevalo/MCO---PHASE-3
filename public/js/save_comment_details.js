//gets the values from the comment page, then routes, next is comment controller -arevalo

document.addEventListener("DOMContentLoaded", function(){
    var create_comment_button_submit = document.getElementById("create-comment-button");
    create_comment_button_submit.addEventListener('click', save_comment_function);

    async function save_comment_function(event){
        console.log("save comment details part");
        event.preventDefault();

        // var post_ID = document.getAttribute("post_id");
        // console.log("post ID: ", post_ID);
        var post_ID = document.querySelector("input[name='post_id']").value;
        console.log("post ID: ", post_ID);
        var comment_body = document.getElementById("comment-body").value;

        var cd = new Date();
        let month = cd.getMonth() + 1;
        let day = cd.getDate(); 
        let year = cd.getFullYear();
        var comment_date_text = month + "/" + day + "/" + year;

        var filtered_comment_body_form = word_filter(comment_body);
        comment_body = filtered_comment_body_form;

        try{
            const response = await fetch('/save_comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    post_id: post_ID,
                    comment_text: comment_body,
                    comment_date: comment_date_text
                }),
            });
            const data = await response.json();
            if(data.success){
                window.location.href = '/view_post';
                console.log("success saving comment");
            }else{
                console.log("error");
            }
        }catch(error){
            console.error(error);
        }
    }
});