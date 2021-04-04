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

function renderTodo(todos) {
  const fragment = document.createDocumentFragment();

  todos.forEach((item) => {
    const todo = document.createElement("p");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = item.id;
    input.value = item.todo;
    input.addEventListener("change", handleCheckTodo);
    input.checked = item.isChecked;
    const label = document.createElement("label");
    label.setAttribute("for", item.todo);
    label.innerText = item.todo;
    todo.appendChild(input);
    todo.appendChild(label);

    todoInput.value = "";

    fragment.appendChild(todo);
  });

  todoList.appendChild(fragment);
}

function init() {
  fetch(apiUrl)
    .then(handleResponse)
    .then((data) => {
      console.log(data);
      renderTodo(data);
    });
}

function handleAddTodo() {
  if (todoInput.value === "") {
    return;
  }

  const newTodo = {
    todo: todoInput.value,
    isChecked: false,
    authorId: 1,
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then(handleResponse)
    .then((newTodo) => {
      renderTodo([newTodo]);
    });
}

function handleCheckTodo(e) {
  const idToDelete = Number(e.target.id);

  fetch(`${apiUrl}/${idToDelete}`, {
    method: "PATCH",
    body: JSON.stringify({ isChecked: e.target.checked }),
    headers: {
      "Content-type": "application/json",
    },
  });
}

function handleDeleteTodos() {
  const checkedTodos = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );

  checkedTodos.forEach((item) => {
    console.log("id:", item.id);
    fetch(`${apiUrl}/${item.id}`, {
      method: "DELETE",
    });

    const todoParent = item.parentNode;
    todoParent.parentNode.removeChild(todoParent);
  });
}

addTodoBtn.addEventListener("click", handleAddTodo);

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleAddTodo();
  }
});

deleteTodoBtn.addEventListener("click", handleDeleteTodos);

document.addEventListener("DOMContentLoaded", init);
