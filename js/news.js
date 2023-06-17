const apiKey = '45e03a275399450a8e5327260a67e505';
const newsContainer = document.getElementById('news-container');

let currentPage = 1;
let loadMoreButton;
let totalArticlesCount = 0;



function displayNews(articles) {
  totalArticlesCount += articles.length;
  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');

    const imageElement = document.createElement('img');
    imageElement.classList.add('image');
    imageElement.src = article.urlToImage ? article.urlToImage : 'imgs/no-img.png';

    const dateElement = document.createElement('p');
    dateElement.classList.add('date');
    dateElement.textContent = formatDate(article.publishedAt);

    const titleElement = document.createElement('h2');
    titleElement.classList.add('title');
    titleElement.textContent = article.title;

    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('description');
    descriptionElement.textContent = article.description;

    const urlElement = document.createElement('a');
    urlElement.href = article.url;
    urlElement.target = '_blank';
    urlElement.innerHTML = 'Read more <i class="fa-solid fa-arrow-up-right-from-square"></i>';

    articleElement.appendChild(imageElement);
    articleElement.appendChild(dateElement);
    articleElement.appendChild(titleElement);
    articleElement.appendChild(descriptionElement);
    articleElement.appendChild(urlElement);

    newsContainer.appendChild(articleElement);
  });

  if (articles.length > 0) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }
}




// Date format
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}



// Category links
const categoryLinks = document.querySelectorAll('.nav-item.nav-link');
let currentCategory = 'general';

categoryLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    currentCategory = link.getAttribute('href');
    currentPage = 1;

    newsContainer.innerHTML = '';
    fetchNews(currentPage, currentCategory);
  });
});




function fetchNews(page, category) {
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=16&page=${page}&apiKey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const articles = data.articles;
      displayNews(articles);
    })
    .catch(error => {
      console.log('Error', error);
    });
}



// Load more button
function loadMoreNews() {
  currentPage++;
  fetchNews(currentPage, currentCategory);
}

function initializeApp() {
  loadMoreButton = document.getElementById('load-more');
  loadMoreButton.addEventListener('click', loadMoreNews);
  fetchNews(currentPage, currentCategory);
}

initializeApp();