import {
  showProjects,
  renderProjectTodos,
  renderTodos,
  updateActiveLastProject,
} from "./domManagement";

const LOCAL_STORAGE_DATA_NAME = "allTodos";
const LOCAL_STORAGE_CURRENT_PROJECT = "currentProject";

const allTodos = JSON.parse(localStorage.getItem("allTodos")) || {
  home: [],
};

const createTodo = (title, id, details, priority, done = false) => ({
  title,
  id,
  details,
  priority,
  done,
});

let currentProject =
  localStorage.getItem(LOCAL_STORAGE_CURRENT_PROJECT) || "home";

function saveLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_DATA_NAME, JSON.stringify(allTodos));
  localStorage.setItem(LOCAL_STORAGE_CURRENT_PROJECT, currentProject);
}

function changeCurrentProject(newProject) {
  currentProject = newProject;
  saveLocalStorage();
}

function getCurrentProject() {
  return currentProject;
}

function addNewTodo() {
  const title = document.querySelector("#new-todo-title").value;
  const details = document.querySelector("#new-todo-details").value;
  const priority = document.querySelector(
    '[name="create-priority"]:checked'
  ).value;

  let id = Date.now().toString();
  console.log(id);

  const project = getCurrentProject();

  if (title == null || title === "") return;
  const newTodo = createTodo(title, id, details, priority);
  allTodos[project].push(newTodo);

  saveLocalStorage();

  id += 1;
}

function addNewProject() {
  const todosContainer = document.querySelector(".todos-container");
  const projectTitle = document.querySelector("#new-project-title").value;

  if (projectTitle && !(projectTitle.toLowerCase() in allTodos)) {
    allTodos[projectTitle] = [];

    saveLocalStorage();

    changeCurrentProject(projectTitle);

    showProjects(allTodos);

    if (getCurrentProject() === "home") {
      renderTodos(allTodos, todosContainer);
    } else {
      renderProjectTodos(allTodos, todosContainer);
    }
  } else if (projectTitle && projectTitle.toLowerCase() in allTodos) {
    // render all to-dos from all projects if on the home page. otherwise
    // only render the relevent to-do items
    if (projectTitle.toLowerCase() === "home") {
      changeCurrentProject(projectTitle.toLowerCase());
      renderTodos(allTodos, todosContainer);
    } else {
      changeCurrentProject(projectTitle.toLowerCase());
      renderProjectTodos(allTodos, todosContainer);
    }
  }
}
const deleteTodo = (index) => {
  const todoList = allTodos[getCurrentProject()];
  const keys = Object.keys(allTodos);

  if (getCurrentProject() === "home") {
    for (let project = 0; project < keys.length; project += 1) {
      //* projectTodos is a project, the array of objects that are to-dos

      const projectTodos = allTodos[keys[project]];

      const indexToRemove = projectTodos.findIndex((todo) => todo.id === index);

      if (indexToRemove > -1) {
        projectTodos.splice(indexToRemove, 1);
        saveLocalStorage();
      }
    }
  }

  const indexToRemove = todoList.findIndex((obj) => obj.id === index);

  if (indexToRemove > -1) {
    todoList.splice(indexToRemove, 1);
    saveLocalStorage();
  }
};

const deleteProject = () => {
  if (getCurrentProject() === "home") {
    return;
    // TODO: display a message saying it cant be removed home
  }
  delete allTodos[getCurrentProject()];
  saveLocalStorage();

  showProjects(allTodos);

  updateActiveLastProject();
};

export {
  deleteProject,
  createTodo,
  addNewTodo,
  addNewProject,
  getCurrentProject,
  deleteTodo,
  changeCurrentProject,
  allTodos,
};
