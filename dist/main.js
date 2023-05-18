(()=>{var e={937:()=>{},583:()=>{}},t={};function n(s){var c=t[s];if(void 0!==c)return c.exports;var a=t[s]={exports:{}};return e[s](a,a.exports,n),a.exports}n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var s={};(()=>{"use strict";n.d(s,{s3:()=>W,ef:()=>z,eA:()=>H,Gg:()=>G,Lg:()=>Y});const e=document.querySelector(".project-form"),t=document.getElementById("project-name"),c=document.querySelector(".project-submit-btn"),a=[];c.addEventListener("click",(n=>{e.checkValidity()?(function(){const e={name:t.value};a.push(e),F(e),h()}(),$(),n.preventDefault()):e.reportValidity()}));const o=document.querySelector(".content-heading"),l=document.getElementById("title"),d=document.getElementById("details"),i=document.getElementById("due-date"),r=document.getElementById("is-important"),m=document.querySelector(".task-form"),u=document.querySelector(".submit-btn"),p=[];function h(){localStorage.setItem("myTaskList",JSON.stringify(p)),localStorage.setItem("myProjectList",JSON.stringify(a))}u.addEventListener("click",(e=>{m.checkValidity()?(function(){const e=l.value,t=d.value,n=i.value,s=r.checked;let c="";a.forEach((e=>{o.textContent===e.name&&(c=e.name)}));const m=((e,t,n,s,c,a)=>({title:e,details:t,dueDate:n,isImportant:s,isComplete:!1,taskProject:a}))(e,t,n,s,0,c);p.push(m),V(),h()}(),O(),e.preventDefault()):m.reportValidity()}));var g=n(583),y=n(937);const f=document.querySelector(".main-content"),C=document.querySelector(".content-heading"),k=document.querySelector(".todo-container"),v=document.querySelector(".task-form"),E=document.querySelector(".edit-task-form"),L=document.querySelector(".cancel-btn"),b=document.querySelector(".project-form"),S=document.querySelector(".project-btn"),x=document.querySelector(".project-cancel-btn"),I=document.querySelector(".project-links"),D=document.getElementById("title"),j=document.getElementById("project-name"),q=document.querySelector(".menu-btn"),N=document.querySelector(".sidebar");function T(e){H.forEach((e=>{e.classList.remove("selected")})),e.classList.toggle("selected")}function w(){v.style.display="block",D.focus()}function O(){v.style.display="none",l.value="",d.value="",i.value="",r.checked=!1}function $(){b.style.display="none",t.value=""}function B(){const e=document.createElement("button");e.classList.add("task-btn");const t=document.createElement("img");t.src="./images/plus.svg";const n=document.createElement("div");n.textContent="Add Task",e.onclick=w,e.appendChild(t),e.appendChild(n),f.appendChild(e)}function A(){"task-btn"===f.lastChild.className&&f.removeChild(f.lastChild)}function P(e,t){if("details-display"!=t.lastChild.className&&e.details){const n=document.createElement("div");n.classList.add("details-display"),n.textContent=e.details,t.appendChild(n)}else"details-display"===t.lastChild.className&&e.details&&t.removeChild(t.lastChild)}function J(e){const t=document.createElement("div");t.classList.add("task-div"),k.appendChild(t);const n=document.createElement("div");n.classList.add("task-main"),t.appendChild(n);const s=document.createElement("div");s.classList.add("task-left"),n.appendChild(s);const c=document.createElement("div");c.classList.add("task-status"),s.appendChild(c);const a=document.createElement("img");a.src="./images/circle-unfilled.svg";const o=document.createElement("img");o.src="./images/circle-filled.svg";const l=document.createElement("div");if(l.classList.add("title-display"),l.textContent=e.title,s.appendChild(l),e.isComplete?(c.appendChild(o),l.style.setProperty("text-decoration","line-through")):(c.appendChild(a),a.classList.add("task-incomplete")),c.onclick=g.toggleComplete.bind(this,a,c,l,e),e.details){const e=document.createElement("img");e.src="./images/expand-task.svg",s.appendChild(e),e.title="Click task to show details",e.classList.add("expand-task")}const d=document.createElement("div");d.classList.add("task-right"),n.appendChild(d);const i=document.createElement("div");d.appendChild(i),e.dueDate?i.textContent=e.dueDate:i.textContent="No Due Date";const r=document.createElement("button");r.classList.add("priority-status"),d.appendChild(r);const m=document.createElement("img");m.src="./images/star-unfilled.svg";const u=document.createElement("img");u.src="./images/star-filled.svg",e.isImportant?(r.appendChild(u),r.classList.add("priority")):(r.appendChild(m),r.classList.add("no-priority")),r.onclick=g.togglePriority.bind(this,r,e);const h=document.createElement("button");h.classList.add("task-edit-btn"),d.appendChild(h);const y=document.createElement("img");y.src="./images/edit.svg",h.appendChild(y),h.onclick=g.editTask.bind(this,e,t,k);const f=document.createElement("button");f.classList.add("task-delete-btn"),d.appendChild(f);const C=document.createElement("img");C.src="./images/trash.svg",f.appendChild(C);const v=p.indexOf(e);f.onclick=g.deleteTask.bind(this,v,e),t.onclick=P.bind(this,e,t)}function V(){!function(){for(;k.firstChild&&"edit-task-form"!=k.firstChild.className;)k.removeChild(k.firstChild);for(;k.lastChild&&"edit-task-form"!=k.lastChild.className;)k.removeChild(k.lastChild);E.style.display="none"}();for(let e=p.length-1;e>=0;e--){const t=p[e];t.isComplete&&p.splice(p.indexOf(t),1)}p.sort(((e,t)=>{let n,s;return n=e.dueDate?new Date(e.dueDate):new Date("100000"),s=t.dueDate?new Date(t.dueDate):new Date("100000"),n<s?-1:n>s?1:0})),localStorage.setItem("uncompletedTaskList",JSON.stringify(p)),p.push.apply(p,g.isCompleteArray);const e=new Date,t=e.getDate(),n=e.getMonth()+1,s=e.getFullYear();let c;if(c=n<10&&t>10?`${s}-0${n}-${t}`:n<10&&t<10?`${s}-0${n}-0${t}`:n>10&&t<10?`${s}-${n}-0${t}`:`${s}-${n}-${t}`,"All Tasks"===C.textContent)p.forEach((e=>{J(e)}));else if("Today"===C.textContent){p.filter((e=>e.dueDate===c)).forEach((e=>{J(e)}))}else if("This Week"===C.textContent){const t=new Date(e.getFullYear(),e.getMonth(),e.getDate()+7);p.filter((n=>{const s=n.dueDate.split("-"),a=s[0],o=parseInt(s[1],10)-1,l=s[2],d=new Date(a,o,l);return d>=e&&d<=t||n.dueDate===c})).forEach((e=>{J(e)}))}else if("Important"===C.textContent){p.filter((e=>e.isImportant)).forEach((e=>{J(e)}))}else{p.filter((e=>e.taskProject===C.textContent)).forEach((e=>{J(e)}))}}function F(e){const t=document.createElement("div");t.classList.add("project-link"),I.appendChild(t);const n=document.createElement("div");n.classList.add("project-name-display"),n.textContent=e.name,t.appendChild(n);const s=document.createElement("div");s.classList.add("project-link-btns"),t.appendChild(s);const c=document.createElement("button");c.classList.add("project-edit-btn"),s.appendChild(c);const a=document.createElement("img");a.src="./images/edit.svg",c.appendChild(a);const o=document.createElement("button");o.classList.add("project-delete-btn"),s.appendChild(o);const l=document.createElement("img");l.src="./images/trash.svg",o.appendChild(l),H.push(t),t.onclick=function(){A(),B(),T(t),C.textContent=t.firstChild.textContent,V(),O()},c.onclick=y.editProject.bind(this,e,t,I,n,C),o.onclick=y.deleteProject.bind(this,e,t,I,C)}function M(){A(),B(),T(W),C.textContent="All Tasks",V(),O()}L.onclick=O,S.onclick=function(){b.style.display="block",j.focus()},x.onclick=$,q.addEventListener("click",(()=>{"sidebar"===N.classList.value?N.classList.add("show-sidebar"):N.classList.remove("show-sidebar")}));const W=document.getElementById("all-tasks"),Y=document.getElementById("today"),G=document.getElementById("this-week"),z=document.getElementById("important"),H=[W,Y,G,z];!function(){const e=JSON.parse(localStorage.getItem("myTaskList"));p.length=0,p.push.apply(p,e),g.isCompleteArray&&(function(){const e=JSON.parse(localStorage.getItem("isCompleteArray"));g.isCompleteArray.length=0,g.isCompleteArray.push.apply(g.isCompleteArray,e)}(),function(){const e=JSON.parse(localStorage.getItem("uncompletedTaskList"));p.length=0,p.push.apply(p,e)}());const t=JSON.parse(localStorage.getItem("myProjectList"));a.length=0,a.push.apply(a,t)}(),a.forEach((e=>{F(e)})),M(),W.addEventListener("click",M),Y.addEventListener("click",(function(){A(),T(Y),C.textContent="Today",V(),O()})),G.addEventListener("click",(function(){A(),T(G),C.textContent="This Week",V(),O()})),z.addEventListener("click",(function(){A(),T(z),C.textContent="Important",V(),O()}))})()})();