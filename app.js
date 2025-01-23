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
        const lanes = data.data.children;

        if (lanes.length === 0) {
          lanesContainer.innerHTML = `<p>No post found</p>`;
          return;
        }
        lanes.forEach((lane) => {
          const laneElement = document.createElement("div");
          laneElement.classList.add("lane");
          laneElement.innerHTML = `
            <h2>${subreddit}</h2>
            <h3>${lane.data.title}</h3>
          `;
          lanesContainer.appendChild(laneElement);

          popup.classList.remove("active");
        });
      } else {
        lanesContainer.innerHTML = `<p>Failed to fetch data: ${response.status}</p>`
      }
    } catch (error) {
      console.error('Error:', error);
      lanesContainer.innerHTML = `<p>An error occured while fetching data.</p>`
    }
  }



  console.log("Reddit client is ready");
});
