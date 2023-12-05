//--denise

const resultsBox = document.querySelector(".result-box");
const searchControl = document.querySelector(".form-control");
console.log("here");
searchControl.addEventListener("keyup", function handleKeyUp(e) {
  let input = e.target.value;
  if (input.length) {
    fetch(`/search?value=${input}`)
      .then((response) => response.json())
      .then((result) => {
        display(result);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  } else {
    console.log("called");
  }
});

//Display any thing you want
function display(result) {
  const content = result.map((item) => {
    return "<li>" + item.Title + "</li>";
  });
  resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
  console.log(resultsBox);
}
