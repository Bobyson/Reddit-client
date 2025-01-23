document.addEventListener("DOMContentLoaded", () => {
  const subredditInput = document.getElementById("subreddit");
  const lanesContainer = document.getElementById("lanesContainer");
  const addSubredditBtn = document.getElementById("add-subreddit");

  const toggleButton = document.getElementById("toggle-popup");
  const popup = document.getElementById("popup");

  toggleButton.addEventListener("click", () => {
    popup.classList.toggle("active");

    toggleButton.textContent = popup.classList.contains("active") ? "x" : "+";
  });

  addSubredditBtn.addEventListener("click", () => {
    const subreddit = subredditInput.value.trim();
    if (!subreddit) return;
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
        const lanes = data.data.children;

        if (lanes.length === 0) {
          lanesContainer.innerHTML = `<p>No post found</p>`;
          return;
        }
        lanes.forEach((lane) => {
          const lane = document.createElement("div");
          lane.classList.add("lane");
          lane.innerHTML = `<h2>${subreddit}</h2><p>Loading...</p>`;
          lanesContainer.appendChild(lane);

          popup.classList.remove("active");
        });
      }
    } catch (error) {}
  }

  // async function fetchSubredditPosts(subreddit) {
  //     const url = `https://www.reddit.com/r/${subreddit}.json`;
  //     const headers = {
  //         'User-Agent': 'Mozilla/5.0 (compatible; JavaScript script)'
  //     };

  //     try {
  //         const response = await fetch(url, { headers });
  //         if (response.ok) {
  //             const data = await response.json();
  //             const posts = data.data.children;
  //             posts.forEach(post => {
  //                 console.log(post.data.title);
  //             });
  //         } else {
  //             console.log(`Failed to fetch data: ${response.status}`);
  //         }
  //     } catch (error) {
  //         console.error('Error:', error);
  //     }
  // }

  // // Example usage
  // const subreddit = "VALORANT";
  // fetchSubredditPosts(subreddit);

  console.log("Reddit client is ready");
});
