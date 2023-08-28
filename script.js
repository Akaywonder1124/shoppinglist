const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

function addItem(e) {
  e.preventDefault();
  newItem = itemInput.value;
  //Validate Input
  if (newItem == "") {
    alert("please add an item");
  } else {
    const li = document.createElement("li");

    //appemd item
    li.appendChild(document.createTextNode(newItem));
    const button = createButton("remove-item btn-link text-red");

    //append button to item
    li.appendChild(button);

    //append new item to item list
    itemList.appendChild(li);
    itemInput.value = "";
    console.log(itemList);
  }
  checkUI();
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
      console.log(items, items.length);
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
itemList.addEventListener("click", removeItem);
itemForm.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItem);
checkUI();
