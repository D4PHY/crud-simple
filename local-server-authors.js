(function () {
  const authorForm = document.querySelector("[data-authors]");
  const authorInput = authorForm.querySelector("input[name='author-input']");
  const addAuthorBtn = authorForm.querySelector("button[type='submit']");
  const deleteAuthorsBtn = authorForm.querySelector("button[type='button']");
  const authorList = document.querySelector("[data-authors-list]");

  const urlAuthorsApi = "http://localhost:3000/authors";

  function getUrlParam(queryParam) {
    return Number(queryParam.split("-")[1]);
  }

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Bad response from server");
  }

  // Populate author list with existing authors:
  function init() {
    fetch(urlAuthorsApi)
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
  function handleAddAuthor(e) {
    e.preventDefault();
    if (!authorInput.value) {
      return;
    }

    const data = authorInput.value;

    const newAuthor = { name: data, isChecked: false };

    fetch(urlAuthorsApi, {
      method: "POST",
      body: JSON.stringify(newAuthor),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(handleResponse)
      .then((result) => {
        const newAuthorElement = renderAuthor(result);
        authorList.appendChild(newAuthorElement);
      });

    authorInput.value = "";
  }

  // delete an author from the db and reflect on the page
  function handleDeleteAuthors() {
    const authorsChecked = authorList.querySelectorAll(
      "input[type ='checkbox']:checked"
    );

    authorsChecked.forEach((author) => {
      const authorId = getUrlParam(author.id);
      console.log(authorId);
      fetch(`${urlAuthorsApi}/${authorId}`, {
        method: "DELETE",
      });

      const authorCheckedParent = author.parentNode;
      authorCheckedParent.parentNode.removeChild(authorCheckedParent);
    });
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

  addAuthorBtn.addEventListener("click", handleAddAuthor);

  deleteAuthorsBtn.addEventListener("click", handleDeleteAuthors);

  init();
})();
