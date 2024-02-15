import {
  addNewProject,
  addNewTodo,
  allTodos,
  getCurrentProject,
  changeCurrentProject,
  deleteTodo,
  deleteProject,
  saveLocalStorage,
} from "./manageTodo";

const app = document.querySelector("#app");

// function

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function removeLastActiveProject() {
  const lastActive = document.querySelectorAll(".active-project");
  lastActive.forEach((container) =>
    container.classList.remove("active-project")
  );
}

function renderConditional() {
  const todosContainer = document.querySelector(".todos-container");

  if (getCurrentProject() === "home") {
    renderTodos(allTodos, todosContainer);
  } else {
    renderProjectTodos(allTodos, todosContainer);
  }
}

function updateActiveLastProject() {
  removeLastActiveProject();

  const lastProject = document.querySelector(".projects").lastChild;
  changeCurrentProject(lastProject.textContent);
  lastProject.classList.add("active-project");
  renderConditional();
}

function updateActiveProject() {
  removeLastActiveProject();

  document.querySelector(".projects").childNodes.forEach((project) => {
    if (project.id === getCurrentProject()) {
      project.classList.add("active-project");

      renderConditional();
    }
  });
}

function deleteAndRenderTodo(e) {
  const index = e.target.parentNode.getAttribute("data-index");

  deleteTodo(index);

  renderConditional();
}

function renderSingleTodo(projectTodos, element) {
  projectTodos.forEach((todo) => {
    const toDoBody = document.createElement("div");
    toDoBody.classList.add("todo-item");
    toDoBody.classList.add(`priority-${todo.priority.toLowerCase()}`);
    // give each to-do element a unique value that corresponds to
    // it's data's position in the array
    toDoBody.setAttribute("data-index", todo.id);
    // set data atrribute to the to-do items project name
    // create to-do item title

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = todo.id;
    checkbox.checked = todo.complete;
    toDoBody.appendChild(checkbox);

    const label = document.createElement("label");
    label.htmlFor = todo.id;

    const customCheckbox = document.createElement("span");
    customCheckbox.classList.add("custom-checkbox");
    label.appendChild(customCheckbox);

    label.append(todo.title);
    toDoBody.appendChild(label);

    // create to-do item details button
    const toDoDetails = document.createElement("div");
    toDoDetails.classList.add("todo__details");
    toDoDetails.textContent = todo.details;

    const toDoPriority = document.createElement("div");
    toDoPriority.classList.add("todo__priority");
    toDoPriority.textContent = todo.priority;

    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.classList.add("delete-todo");
    deleteTodoButton.textContent = "Delete";
    deleteTodoButton.addEventListener("click", (e) => deleteAndRenderTodo(e));

    toDoBody.appendChild(toDoDetails);
    toDoBody.appendChild(toDoPriority);
    toDoBody.appendChild(deleteTodoButton);

    element.appendChild(toDoBody);
  });
}

function renderTodos(todos, element) {
  const keys = Object.keys(todos);

  clearElement(element);

  for (let project = 0; project < keys.length; project += 1) {
    const todosToRender = todos[keys[project]];
    renderSingleTodo(todosToRender, element);
  }
}

function renderProjectTodos(todos, element) {
  const projectTodos = todos[getCurrentProject()];

  clearElement(element);

  if (projectTodos.length === 0) {
    // return;
  }

  renderSingleTodo(projectTodos, element);

  // save todos to local storage
}
function changeCurrentFolder(e) {
  changeCurrentProject(e.target.childNodes[0].textContent);

  renderConditional();
}

function showProjects(todos) {
  const todosContainer = document.querySelector(".todos-container");
  const projectContainer = document.querySelector(".projects");
  projectContainer.innerHTML = "";

  const projectsObject = { ...todos };

  const keys = Object.keys(projectsObject);

  for (let project = 0; project < keys.length; project += 1) {
    const projectName = document.createElement("li");
    projectName.classList.add("projects__item");
    projectName.id = keys[project];
    projectName.textContent = keys[project];
    projectName.addEventListener("click", (e) => {
      removeLastActiveProject();

      projectName.classList.add("active-project");

      changeCurrentFolder(e, allTodos, todosContainer);
    });
    projectContainer.appendChild(projectName);

    updateActiveProject();
  }

  // TODO: Finish Function
}

function openInputModal() {
  const modal = document.querySelector(".create-todo-modal");
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.querySelector(".create-todo-modal");
  modal.classList.add("hidden");
}

function createTodoDOM() {
  //* Create todo container
  const createTodoContainer = document.createElement("div");
  createTodoContainer.classList.add("add-todo-container");

  //* Add Todo button
  const createTodoButton = document.createElement("button");
  createTodoButton.type = "button";
  createTodoButton.classList.add("add-todo__button");
  createTodoButton.textContent = "+";
  createTodoContainer.appendChild(createTodoButton);

  //* Add Todo title
  const createTodoTitle = document.createElement("h2");
  createTodoTitle.textContent = "Add Task";
  createTodoContainer.appendChild(createTodoTitle);

  createTodoContainer.addEventListener("click", openInputModal);

  return createTodoContainer;
}

function projectsView(parent) {
  //* Projects View and add todo
  const projectsViewContainer = document.createElement("div");
  projectsViewContainer.classList.add("projects-container");
  parent.appendChild(projectsViewContainer);

  projectsViewContainer.appendChild(createTodoDOM());

  const projectsNames = document.createElement("ul");
  projectsNames.classList.add("projects");

  projectsViewContainer.appendChild(projectsNames);
}

