const addSubredditBtn = document.getElementById("add-subreddit");

const toggleButton = document.getElementById("toggle-popup");
const popup =  document.getElementById("popup");

toggleButton.addEventListener("click", () => {
    popup.classList.toggle("active");

    toggleButton.textContent = popup.classList.contains("active") ? "x" : "+" ;
});

