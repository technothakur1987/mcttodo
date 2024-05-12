function getToDo() {
  let todo = JSON.parse(localStorage.getItem("todo")) || [];

  if (todo.length === 0) {
    document.querySelector(".taskSection").innerHTML = "";
    document.querySelector(
      ".taskSection"
    ).innerHTML += `<h1 class='mt-5 text-center'>No Taks to Show Plz Add something...</h1>`;
  } else if (todo.length > 0) {
    document.querySelector(".taskSection").innerHTML = "";
    document.querySelector(".taskSection").innerHTML =
      '<ol class="todolist" onClick="allfunction(event) "></ol>';
    todo.map((task, index) => {
      document.querySelector(
        ".todolist"
      ).innerHTML += `<li key='${index}' class='text-capitalize mb-1 w-100 border d-flex align-items-center justify-content-between'>${
        index + 1
      }.  ${task.task}${
        task.status ? "✔️" : "❌"
      }<span><button class='btn btn-sm btn-success me-2' data-index='${index}'>🖊️</button><button class='btn btn-sm btn-primary me-2' data-index='${index}'>+</button><button class='btn btn-sm btn-danger' data-index='${index}'>🗑️</button></span></li>`;
    });
  }
}
getToDo();

function allfunction(event) {
  let editIndex = event.target.dataset.index;
  let todo = JSON.parse(localStorage.getItem("todo")) || [];
  if (event.target.classList[2] === "btn-danger") {
    todo.splice(Number(editIndex), 1);
    localStorage.clear("todo");
    localStorage.setItem("todo", JSON.stringify(todo));
  } else if (event.target.classList[2] === "btn-primary") {
    todo[Number(editIndex)].status = !todo[Number(editIndex)].status;
    localStorage.clear("todo");
    localStorage.setItem("todo", JSON.stringify(todo));
  } else if (event.target.classList[2] === "btn-success") {
    document.querySelector(".editSection").style.display = "block";
    document.querySelector("#edtask").setAttribute("data-index", event.target.dataset.index);
    document.querySelector("#edtask").value = todo[Number(editIndex)].task;
  } else if (event.target.classList[2] === "btn-warning") {
    let editIndex = document.querySelector("#edtask").getAttribute("data-index");
    let newTask = document.querySelector("#edtask").value;
    todo[Number(editIndex)].task = newTask;
    localStorage.clear("todo");
    localStorage.setItem("todo", JSON.stringify(todo));
    document.querySelector(".editSection").style.display = "none";
  }
  getToDo();
}

function addTaks() {
  if (document.querySelector("#task").value === "") {
    alert("Plz Enter a new task ");
  } else {
    let todo = JSON.parse(localStorage.getItem("todo")) || [];
    localStorage.clear("todo");
    todo.push({
      task: document.querySelector("#task").value,
      status: false,
    });
    //todo.push(document.querySelector('#task').value)
    localStorage.setItem("todo", JSON.stringify(todo));
    document.querySelector("#task").value = "";
    getToDo();
  }
}

function closeEditSection() {
  document.querySelector(".editSection").style.display = "none";
}