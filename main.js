(()=>{"use strict";var e="allTodos",t="currentProject",n=JSON.parse(localStorage.getItem("allTodos"))||{home:[]},o=localStorage.getItem(t)||"home";function r(){localStorage.setItem(e,JSON.stringify(n)),localStorage.setItem(t,o)}function a(e){o=e,r()}function i(){return o}var c=function(e){var t=n[i()],o=Object.keys(n);if("home"===i())for(var a=0;a<o.length;a+=1){var c=n[o[a]],d=c.findIndex((function(t){return t.id===e}));d>-1&&(c.splice(d,1),r())}var l=t.findIndex((function(t){return t.id===e}));l>-1&&(t.splice(l,1),r())};function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var s=document.querySelector("#app");function u(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function p(){document.querySelectorAll(".active-project").forEach((function(e){return e.classList.remove("active-project")}))}function m(){var e=document.querySelector(".todos-container");"home"===i()?f(n,e):h(n,e)}function v(e,t){e.forEach((function(e){var n=document.createElement("div");n.classList.add("todo-item"),n.classList.add("priority-".concat(e.priority.toLowerCase())),n.setAttribute("data-index",e.id);var o=document.createElement("input");o.type="checkbox",o.id=e.id,o.checked=e.complete,n.appendChild(o);var r=document.createElement("label");r.htmlFor=e.id;var a=document.createElement("span");a.classList.add("custom-checkbox"),r.appendChild(a),r.append(e.title),n.appendChild(r);var i=document.createElement("div");i.classList.add("todo__details"),i.textContent=e.details;var d=document.createElement("div");d.classList.add("todo__priority"),d.textContent=e.priority;var l=document.createElement("button");l.classList.add("delete-todo"),l.textContent="Delete",l.addEventListener("click",(function(e){return function(e){var t=e.target.parentNode.getAttribute("data-index");c(t),m()}(e)})),n.appendChild(i),n.appendChild(d),n.appendChild(l),t.appendChild(n)}))}function f(e,t){var n=Object.keys(e);u(t);for(var o=0;o<n.length;o+=1)v(e[n[o]],t)}function h(e,t){var n=e[i()];u(t),n.length,v(n,t)}function y(e){document.querySelector(".todos-container");var t=document.querySelector(".projects");t.innerHTML="";for(var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){var o,r,a,i;o=e,r=t,a=n[t],i=function(e,t){if("object"!=d(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!=d(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r),(r="symbol"==d(i)?i:String(i))in o?Object.defineProperty(o,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):o[r]=a})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e),o=Object.keys(n),r=function(){var e=document.createElement("li");e.classList.add("projects__item"),e.id=o[c],e.textContent=o[c],e.addEventListener("click",(function(t){p(),e.classList.add("active-project"),function(e){a(e.target.childNodes[0].textContent),m()}(t)})),t.appendChild(e),p(),document.querySelector(".projects").childNodes.forEach((function(e){e.id===i()&&(e.classList.add("active-project"),m())}))},c=0;c<o.length;c+=1)r()}function C(){document.querySelector(".create-todo-modal").classList.remove("hidden")}function b(e,t,n){var o=document.createElement("form");o.id=t,o.addEventListener("submit",(function(n){n.preventDefault(),e[t].handleFunctionality(),o.reset(),document.querySelector(".create-todo-modal").classList.add("hidden")})),o.id="create-todo";var r=document.createElement("textarea");r.placeholder="Title",r.maxLength=40,r.required=!0,r.spellcheck=!1,r.id="new-".concat(t.toLowerCase(),"-title"),r.classList.add("create-new__todo","".concat(e[t].title?"visible":"hidden")),e[t].title&&o.appendChild(r);var a=document.createElement("textarea");a.placeholder="Details",a.maxLength=40,a.required=!0,a.spellcheck=!1,a.id="new-todo-details",a.classList.add("create-new__todo","create-new__todo--details","".concat(e[t].details?"visible":"hidden")),e[t].details&&o.appendChild(a);var i=document.createElement("div");i.classList.add("create-todo__priority","".concat(e[t].priority?"visible":"hidden")),i.id="new-todo-priority";var c=document.createElement("p");c.textContent="Priority: ",i.appendChild(c);for(var d=["Low","Medium","High"],l=0;l<d.length;l+=1){var s=document.createElement("input");s.setAttribute("type","radio"),s.id="create-new-".concat(d[l].toLowerCase()),s.value=d[l],s.name="create-priority",s.required=!0;var u=document.createElement("label");u.classList.add("create-priority__btn","create-priority__btn--".concat(d[l].toLowerCase())),u.setAttribute("for","create-new-".concat(d[l].toLowerCase())),u.textContent=d[l],i.appendChild(s),i.appendChild(u)}e[t].priority&&o.appendChild(i);var p=document.createElement("button");p.classList.add("create-todo__submit"),p.textContent="Submit",p.type="submit",o.appendChild(p),n.appendChild(o)}var L={Todo:{title:!0,details:!0,priority:!0,handleFunctionality:function(){!function(){var e=document.querySelector("#new-todo-title").value,t=document.querySelector("#new-todo-details").value,o=document.querySelector('[name="create-priority"]:checked').value,a=Date.now().toString(),c=i();if(null!=e&&""!==e){var d=function(e,t,n,o){return{title:e,id:t,details:n,priority:o,complete:arguments.length>4&&void 0!==arguments[4]&&arguments[4]}}(e,a,t,o);n[c].push(d),r(),a+=1}}(),m()}},Project:{title:!0,details:!1,priority:!1,handleFunctionality:function(){var e,t;e=document.querySelector(".todos-container"),(t=document.querySelector("#new-project-title").value)&&!(t.toLowerCase()in n)?(n[t]=[],r(),a(t),y(n),"home"===i()?f(n,e):h(n,e)):t&&t.toLowerCase()in n&&("home"===t.toLowerCase()?(a(t.toLowerCase()),f(n,e)):(a(t.toLowerCase()),h(n,e)))}}};!function(){var e=document.createElement("div");e.classList.add("projects-todos-wrapper"),function(e){var t=document.createElement("div");t.classList.add("projects-container"),e.appendChild(t),t.appendChild(function(){var e=document.createElement("div");e.classList.add("add-todo-container");var t=document.createElement("button");t.type="button",t.classList.add("add-todo__button"),t.textContent="+",e.appendChild(t);var n=document.createElement("h2");return n.textContent="Add Task",e.appendChild(n),e.addEventListener("click",C),e}());var n=document.createElement("ul");n.classList.add("projects"),t.appendChild(n)}(e);var t=document.createElement("div");t.classList.add("project-container");var o=document.createElement("div");o.addEventListener("click",(function(e){var t=Object.keys(n);if("input"===e.target.tagName.toLowerCase())for(var o=0;o<t.length;o+=1){var a=n[t[o]].find((function(t){return t.id===e.target.id}));a&&(a.complete=e.target.checked,r())}})),o.classList.add("todos-container"),t.appendChild(o);var c=document.createElement("button");c.textContent="Delete",c.addEventListener("click",(function(){"home"!==i()?(delete n[i()],r(),y(n),function(){p();var e=document.querySelector(".projects").lastChild;a(e.textContent),e.classList.add("active-project"),m()}()):alert("Home Can't Be deleted")})),t.appendChild(c),e.appendChild(t),s.appendChild(e),y(n),function(){var e="Todo",t=document.createElement("div");t.classList.add("create-todo-modal","hidden");var n=document.createElement("div");n.classList.add("options-container"),t.appendChild(n);for(var o=document.createElement("ul"),r=Object.keys(L),a=function(t){var a=document.createElement("li");a.classList.add("create-options","create-options--".concat(r[t].toLowerCase())),a.textContent=r[t],a.addEventListener("click",(function(){e!==r[t]&&(e=r[t],document.querySelector("form").remove(),b(L,e,n))})),o.appendChild(a)},i=0;i<r.length;i+=1)a(i);n.appendChild(o),b(L,e,n),s.appendChild(t)}()}()})();