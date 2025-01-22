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

  function addLane() {
    fetch(`https://www.reddit.com/r/{subreddit}.json`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        }
    })
    .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch subreddit');
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error)=>console.error(error.message)
    ())
  } 



  console.log("Reddit client is ready");
});
