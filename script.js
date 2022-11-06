const items = [{
        title: "Тушь объемная для ресниц",
        description: "RAD mad maxcara",
        tags: ["new", "insta-hit"],
        price: 13.99,
        img: "./img/1.img",
        rating: 4.9,
    },
    {
        title: "Детский бальзам для губ",
        description: "LIMONI bambini вкус бабл-гам",
        tags: ["vegan"],
        price: 11.93,
        img: "./img/2.img",
        rating: 4.2,
    },
    {
        title: "Скраб отшелушивающий срозовым квасцем",
        description: "PAYOT exfoliant corps",
        tags: ["insta-hit"],
        price: 61.16,
        img: "./img/3.img",
        rating: 5.0,
    },
    {
        title: "Парфюмерная вода",
        description: "CAROLINA HERRERA very good girl glam",
        tags: ["insta-hit"],
        price: 441.81,
        img: "./img/4.img",
        rating: 4.7,
    },
    {
        title: "Ампулы для лица",
        description: "Babor hydra plus ampoule concentrates",
        tags: ["new"],
        price: 88.47,
        img: "./img/5.img",
        rating: 4.9,
    },
    {
        title: "Подводка-штамп для макияжа",
        description: "7DAYS b.colour",
        tags: ["vegan"],
        price: 11.99,
        img: "./img/6.img",
        rating: 3,
    },
    {
        title: "Туалетная вода",
        description: "CHRISTINE LAVOISIER PARFUMS sense stylish",
        tags: ["new"],
        price: 23.39,
        img: "./img/7.img",
        rating: 2.9,
    },
    {
        title: "Палетка теней",
        description: "BEAUTYDRUGS eyeshadow palette",
        tags: ["insta-hit"],
        price: 61.66,
        img: "./img/8.img",
        rating: 3.4,
    },
    {
        title: "Переводные тату-веснушки",
        description: "MAMIATAS multicolor splash",
        tags: ["new"],
        price: 16.02,
        img: "./img/9.img",
        rating: 4.8,
    },
    {
        title: "Парфюмерная вода",
        description: "BYREDO young rose",
        tags: ["new"],
        price: 879.33,
        img: "./img/10.img",
        rating: 5.0,
    },
    {
        title: "Тональный крем",
        description: "BELORE DISIGN nude garmony!",
        tags: ["vegan"],
        price: 14.91,
        img: "./img/11.img",
        rating: 3.7,
    },
    {
        title: "Лимитированный спонж с экстрактом зеленого чая",
        description: "MANLY ECO pro beauty",
        tags: ["new"],
        price: 29,
        img: "./img/12.img",
        rating: 4.1,
    },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");
//-----------------
function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} BYN`;

    const ratingContainer = item.querySelector(".rating");

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa-regular", "fa-star");
        ratingContainer.append(star);
    }


    const tagsHolder = item.querySelector(".tags");
    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    return item;
}

//-----------------

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

// ------------------------
function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

// -------------------------
renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

//--------------------------

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    // По умолчанию сортировка "по алфавиту"
    sortControl.selectedIndex = 0;
}

// -----------------------
searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

// -----------------------
const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    renderItems(currentState);
});