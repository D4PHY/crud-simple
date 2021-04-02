const todoForm = document.querySelector("[data-todo-form]");
const todoInput = todoForm.querySelector("input[name='title']");
const addTodoBtn = todoForm.querySelector("button[type='button']");
const deleteTodoBtn = todoForm.querySelector("[data-todo-delete]");
const todoList = document.querySelector("[data-todo-list]");

let localTodos = [];

if (!localStorage.getItem("todos")) {
  localStorage.setItem("todos", JSON.stringify(localTodos));
}

function handleAddTodo(todoValue, status) {
  const todo = document.createElement("p");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = "todo_1";
  input.value = todoValue;
  input.addEventListener("change", handleCheckTodo);
  input.checked = status;
  const label = document.createElement("label");
  label.setAttribute("for", todoValue);
  label.innerText = todoValue;
  todo.appendChild(input);
  todo.appendChild(label);

  todoList.appendChild(todo);

  localTodos.push({ todo: todoValue, isChecked: status });

  updateLocal();

  todoInput.value = "";
}

function updateLocal() {
  localStorage.setItem("todos", JSON.stringify(localTodos));
}

function persistTodo() {
  todoList.innerHTML = "";
  const todos = JSON.parse(localStorage.getItem("todos"));

  todos.forEach((item) => {
    handleAddTodo(item.todo, item.isChecked);
  });
}

function handleCheckTodo(e) {
  localTodos.forEach((item) => {
    if (item.todo === e.target.value) {
      item.isChecked = e.target.checked;
    }
  });

  updateLocal();
}

function handleDeleteTodos() {
  localTodos = localTodos.filter((item) => item.isChecked === false);

  updateLocal();

  location = "/";
}

addTodoBtn.addEventListener("click", function () {
  handleAddTodo(todoInput.value, false);
});

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleAddTodo(todoInput.value, false);
  }
});

deleteTodoBtn.addEventListener("click", handleDeleteTodos);

document.addEventListener("DOMContentLoaded", persistTodo);

// localStorage.clear();
