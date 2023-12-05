//goes to routes, then to comment controller to get all the comments -arevalo

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM works display"); //delete later

    fetch('/retrieve_all_comments')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.body.innerHTML = html; 
        })
        .catch(error => {
            console.error('Error fetching /view_post/comment_page:', error);
        });
});
