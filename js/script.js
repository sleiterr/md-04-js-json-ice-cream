const gridBox = document.querySelector(".grid-box");
const listBox = document.querySelector(".list-box");

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
    `;
};

//? get Data from JSON

const fetchPosts = async () => {
  try {
    const response = await fetch("./Data/card.json");
    const posts = await response.json();
    return posts;
  } catch {
    console.error("Error fetching or parsing data:", error);
  }
};

const renderPost = async () => {
  const posts = await fetchPosts();

  posts.forEach((post) => {
    gridBox.innerHTML += postTemplateGrid(post);
  });

  gridIcon.addEventListener("click", () => {
    listBox.innerHTML = "";
    gridBox.innerHTML = "";
    posts.forEach((post) => {
      gridBox.innerHTML += postTemplateGrid(post);
    });
  });

  listIcon.addEventListener("click", () => {
    listBox.innerHTML = "";
    gridBox.innerHTML = "";

    listBox.innerHTML = `
    <ul class="list-column"></ul>
    <ul class="list-column"></ul>
    `;

    const listColumns = document.querySelectorAll(".list-column");

    posts.forEach((post, index) => {
      listColumns[index % 2].innerHTML += postTemplateList(post);
    });
  });
};

renderPost();
