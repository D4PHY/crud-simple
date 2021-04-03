const todoForm = document.querySelector("[data-todo-form]");
const todoInput = todoForm.querySelector("input[name='title']");
const addTodoBtn = todoForm.querySelector("button[type='button']");
const deleteTodoBtn = todoForm.querySelector("[data-todo-delete]");
const todoList = document.querySelector("[data-todo-list]");

const apiUrl = "http://localhost:3000/todos";

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error("Bad response from server");
}

function renderTodo(data) {
  const todo = document.createElement("p");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = data.id;
  input.value = data.todo;
  input.addEventListener("change", handleCheckTodo);
  input.checked = data.status;
  const label = document.createElement("label");
  label.setAttribute("for", data.todo);
  label.innerText = data.todo;
  todo.appendChild(input);
  todo.appendChild(label);
  todoInput.value = "";

  todoList.appendChild(todo);
}

async function init(newTodo) {
  todoList.innerHTML = "";

  const todos = await fetch(apiUrl)
    .then(handleResponse)
    .then((data) => {
      data.forEach((item) => {
        const todoItem = renderTodo(item);
      });
    });
}

async function handleAddTodo(e) {
  e.preventDefault();
  if (todoInput.value === "") {
    return;
  }

  const newTodo = {
    todo: todoInput.value,
    isChecked: false,
    authorId: 1,
  };

  renderTodo(newTodo);

  const todoToServer = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json",
    },
  });
}

function handleCheckTodo(e) {
  todos.forEach((item) => {
    if (item.todo === e.target.value) {
      item.isChecked = e.target.checked;
    }
  });
}

function handleDeleteTodos() {
  todos = todos.filter((item) => item.isChecked === false);

  location = "/";
}

addTodoBtn.addEventListener("click", function (e) {
  handleAddTodo(e);
});

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleAddTodo();
  }
});

deleteTodoBtn.addEventListener("click", handleDeleteTodos);

document.addEventListener("DOMContentLoaded", init);

// localStorage.clear();
