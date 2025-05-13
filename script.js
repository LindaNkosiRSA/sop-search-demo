let data = [];

fetch("payshap_sop_data.json")
  .then((response) => response.json())
  .then((jsonData) => {
    data = jsonData;
  });

function performSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const chatbox = document.getElementById("chatbox");
  const loader = document.getElementById("loadingIndicator");

  chatbox.innerHTML = "";
  loader.style.display = "block";

  setTimeout(() => {
    loader.style.display = "none";

    if (!query) {
      chatbox.innerHTML = "<div class='placeholder'>Please enter a keyword.</div>";
      return;
    }

    const results = data.filter((item) =>
      item.content.toLowerCase().includes(query)
    );

    if (results.length === 0) {
      chatbox.innerHTML = `<div class="bubble user">You: ${query}</div><div class="bubble response"><div class="bubble-header">SOP Result</div>No relevant sections found.</div>`;
      return;
    }

    results.forEach((item) => {
      const userBubble = `<div class="bubble user">You: ${query}</div>`;
      const resultBubble = `
        <div class="bubble response">
          <div class="bubble-header">SOP Result</div>
          ${item.content}
        </div>`;
      chatbox.innerHTML += userBubble + resultBubble;
    });

    chatbox.scrollTop = chatbox.scrollHeight;
  }, 800);
}