function createForm(optionObject, optionChecked, parent) {
  const form = document.createElement("form");
  form.id = optionChecked;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    optionObject[optionChecked].handleFunctionality();
    form.reset();
    closeModal();
  });
  form.id = "create-todo";

  //* TodoTitle
  const todoTitle = document.createElement("textarea");
  todoTitle.placeholder = "Title";
  todoTitle.maxLength = 40;
  todoTitle.required = true;
  todoTitle.spellcheck = false;
  todoTitle.id = `new-${optionChecked.toLowerCase()}-title`;
  todoTitle.classList.add(
    "create-new__todo",
    `${optionObject[optionChecked].title ? "visible" : "hidden"}`
  );
  if (optionObject[optionChecked].title) {
    form.appendChild(todoTitle);
  }

  //* Todo details
  const todoDetails = document.createElement("textarea");
  todoDetails.placeholder = "Details";
  todoDetails.maxLength = 40;
  todoDetails.required = true;
  todoDetails.spellcheck = false;
  todoDetails.id = "new-todo-details";
  todoDetails.classList.add(
    "create-new__todo",
    "create-new__todo--details",
    `${optionObject[optionChecked].details ? "visible" : "hidden"}`
  );

  if (optionObject[optionChecked].details) {
    form.appendChild(todoDetails);
  }

  //* select priority
  const priorityContainer = document.createElement("div");
  priorityContainer.classList.add(
    "create-todo__priority",
    `${optionObject[optionChecked].priority ? "visible" : "hidden"}`
  );
  priorityContainer.id = "new-todo-priority";

  const priorityTitle = document.createElement("p");
  priorityTitle.textContent = "Priority: ";
  priorityContainer.appendChild(priorityTitle);

  // create an array of options
  const options = ["Low", "Medium", "High"];

  // <label for="create-new-low" class="create-new__priority-btn create-new__priority-btn--low">Low</label>

  // loop through the options and create option elements
  for (let i = 0; i < options.length; i += 1) {
    //* Radio Option
    const radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.id = `create-new-${options[i].toLowerCase()}`;
    radio.value = options[i];
    radio.name = "create-priority";
    radio.required = true;

    //* Radio Label
    const radioLabel = document.createElement("label");
    radioLabel.classList.add(
      "create-priority__btn",
      `create-priority__btn--${options[i].toLowerCase()}`
    );
    radioLabel.setAttribute("for", `create-new-${options[i].toLowerCase()}`);
    radioLabel.textContent = options[i];

    // append the option to the select element
    priorityContainer.appendChild(radio);
    priorityContainer.appendChild(radioLabel);
  }

  if (optionObject[optionChecked].priority) {
    form.appendChild(priorityContainer);
  }

  //* Submit Button
  const submitBtn = document.createElement("button");
  submitBtn.classList.add("create-todo__submit");
  submitBtn.textContent = "Submit";
  submitBtn.type = "submit";
  form.appendChild(submitBtn);

  parent.appendChild(form);
}

const optionObject = {
  Todo: {
    title: true,
    details: true,
    priority: true,
    handleFunctionality() {
      addNewTodo();

      renderConditional();
    },
  },
  Project: {
    title: true,
    details: false,
    priority: false,
    handleFunctionality() {
      addNewProject();
    },
  },
};

function formItemInput() {
  let checkedOption = "Todo";

  const modal = document.createElement("div");
  modal.classList.add("create-todo-modal", "hidden");

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options-container");
  modal.appendChild(optionsContainer);

  const optionsList = document.createElement("ul");

  const keys = Object.keys(optionObject);

  for (let option = 0; option < keys.length; option += 1) {
    const optionItem = document.createElement("li");
    optionItem.classList.add(
      "create-options",
      `create-options--${keys[option].toLowerCase()}`
    );
    optionItem.textContent = keys[option];
    optionItem.addEventListener("click", () => {
      if (checkedOption === keys[option]) {
        return;
      }
      checkedOption = keys[option];
      document.querySelector("form").remove();
      createForm(optionObject, checkedOption, optionsContainer);
    });
    optionsList.appendChild(optionItem);
  }

  optionsContainer.appendChild(optionsList);
  createForm(optionObject, checkedOption, optionsContainer);

  app.appendChild(modal);
}

function baseHomePage() {
  //* Full todos Container
  const TodosAndProjectsWrapper = document.createElement("div");
  TodosAndProjectsWrapper.classList.add("projects-todos-wrapper");

  //* Append add projects and add todos buttons
  projectsView(TodosAndProjectsWrapper);

  //* todos and delete project buttons
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");

  const todosContainer = document.createElement("div");
  todosContainer.addEventListener("click", (e) => {
    const projectsKeys = Object.keys(allTodos);
    if (e.target.tagName.toLowerCase() === "input") {
      for (let project = 0; project < projectsKeys.length; project += 1) {
        const selectedTask = allTodos[projectsKeys[project]].find(
          (todo) => todo.id === e.target.id
        );
        if (selectedTask) {
          selectedTask.complete = e.target.checked;
          saveLocalStorage();
        }
        // const selectedTask = allTodos.find(
        //   (task) => task.id === e.target.id
        // );
        // selectedTask.complete = e.target.checked;
        // TODO: Finish
        //  save();
        //  renderTaskCount(selectedList);
      }
    }
  });
  todosContainer.classList.add("todos-container");
  projectContainer.appendChild(todosContainer);

  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.textContent = "Delete";
  deleteProjectButton.addEventListener("click", () => {
    // TODO: finish
    deleteProject();
  });
  projectContainer.appendChild(deleteProjectButton);

  TodosAndProjectsWrapper.appendChild(projectContainer);

  app.appendChild(TodosAndProjectsWrapper);

  showProjects(allTodos);
  formItemInput();
}

export {
  baseHomePage,
  renderTodos,
  renderProjectTodos,
  showProjects,
  removeLastActiveProject,
  updateActiveLastProject,
};
