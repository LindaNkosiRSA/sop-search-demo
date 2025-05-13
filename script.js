
let sopData = [];

fetch("payshap_sop_data.json")
    .then(response => response.json())
    .then(data => sopData = data);

function performSearch() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    const results = sopData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    results.forEach(result => {
        const div = document.createElement("div");
        div.className = "bubble";
        div.innerHTML = `<h3>${result.title}</h3><p>${highlight(result.content, query)}</p>`;
        resultsContainer.appendChild(div);
    });
}

function highlight(text, keyword) {
    const re = new RegExp("(" + keyword + ")", "gi");
    return text.replace(re, "<mark>$1</mark>");
}
