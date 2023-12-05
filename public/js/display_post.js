//goes to routes, then to view post controller to get all the posts -arevalo
//categories - denise
document.addEventListener("DOMContentLoaded", function(){
    async function start() {
        await fetch("/retrieve_all_posts")
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
            console.error("Error fetching /view_post:", error);
          });
        var activities = document.getElementById("categorize");
        activities.addEventListener("change", function () {
          addActivityItem();
        });
      }
      async function addActivityItem() {
        const cat = document.getElementById("categorize").value;
        await fetch(`/retrieve_all_posts?category=${cat}`)
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
            console.error("Error fetching /view_post:", error);
          });
        var activities = document.getElementById("categorize");
        document.getElementById("categorize").value = cat;
        activities.addEventListener("change", function () {
          addActivityItem();
        });
      }
      start();
});
