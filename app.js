document.addEventListener("DOMContentLoaded", () => {
  const subredditInput = document.getElementById("subreddit");
  const lanesContainer = document.getElementById("lanesContainer");
  const addSubredditBtn = document.getElementById("add-subreddit");

  const toggleButton = document.getElementById("toggle-popup");
  const popup = document.getElementById("popup");

  toggleButton.addEventListener('click', () => {
    popup.classList.toggle('active');

    toggleButton.textContent = popup.classList.contains("active") ? "x" : "+";
  });

  addSubredditBtn.addEventListener('click', () => {
    const subreddit = subredditInput.value.trim();
    if (!subreddit) return;

    const lane = document.createElement('div');
    lane.classList.add('lane');
    lane.innerHTML = `<h2>r/${subreddit}</h2><p>Loading...</p>`;
    lanesContainer.appendChild(lane);

    popup.classList.remove('active');
  })

  console.log("Reddit client is ready");
});
