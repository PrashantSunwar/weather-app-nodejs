console.log("Hey i am loaded");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

function fetchData(address) {
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`/weather?address=${address}`)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        return;
      }
      const { location, forecast } = data;
      messageOne.textContent = location;
      messageTwo.textContent = forecast;
    })
    .catch(console.error);
}

weatherForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const searchValue = search.value;
  console.log(searchValue);
  fetchData(searchValue);
  search.value = "";
  search.focus();
});
