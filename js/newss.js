const API_KEY = "bf1a429f8ce04a63a86ffb38fa70ba6d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => {
  fetchnews("india");
});

async function fetchnews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  binddata(data.articles);
}

function binddata(articles) {
  const cardcontainer = document.getElementById("cards-container");
  const newscard = document.getElementById("template-news-card");

  cardcontainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) {
      return;
    }
    const cardclone = newscard.content.cloneNode(true);
    filldataincard(cardclone, article);
    cardcontainer.appendChild(cardclone);
  });
}

function filldataincard(cardclone, article) {
  const newsimg = cardclone.querySelector("#news-img");
  const newstitle = cardclone.querySelector("#news-title");
  const newssource = cardclone.querySelector("#news-source");
  const newsdesc = cardclone.querySelector("#news-desc");

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsimg.src = article.urlToImage;
  newstitle.innerHTML = article.title;
  newssource.innerHTML = `${article.source.name}.${date}`;
  newsdesc.innerHTML = article.description;

  cardclone.firstElementChild.addEventListener("click", () => {
    window.open(article.url);
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchnews(id);

  const navitem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navitem;
  curSelectedNav.classList.add("active");
}

let current = null;
function my(id) {
  const navitem = document.getElementById(id);
  //   current?.classList.remove("active");
  current = navitem;
  current.classList.add("active");
}
