document.addEventListener("DOMContentLoaded", () => {
  const subredditInput = document.getElementById("subreddit");
  const lanesContainer = document.getElementById("lanesContainer");
  const addSubredditBtn = document.getElementById("add-subreddit");

  const toggleButton = document.getElementById("toggle-popup");
  const popup = document.getElementById("popup");

  const existingLanes = new Set();

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

    try {
      const response = await fetch(url, { headers });
      if (response.ok) {
        const data = await response.json();
        const posts = data.data.children;

        if (posts.length === 0) {
          alert(`No posts found in r/${subreddit}`)
          return;
        }

        // lanes.forEach((lane) => {
        //   const laneElement = document.createElement("div");
        //   laneElement.classList.add("lane");
        //   laneElement.innerHTML = `
        //     <h2>${subreddit}</h2>
        //     <h3>${lane.data.title}</h3>
        //   `;
        //   lanesContainer.appendChild(laneElement);
          createLane(subreddit, posts);
          existingLanes.add(subreddit.toLowerCase())
          popup.classList.remove("active");
        } else if (response.status === 404) {
        alert(`Subreddit r/${subreddit} does not exist.`)
      } else {
        alert (`Failed to fetch subreddit: ${response.status}`)
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching subreddit data.')
    }
  }

  function createLane(subreddit, posts) {
    const laneElement = document.createElement('div');
    laneElement.classList.add('lane');

    laneElement.innerHTML = `
      <h2>r/${subreddit}</h2>
      <div class = 'posts'>
        ${
          posts.map((post) => `
            <div class='post'>
              <h3>${post.data.title}</h3>
              <p>By: ${post.data.author}</p>
              <p>Votes: ${post.data.ups}</p>
            </div>
          `)
          .join('')
        }
      </div>
    `;

    lanesContainer.appendChild(laneElement)
  }

  console.log("Reddit client is ready");
});
