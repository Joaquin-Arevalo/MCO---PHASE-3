//goes to routes, then profile controllers to get all accounts -arevalo

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM works display"); //delete later

    fetch('/retrieve_profile')
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
            console.error('Error fetching /profile:', error);
        });
}); 