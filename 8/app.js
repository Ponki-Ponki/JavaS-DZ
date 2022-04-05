"use strict";

let fitlerPopup = document.querySelector(".filterPopup");
let fitlerLabel = document.querySelector(".filterLabel");
let filterIcon = document.querySelector(".filterIcon");

fitlerLabel.addEventListener("click", function () {
  fitlerPopup.classList.toggle("hidden");
  fitlerLabel.classList.toggle("filterLabelPink");
  filterIcon.classList.toggle("filterIconPink");

  if (filterIcon.getAttribute("src") === "images/filter.svg") {
    filterIcon.setAttribute("src", "images/filterHover.svg");
  } else {
    filterIcon.setAttribute("src", "images/filter.svg");
  }
});

let filterHeaders = document.querySelectorAll(".filterCategoryHeader");
filterHeaders.forEach(function (header) {
  header.addEventListener("click", function (event) {
    event.target.nextElementSibling.classList.toggle("hidden");
  });
});

let filterSizes = document.querySelector(".filterSizes");
let filterSizeWrap = document.querySelector(".filterSizeWrap");
filterSizeWrap.addEventListener("click", function () {
  filterSizes.classList.toggle("hidden");
});

const elItems = document.querySelector(".featuredItems");
const elCartIcon = document.querySelector(".cartIconWrap");
const elCartSpan = elCartIcon.children[elCartIcon.children.length - 1];
const basket = document.querySelector(".basket");
const baskTotVal = document.querySelector(".basketTotalValue");

elCartSpan.style.display = "none";
elCartIcon.addEventListener("click", () => {
  basket.classList.toggle("hidden");
});
const arBasket = [];

/**
 * Description Добавляем новый элемент в массив списка покупок
 * @param {Element} elData элемент в котором хранятся нужные данные
 * относительно элемента
 * @ar {Array} преобразованный массив из полученого элемента
 * @returns
 */
function basketItemAdd(elData) {
  let ar = [...elData.children];
  ar.splice(1, 1);
  ar.push(1);
  if (arBasket.length != 0) {
    let elA = true;
    for (let a = 0; a < arBasket.length; a++) {
      let i = 0;
      if (ar[0] === arBasket[a][0]) {
        arBasket[a][arBasket[a].length - 1]++;
        break;
      }
      for (let i = 0; i < arBasket.length; i++) {
        elA = arBasket[i].includes(ar[0]);
        if (elA) {
          !elA;
          break;
        }
      }
    }
    if (!elA) {
      arBasket.push(ar);
    }
  } else {
    arBasket.push(ar);
  }
}

/**
 * description создание списка корзины
 * @param {Array} arrBas  массив элементов, который дабавил пользователь
 * в корзину
 */
function basketList(arrBas) {
  const item = {
    nameItem: "",
    amount: 0,
    price: 0,
    sum: 0,
  };
  for (let i = 1; i < basket.children.length - 1; ) {
    basket.children[i].remove();
  }
  arrBas.forEach((el, ind) => {
    item.nameItem = el[0].innerText;
    item.price = el[el.length - 2].innerText;
    item.amount = el[el.length - 1];
    item.sum = item.amount * item.price.slice(1);
    basket.children[basket.children.length - 1].before(creatElBask(item));
  });
  baskTotVal.innerText = sumItems();
  elCartSpan.textContent = amouItems();
}

/**
 * Создание html кода для отображения элементов в корзине
 * @param {object} item объект, из которого извлекаем значения и записываем
 * в html коде
 * @returns a{element} возвращаем массив элементов в html коде
 */
function creatElBask(item) {
  let a = document.createElement("div");
  a.classList.add("basketRow");
  a.innerHTML = `
    <div>${item.nameItem}</div>
    <div class='amou'>${item.amount}</div>
    <div>${item.price}</div>
    <div class='sum'>${item.sum}</div>
    `;
  return a;
}

/**
 * Подсчёт всех элементов и вывод полной суммы
 * @returns общее значение всех элементов в корзине
 */
function sumItems() {
  let totalValue = Number();
  document.querySelectorAll(".sum").forEach((el) => {
    totalValue += Math.trunc(el.innerText);
  });
  return totalValue;
}

/**
 * Подсчёт кол-ва элементов в корзине (общее количество)
 * @returns числовое значение равное общему количству элементов в корзине
 */
function amouItems() {
  let totalValue = Number();
  document.querySelectorAll(".amou").forEach((el) => {
    totalValue += Math.trunc(el.innerText);
  });
  return totalValue;
}

elItems.addEventListener("click", function (event) {
  if (event.target.nodeName !== "BUTTON") {
    return;
  }
  if (elCartSpan.style.display === "none") {
    elCartSpan.style.display = "";
  }
  const elCart = event.target.parentNode.parentNode.parentNode;
  basketItemAdd(elCart.children[elCart.children.length - 1]);
  basketList(arBasket);
});
