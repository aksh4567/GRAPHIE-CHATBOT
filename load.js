document.getElementById("start-button").addEventListener("click", function () {
  const responseDiv = document.getElementById("response");
  const spinner = document.getElementById("spinner");

  // Show spinner while processing
  spinner.style.display = "block";
  responseDiv.textContent = "Listening...";

  setTimeout(() => {
    spinner.style.display = "none";
    responseDiv.textContent = "Hello! How can I assist you today?";
  }, 3000);
});
