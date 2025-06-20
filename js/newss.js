// 🌐 API Base URL for fetching news
const url = "https://newsapi.org/v2/everything?q=";

// 🟡 Fetch default news on initial page load
window.addEventListener("load", () => {
  fetchnews("india");
});

// 📡 Function to fetch news from the API using a search query
async function fetchnews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`); // 🔑 API call with search query and API key
  const data = await res.json(); // 🧾 Convert response to JSON
  binddata(data.articles); // 📦 Pass the list of articles to the bind function
}

// 🖼️ Function to bind article data to the DOM using a card template
function binddata(articles) {
  const cardcontainer = document.getElementById("cards-container"); // 🗂️ Container to hold all news cards
  const newscard = document.getElementById("template-news-card"); // 📝 Template for a single news card

  cardcontainer.innerHTML = ""; // 🔄 Clear existing cards before adding new ones

  articles.forEach((article) => {
    if (!article.urlToImage) {
      return; // 🚫 Skip articles without images
    }
    const cardclone = newscard.content.cloneNode(true); // 🧬 Clone the card template
    filldataincard(cardclone, article); // ✍️ Fill cloned card with article data
    cardcontainer.appendChild(cardclone); // 📥 Add the filled card to the container
  });
}

// 📝 Function to fill cloned card template with actual article data
function filldataincard(cardclone, article) {
  const newsimg = cardclone.querySelector("#news-img");
  const newstitle = cardclone.querySelector("#news-title");
  const newssource = cardclone.querySelector("#news-source");
  const newsdesc = cardclone.querySelector("#news-desc");

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  }); // 🕒 Format the publish date

  newsimg.src = article.urlToImage; // 🖼️ Set article image
  newstitle.innerHTML = article.title; // 📰 Set article title
  newssource.innerHTML = `${article.source.name}.${date}`; // 🏷️ Set source and date
  newsdesc.innerHTML = article.description; // 📄 Set description

  cardclone.firstElementChild.addEventListener("click", () => {
    window.open(article.url); // 🔗 Open article in new tab when clicked
  });
}

// 🔘 Navigation logic for selecting category buttons
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchnews(id); // 🔍 Fetch news by category

  const navitem = document.getElementById(id); // 🔗 Get nav item by id
  curSelectedNav?.classList.remove("active"); // ❌ Remove active class from previously selected nav
  curSelectedNav = navitem; // ✔️ Update current selection
  curSelectedNav.classList.add("active"); // ✅ Add active class to new selection
}

// 🔍 Search functionality
const searchtext = document.getElementById("search-text"); // 🔤 Input field for search text
const button = document.getElementById("search-button"); // 🔘 Search button

button.addEventListener("click", () => {
  const query = searchtext.value; // 📝 Get user input
  if (!query) {
    return; // 🚫 If input is empty, do nothing
  }
  fetchnews(query); // 🔎 Fetch news with search query
  curSelectedNav?.classList.remove("active"); // ❌ Remove active highlight from nav if any
});
