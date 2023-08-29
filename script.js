const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");
const formBtn = itemForm.querySelector("button");
const li = itemList.querySelectorAll("li");
let isEditMode = false;

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

    //checkIfItemExist
  } else if (checkIfItemExist(newItem)) {
    alert("item already exist");

    //prevent duplictae
  } else if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode-on");
    removeItemFunc(itemToEdit);
    addItemToDOM(newItem);
    addItemToStorage(newItem);
    itemToEdit.classList.remove("edit-mode-on");
    isEditMode = false;
  }

  //General add function
  else {
    addItemToDOM(newItem);
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

function checkIfItemExist(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
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
    itemsFromStorage = [];
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
  // remove item from DOM
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (window.confirm("Are you sure?")) {
      const item = e.target.parentElement.parentElement;
      removeItemFunc(item);

      //   remove item from local storage
      let itemsFromStorage = getItemsFromStorage();
      itemsFromStorage = itemsFromStorage.filter((i) => i !== item.textContent);
      localStorage.setItem("items", JSON.stringify(itemsFromStorage));
      checkUI();
    }
  } else {
    setItemToEdit(e.target);
  }
}
function removeItemFunc(item) {
  item.remove();
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item.textContent);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

//set item to edit
function setItemToEdit(item) {
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode-on"));
  isEditMode = true;
  item.classList.add("edit-mode-on");
  formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update item";
  formBtn.style.backgroundColor = "green";
  itemInput.value = item.textContent;
}

function clearItems() {
  if (window.confirm("Are you sure?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    //remove item from local storage
    localStorage.removeItem("items");
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
  console.log(items);
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
  isEditMode = false;
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#000";
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
