const gridBox = document.querySelector(".grid-box");
const listBox = document.querySelector(".list-box");

const gridIcon = document.querySelector(".grid-icon");
const listIcon = document.querySelector(".list-icon");

//? innerHtml

const cardTemplateGrid = (card) => {
  return `
    <ul class="grid-list">
       <li class="grid-item ${card.gridClass}">
        <img
            src="${card.src}"
            alt="${card.alt}"
            class="grid-img"
        />
        <div class="grid-content">
            <h4 class="grid-title">${card.title}</h4>
            <p class="grid-text">${card.text}</p>
            <p class="grid-price">${card.price}</p>
        </div>
        </li>
    </ul>
    `;
};

const cardTemplateList = (card) => {
  return `
    <li class="ice-item" >
       <img
        src="${card.src}"
        alt="${card.alt}"
        class="list-img ${card.listClass}"
       />
      <div class="list-content">
       <h4 class="list-title">${card.title}</h4>
       <p class="list-text">${card.text}</p>
      </div>
      <p class="list-price">${card.price}</p>
    </li>
    `;
};

//? get Data from JSON
//return promis
const fetchCards = async () => {
  try {
    const response = await fetch("./Data/card.json");
    const cards = await response.json();
    return cards; // promis
    // return console.log(cards);
  } catch {
    console.error("Error fetching or parsing data:", error);
  }
};

const renderCard = async () => {
  const cards = await fetchCards();

  cards.forEach((card) => {
    gridBox.innerHTML += cardTemplateGrid(card);
  });

  gridIcon.addEventListener("click", () => {
    listBox.innerHTML = "";
    gridBox.innerHTML = "";
    cards.forEach((card) => {
      gridBox.innerHTML += cardTemplateGrid(card);
    });
  });

  listIcon.addEventListener("click", () => {
    listBox.innerHTML = "";
    gridBox.innerHTML = "";

    listBox.innerHTML = `
    <ul class="list-column" data-aos="fade-right" data-aos-duration="1800"></ul>
    <ul class="list-column" data-aos="fade-left" data-aos-duration="1800"></ul>
    `;

    const listColumns = document.querySelectorAll(".list-column");

    cards.forEach((card, index) => {
      listColumns[index % 2].innerHTML += cardTemplateList(card);
    });
  });
};

renderCard();
