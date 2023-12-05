//goes to routes, then to view post controller to get all the posts -arevalo

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM works display"); //delete later

    fetch('/retrieve_all_posts')
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
            console.error('Error fetching /view_post:', error);
        });
});
