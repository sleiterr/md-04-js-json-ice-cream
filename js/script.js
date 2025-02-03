const gridBox = document.querySelector(".grid-box");
const listBox = document.querySelector(".lis-box");

const gridIcon = document.querySelector(".grid-icon");
const listIcon = document.querySelector(".list-icon");

//? innerHtml

const postTemplateGrid = (post) => {
  return `
    <ul class="grid-list">
       <li class="grid-item ${post.gridClass}">
        <img
            src="${post.src}"
            alt="${post.alt}"
            class="grid-img"
        />
        <div class="grid-content">
            <h4 class="grid-title">${post.title}</h4>
            <p class="grid-text">${post.text}</p>
            <p class="grid-price">${post.price}</p>
        </div>
        </li>
    </ul>
    `;
};

const postTemplateList = (post) => {
  return `
    <ul class="list-column">
    <li class="ice-item">
       <img
        src="${post.src}"
        alt="${post.alt}"
        class="list-img ${post.listClass}"
       />
      <div class="list-content">
       <h4 class="list-title">${post.title}</h4>
       <p class="list-text">${post.text}</p>
      </div>
      <p class="list-price">${post.price}</p>
    </li>
    </ul>
    `;
};

//? get Data from JSON

const fetchPosts = async () => {
  try {
    const response = await fetch("../Data.json/card.json");
    const post = await response.json();
    return post;
  } catch {
    console.error("Error fetching or parsing data:", error);
  }
};

const renderPosts = async () => {
  const posts = await fetchPosts();
  posts.forEach((post) => {
    gridBox.innerHTML += postTemplateGrid(post);
  });

  gridIcon.addEventListener("clicl", () => {
    listBox.innerHTML = "";
    gridBox.innerHTML = "";
    posts.forEach((post) => {
      gridBox.innerHTML += postTemplateGrid(post);
    });
  });

  listBox.addEventListener("clicl", () => {
    listBox.innerHTML = "";
    gridBox.innerHTML = "";
    posts.forEach((post) => {
      listBox.innerHTML += postTemplateGrid(post);
    });
  });
};

renderPosts();
