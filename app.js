document.addEventListener("DOMContentLoaded", () => {

  const subredditInput = document.getElementById("subreddit");
  const lanesContainer = document.getElementById("lanesContainer");
  const addSubredditBtn = document.getElementById("add-subreddit");

  const toggleButton = document.getElementById("toggle-popup");
  const popup = document.getElementById("popup");

  const existingLanes = new Set();

  const savedSubreddits = JSON.parse(localStorage.getItem('subreddits')) || [];

  savedSubreddits.forEach(subreddit=> {
    fetchSubreddit(subreddit);
  });

  toggleButton.addEventListener("click", () => {
    popup.classList.toggle("active");
    toggleButton.textContent = popup.classList.contains("active") ? "x" : "+";
  });

  addSubredditBtn.addEventListener("click", () => {
    const subreddit = subredditInput.value.trim();
    if (!subreddit) return;

    if (existingLanes.has(subreddit.toLowerCase())) {
      alert("This subreddit is already displayed");
      return;
    }

    fetchSubreddit(subreddit);
  });

  async function fetchSubreddit(subreddit) {
    const url = `https://www.reddit.com/r/${subreddit}.json`;
    const headers = {
      "User-Agent": "Mozilla/5.0 (compatible; JavaScript script)",
    };

    const laneElement = document.createElement("div");
    laneElement.classList.add("lane");
    laneElement.innerHTML = `
      <h2>r/${subreddit}</h2>
      <button class='remove-lane'>Remove</button>
      <p>Loading...</p>`;
    lanesContainer.appendChild(laneElement);

    const removeBtn = laneElement.querySelector('.remove-lane');
    removeBtn.addEventListener('click', () => {
      laneElement.remove();
      existingLanes.delete(subreddit.toLowerCase());

      updateLocalStorage();
    });

    try {
      const response = await fetch(url, { headers });
      if (response.ok) {
        const data = await response.json();
        const posts = data.data.children;

        if (posts.length === 0) {
          alert(`No posts found in r/${subreddit}`);
          return;
        }

        // createLane(subreddit, posts);
        laneElement.innerHTML = `
          <h2>r/${subreddit}</h2>
          <button class='remove-lane'>Remove</button>
          <div class = 'posts'>
            ${posts
              .map(
                (post) => `
                <div class='post'>
                  <h3>${post.data.title}</h3>
                  <p>By: ${post.data.author}</p>
                  <p>Votes: ${post.data.ups}</p>
                </div>
              `)
              .join("")}
          </div>
        `;
        laneElement.querySelector('.remove-lane').addEventListener('click', ()=> {
          laneElement.remove();
          existingLanes.delete(subreddit.toLowerCase());
          updateLocalStorage();
        });

        existingLanes.add(subreddit.toLowerCase());
        popup.classList.remove("active");

        updateLocalStorage();
      } else if (response.status === 404) {
        alert(`Subreddit r/${subreddit} does not exist.`);
        laneElement.remove();
      } else {
        alert(`Failed to fetch subreddit: ${response.status}`);
        laneElement.remove();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching subreddit data.");
      laneElement.remove();
    }
  }

  function updateLocalStorage() {
    localStorage.setItem('subreddits', JSON.stringify(Array.from(existingLanes)));
  }

  console.log("Reddit client is ready");
});
