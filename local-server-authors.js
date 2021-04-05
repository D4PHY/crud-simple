(function () {
  const authorForm = document.querySelector("[data-authors]");
  const authorInput = authorForm.querySelector("input[name='author-input']");
  const addAuthorBtn = authorForm.querySelector("button[type='submit']");
  const authorList = document.querySelector("[data-authors-list]");

  const urlApi = "http://localhost:3000/authors";

  function getUrlParam() {}

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Bad response from server");
  }

  // Populate author list with existing authors:
  function init() {
    fetch(urlApi)
      .then(handleResponse)
      .then((authors) => {
        const fragment = document.createDocumentFragment();
        authors.forEach((author) => {
          console.log(author);
          const newAuthor = renderAuthor(author);
          fragment.appendChild(newAuthor);
        });
        authorList.appendChild(fragment);
      });
  }

  // add a new author to the data base and also to the page
  function handleAddAuthor() {}

  // edit the name of an author on db. and refelect on the page
  function handleEditAuthor() {}

  // delete an author from the db and reflect on the page
  function deleteAuthor() {}

  {
    /* <p class="author-container">
    <input type="checkbox" id="author-1" value="D4phy" />
    <label for="author-1">D4phy</label>
</p> */
  }

  // create html for author component
  function renderAuthor(data) {
    const authorContainer = document.createElement("p");
    authorContainer.classList.add("author-container");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `author-${data.id}`;
    input.value = data.name;
    input.checked = data.isChecked;
    const label = document.createElement("label");
    label.setAttribute("for", data.name);
    label.innerText = data.name;

    authorContainer.appendChild(input);
    authorContainer.appendChild(label);

    return authorContainer;
  }

  init();
})();
