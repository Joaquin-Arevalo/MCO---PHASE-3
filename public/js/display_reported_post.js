//goes to routes, then admin controller to get all reported posts as well as reported comments -arevalo

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM works reported"); //delete later

    fetch('/retrieve_all_reported_posts')
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
            console.error('Error fetching /admin_page:', error);
        });
});
