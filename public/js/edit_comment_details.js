//gets the values from the edit comment hbs, then routes, next is edit comments controller -arevalo

document.addEventListener("DOMContentLoaded", function(){
    var create_comment_button_submit = document.getElementById("create-comment-button");
    create_comment_button_submit.addEventListener('click', save_comment_function);

    async function save_comment_function(event){
        console.log("save comment details part");
        event.preventDefault();

        var post_ID = document.querySelector("input[name='comm_id']").value;
        console.log("comment ID of comment: ", post_ID);
        var comment_body = document.getElementById("comment-body").value;

        var filtered_comment_body_form = word_filter(comment_body);
        comment_body = filtered_comment_body_form;

        try{
            const response = await fetch('/update_comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    post_id: post_ID,
                    comment_text: comment_body
                }),
            });
            const data = await response.json();
            if(data.success){
                window.location.href = '/view_post';
                console.log("success updating comment");
            }else{
                console.log("error");
            }
        }catch(error){
            console.error(error);
        }
    }
});