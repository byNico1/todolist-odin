/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("var domManagement = function domManagement() {\n  var app = document.querySelector(\"#app\");\n  function checkListContainer() {\n    return document.createElement(\"ul\");\n  }\n  return {\n    //* Methods\n    checkListContainer: checkListContainer\n  };\n};\nvar createTodo = function createTodo(title, description, dueDate, priority) {\n  return {\n    title: title,\n    description: description,\n    dueDate: dueDate,\n    priority: priority\n  };\n};\nvar todo1 = createTodo();\nconsole.log(todo1);\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;