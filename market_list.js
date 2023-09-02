let myArray = [];
displayData();
const addBtn = document.getElementById("addBtn");
const total = document.getElementById("total");

//This is calls back a function which checks if the inputs are valid. IF valid, it now adds elements to the list(empty array)
addBtn.addEventListener("click", function () {
  const item = document.getElementById("item");
  const price = document.getElementById("price");

  const itemName = item.value;
  const itemPrice = parseFloat(price.value);

  //checks if price is valid
  if (isNaN(itemPrice) || itemPrice <= 0) {
    // alert("Enter a positive number");
    price.style.borderColor = "red";
    item.value = "";
    price.value = "";
  } else if (itemPrice === "") {
    price.style.borderColor = "red";
  } else {
    price.style.borderColor = "black";
  }
  // checks name validity
  if (itemName === "") {
    // alert("Empty field");
    item.style.borderColor = "red";
    item.value = "";
    price.value = "";
  } else {
    item.style.borderColor = "black";
  }
  //for all valid
  if (itemName !== "" && !isNaN(itemPrice) && itemPrice > 0) {
    addItems(itemName, itemPrice);
  }

  displayData();

  total.innerHTML = `<td>${addPrices()} FCFA</td>`; // this calls the add function and displays the value on the html page at the <tfoot>

  //these sapces are to ensure that after every input, the input slot resets back to empty inputs
  item.value = "";
  price.value = "";

  return;
});

//This function is used to add the elements into the empty array
function addItems(itemName, itemPrice) {
  let new_item = [itemName, itemPrice];
  myArray.push(new_item);
  return myArray;
}

/*this function displays the elements along side their prices and also displaying a delete button by it which makes 
use of JS DOM to delete that specific elts and its associates from the array is need be. This delete makes use of the .map()
the displays the new array and its total using the display function by calling it in the delbutton addEventListener */
function displayData() {
  const table = document.getElementById("itemTableBody");
  table.innerHTML = "";
  for (let i = 0; i < myArray.length; i++) {
    table.innerHTML += `<tr><td>${myArray[i][0]}</td><td>${myArray[i][1]}</td><td><button id="delete${i}" value="${i}">Delete</button></td></tr>`;
  }

  myArray.map((x, i) => {
    const delbutton = document.getElementById(`delete${i}`);
    const delValue = delbutton.value;
    delbutton.addEventListener("click", (e) => {
      delItem(delValue);
      displayData();
      total.innerHTML = `<td>: ${addPrices()} FCFA</td>`;
    });
  });
}

//this function deletes the item and its price
function delItem(delIndex) {
  myArray.splice(delIndex, 1);
}

//this function adds an item and its price
function addPrices() {
  let sum = 0;
  for (let i = 0; i < myArray.length; i++) {
    sum += myArray[i][1];
  }
  return sum;
}
