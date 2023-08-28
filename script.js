const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
}

function addItemOnSubmit(e) {
  e.preventDefault();
  newItem = itemInput.value;
  //Validate Input
  if (newItem == "") {
    alert("please add an item");
  } else {
    //add item to DOM
    addItemToDOM(newItem);

    //Add item to local storage
    addItemToStorage(newItem);
  }
  checkUI();
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  //append item
  li.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");

  //append button to item
  li.appendChild(button);

  //append new item to item list
  itemList.appendChild(li);
  itemInput.value = "";
  checkUI();
}

function addItemToStorage(item) {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  itemsFromStorage.push(item);

  //convert to JSON string and store in local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    let itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

//create button function
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}
//create icon function
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (window.confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

function clearItems(e) {
  if (window.confirm("Are you sure?")) {
    itemList.remove();
    checkUI();
  }
}
function filterItem(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

function init() {
  itemList.addEventListener("click", removeItem);
  itemForm.addEventListener("submit", addItemOnSubmit);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItem);
  document.addEventListener("DOMContentLoaded", displayItems);
  checkUI();
}
init();
