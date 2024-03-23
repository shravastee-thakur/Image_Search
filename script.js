const accessKey = "K_kcmRgGqiAZCoMeO6IvWb1rOa_dyrEW0u6KiyrLhyQ";

const search = document.querySelector("#search");
const searchBox = document.querySelector("#search-box");
const searchResult = document.querySelector("#search-result");
const moreBtn = document.querySelector("#more");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank"; // it will open in new tab

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
  moreBtn.style.display = "block";
}

search.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

moreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
