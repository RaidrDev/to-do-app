
var userEmail = null

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userEmail = user.email;
    getItems();
  }

});


function getItems() {
  document.getElementById("all-tag").style.color = "#3a7bfd";
  document.getElementById("active-tag").style.color = "#4d5066";
  document.getElementById("completed-tag").style.color = "#4d5066";

  db.collection("todo-items").where("correo", "==", userEmail).get().then((querySnapshot) => {
    let items = [];
    querySnapshot.forEach((document) => {
      items.push({
        id: document.id,
        ...document.data()
      })
      generateItems(items);
    });
  })
    .catch((error) => {
      console.log(error);
    });
}

function generateItems(items) {
  let todoItems = []
  items.forEach((item) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    let checkContainer = document.createElement("div");
    checkContainer.classList.add("check");
    let checkMark = document.createElement("div");
    checkMark.classList.add("check-mark");
    checkMark.innerHTML = '<img src="assets/icon-check.svg">';
    checkMark.addEventListener("click", function () {
      markCompleted(item.id);
    })
    checkContainer.appendChild(checkMark);

    let todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.innerText = item.text;

    if (item.status == "completed") {
      checkMark.classList.add("checked");
      todoText.classList.add("checked");
    }
    todoItem.appendChild(checkContainer);
    todoItem.appendChild(todoText);
    todoItems.push(todoItem)
  })
  document.querySelector(".todo-items").replaceChildren(...todoItems);
}


function addItem(event) {
  event.preventDefault();
  let text = document.getElementById("todo-input");
  let newItem = db.collection("todo-items").add({
    text: text.value,
    status: "active",
    correo: userEmail
  })
  text.value = "";

  getItems();
}

function markCompleted(id) {
  let item = db.collection("todo-items").doc(id);
  item.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().status == "active") {
        item.update({
          status: "completed"
        })
      } else {
        item.update({
          status: "active"
        })
      }
    }
  })
  setTimeout(() => { getItems(); }, 100);
  setTimeout(() => { getItems(); }, 150);
  setTimeout(() => { getItems(); }, 250);
  setTimeout(() => { getItems(); }, 350);
  setTimeout(() => { getItems(); }, 500);
  setTimeout(() => { getItems(); }, 1000);
}

function deleteCompleted() {
  db.collection("todo-items").where("status", "==", "completed").get().then((querySnapshot) => {
    querySnapshot.forEach((document) => {
      db.collection("todo-items").doc(document.id).delete();
    });
  })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  getItems();
  setTimeout(() => { getItems(); }, 100);
  setTimeout(() => { getItems(); }, 150);
  setTimeout(() => { getItems(); }, 250);
  setTimeout(() => { getItems(); }, 300);
  setTimeout(() => { getItems(); }, 350);
  setTimeout(() => { getItems(); }, 500);
  setTimeout(() => { getItems(); }, 1000);
}

function showActive() {
  document.getElementById("active-tag").style.color = "#3a7bfd";
  document.getElementById("completed-tag").style.color = "#4d5066";
  document.getElementById("all-tag").style.color = "#4d5066";
  db.collection("todo-items").where("correo", "==", userEmail).where("status", "==", "active").get().then((querySnapshot) => {
    let items = [];
    querySnapshot.forEach((document) => {
      items.push({
        id: document.id,
        ...document.data()
      })
      generateItems(items);
    });
  })
    .catch((error) => {
      console.log(error);
    });
}

function showCompleted() {
  document.getElementById("completed-tag").style.color = "#3a7bfd";
  document.getElementById("active-tag").style.color = "#4d5066";
  document.getElementById("all-tag").style.color = "#4d5066";
  db.collection("todo-items").where("correo", "==", userEmail).where("status", "==", "completed").get().then((querySnapshot) => {
    let items = [];
    querySnapshot.forEach((document) => {
      items.push({
        id: document.id,
        ...document.data()
      })
      generateItems(items);
    });
  })
    .catch((error) => {
      console.log(error);
    });
}


