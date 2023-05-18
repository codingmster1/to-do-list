import { allTasks, today, thisWeek, important, tabs } from './index';
import { myTaskList, clearTaskForm } from './createTask';
import { toggleComplete, togglePriority, editTask, deleteTask, isCompleteArray } from './editTask';
import { myProjectList, clearProjectForm } from './createProject';
import { editProject, deleteProject } from './editProject';

const mainContent = document.querySelector('.main-content');
const contentHeader = document.querySelector('.content-heading');
const toDoContainer = document.querySelector('.todo-container');
const taskForm = document.querySelector('.task-form');
const editTaskForm = document.querySelector('.edit-task-form');
const cancelBtn = document.querySelector('.cancel-btn');
const projectForm = document.querySelector('.project-form');
const addProjectBtn = document.querySelector('.project-btn');
const projectCancelBtn = document.querySelector('.project-cancel-btn');
const projectLinkContainer = document.querySelector('.project-links');
const titleInput = document.getElementById('title');
const projectNameInput = document.getElementById('project-name');
const menuBtn = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');

function highlightSelected(selectedTab) {
    tabs.forEach((tab) => {
        tab.classList.remove('selected');
    });

    selectedTab.classList.toggle('selected');
}

// Open form to add new tasks
function openTaskForm() {
    taskForm.style.display = 'block';
    titleInput.focus();
}

// Close form to add new tasks
function closeTaskForm() {
    taskForm.style.display = 'none';
    clearTaskForm();
}

cancelBtn.onclick = closeTaskForm;

// Open form to add new projects
function openProjectForm() {
    projectForm.style.display = 'block';
    projectNameInput.focus();
}

// Close form to add new projects
function closeProjectForm() {
    projectForm.style.display = 'none';
    clearProjectForm();
}

addProjectBtn.onclick = openProjectForm;
projectCancelBtn.onclick = closeProjectForm;


// Create and display the button to add new tasks
function displayTaskBtn() {
    const taskBtn = document.createElement('button');
    taskBtn.classList.add('task-btn');

    const btnImage = document.createElement('img');
    btnImage.src = './images/plus.svg';

    const btnText = document.createElement('div');
    btnText.textContent = 'Add Task';

    taskBtn.onclick = openTaskForm;

    taskBtn.appendChild(btnImage);
    taskBtn.appendChild(btnText);
    mainContent.appendChild(taskBtn);
}

// Remove the button to add new task (for filtered pages where you cannot add new task)
function removeTaskBtn() {
    if (mainContent.lastChild.className === 'task-btn') {
        mainContent.removeChild(mainContent.lastChild);
    }
}

// Display task details 
function displayDetails(task, taskDiv) {
    if (taskDiv.lastChild.className != 'details-display' && task.details) {
        const detailsDisplay = document.createElement('div');
        detailsDisplay.classList.add('details-display');
        detailsDisplay.textContent = task.details;
        taskDiv.appendChild(detailsDisplay);
    } else if (taskDiv.lastChild.className === 'details-display' && task.details) {
        taskDiv.removeChild(taskDiv.lastChild);
    }
}

// Display a singular task
function displayTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-div');
    toDoContainer.appendChild(taskDiv);

    const taskMain = document.createElement('div');
    taskMain.classList.add('task-main');
    taskDiv.appendChild(taskMain);

    const taskLeft = document.createElement('div');
    taskLeft.classList.add('task-left');
    taskMain.appendChild(taskLeft);

    const taskStatus = document.createElement('div');
    taskStatus.classList.add('task-status');
    taskLeft.appendChild(taskStatus);

    const taskIncomplete = document.createElement('img');
    taskIncomplete.src = './images/circle-unfilled.svg';
    const taskComplete = document.createElement('img');
    taskComplete.src = './images/circle-filled.svg';

    const titleDisplay = document.createElement('div');
    titleDisplay.classList.add('title-display');
    titleDisplay.textContent = task.title;
    taskLeft.appendChild(titleDisplay);

    // Style task depending on its completion status
    if (task.isComplete) {
        taskStatus.appendChild(taskComplete);
        titleDisplay.style.setProperty('text-decoration', 'line-through');
    } else {
        taskStatus.appendChild(taskIncomplete);
        taskIncomplete.classList.add('task-incomplete');
    }

    taskStatus.onclick = toggleComplete.bind(this, taskIncomplete, taskStatus, titleDisplay, task);

    // Display 'expand' image if task has details
    if (task.details) {
        const expandTask = document.createElement('img');
        expandTask.src = './images/expand-task.svg';
        taskLeft.appendChild(expandTask);
        expandTask.title = 'Click task to show details';
        expandTask.classList.add('expand-task');
    }
    
    const taskRight = document.createElement('div');
    taskRight.classList.add('task-right');
    taskMain.appendChild(taskRight);

    const dueDateDisplay = document.createElement('div');
    taskRight.appendChild(dueDateDisplay);

    if (!task.dueDate) {
        dueDateDisplay.textContent = 'No Due Date';
    } else {
        dueDateDisplay.textContent = task.dueDate;
    }

    const priorityStatus = document.createElement('button');
    priorityStatus.classList.add('priority-status');
    taskRight.appendChild(priorityStatus);

    const noPriority = document.createElement('img');
    noPriority.src = './images/star-unfilled.svg';
    const priority = document.createElement('img');
    priority.src = './images/star-filled.svg';

    // Style task depending on its priority status
    if (task.isImportant) {
        priorityStatus.appendChild(priority);
        priorityStatus.classList.add('priority');
    } else {
        priorityStatus.appendChild(noPriority);
        priorityStatus.classList.add('no-priority');
    }

    priorityStatus.onclick = togglePriority.bind(this, priorityStatus, task);

    const taskEditBtn = document.createElement('button')
    taskEditBtn.classList.add('task-edit-btn');
    taskRight.appendChild(taskEditBtn);

    const editBtnImg = document.createElement('img');
    editBtnImg.src = './images/edit.svg';
    taskEditBtn.appendChild(editBtnImg);

    taskEditBtn.onclick = editTask.bind(this, task, taskDiv, toDoContainer);
    const taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.classList.add('task-delete-btn');
    taskRight.appendChild(taskDeleteBtn);

    const deleteBtnImg = document.createElement('img');
    deleteBtnImg.src = './images/trash.svg';
    taskDeleteBtn.appendChild(deleteBtnImg);

    const currentIndex = myTaskList.indexOf(task);

    taskDeleteBtn.onclick = deleteTask.bind(this, currentIndex, task);

    taskDiv.onclick = displayDetails.bind(this, task, taskDiv);
}

// Clear current task display
function clearDisplay() {
    while (toDoContainer.firstChild && toDoContainer.firstChild.className != 'edit-task-form') {
        toDoContainer.removeChild(toDoContainer.firstChild);
    }

    while(toDoContainer.lastChild && toDoContainer.lastChild.className != 'edit-task-form') {
        toDoContainer.removeChild(toDoContainer.lastChild);
    }
    editTaskForm.style.display = 'none';
}

// Update task display depending on selected home category or project tab
function updateTaskDisplay() {
    clearDisplay();

    // If a task is complete, removes it from the task list temporarily
    for (let i = myTaskList.length - 1; i >= 0; i--) {
        const task = myTaskList[i];
        if (task.isComplete) {
            myTaskList.splice(myTaskList.indexOf(task), 1);
        }
    }

    // Sorts the remaining tasks that are uncompleted
    myTaskList.sort((a, b) => {
        let x;
        let y;

        if (!a.dueDate) {
            x = new Date('100000');
        } else {
            x = new Date(a.dueDate);
        }

        if (!b.dueDate) {
            y = new Date('100000');
        } else {
            y = new Date(b.dueDate);
        }

        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
    });

    // Saves uncompleted tasks to local storage
    localStorage.setItem("uncompletedTaskList", JSON.stringify(myTaskList));

    // Appends the completed tasks to the bottom of the sorted uncompleted tasks
    myTaskList.push.apply(myTaskList, isCompleteArray);

    // Gets and formats current date 
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let currentDate;
    if (month < 10 && day > 10) {
        currentDate = `${year}-0${month}-${day}`;
    } else if (month < 10 && day < 10) {
        currentDate = `${year}-0${month}-0${day}`;
    } else if (month > 10 && day < 10) {
        currentDate = `${year}-${month}-0${day}`;
    } else {
        currentDate = `${year}-${month}-${day}`;
    }

    // Filters task display depending on selected home category or project tab
    if (contentHeader.textContent === 'All Tasks') {
        myTaskList.forEach((task) => {
            displayTask(task);
        });
    } else if (contentHeader.textContent === 'Today') {
        const tasksToday = myTaskList.filter(task => task.dueDate === currentDate);
        tasksToday.forEach((task) => {
            displayTask(task);
        });
    } else if (contentHeader.textContent === 'This Week') {
        const currentWeekEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);

        const tasksThisWeek = myTaskList.filter(task => {
            const taskDateArray = task.dueDate.split('-');
            const taskYear = taskDateArray[0];
            const taskMonth = parseInt(taskDateArray[1], 10) - 1;
            const taskDay = taskDateArray[2];
            const taskDate = new Date(taskYear, taskMonth, taskDay);
            return (taskDate >= date && taskDate <= currentWeekEnd) || (task.dueDate === currentDate);
        });

        tasksThisWeek.forEach((task) => {
            displayTask(task);
        });
    } else if (contentHeader.textContent === 'Important') {
        const tasksImportant = myTaskList.filter(task => task.isImportant);
        tasksImportant.forEach((task) => {
            displayTask(task);
        });
    } else {
        const tasksByProject = myTaskList.filter(task => task.taskProject === contentHeader.textContent);
        tasksByProject.forEach((task) => {
            displayTask(task);
        })
    }
}

// Displays a project
function displayProject(project) {
    const projectLink = document.createElement('div');
    projectLink.classList.add('project-link');
    projectLinkContainer.appendChild(projectLink);

    const projectNameDisplay = document.createElement('div');
    projectNameDisplay.classList.add('project-name-display');
    projectNameDisplay.textContent = project.name;
    projectLink.appendChild(projectNameDisplay);

    const projectLinkBtns = document.createElement('div');
    projectLinkBtns.classList.add('project-link-btns');
    projectLink.appendChild(projectLinkBtns);

    const projectEditBtn = document.createElement('button');
    projectEditBtn.classList.add('project-edit-btn');
    projectLinkBtns.appendChild(projectEditBtn);
    const projectEditImg = document.createElement('img');
    projectEditImg.src = './images/edit.svg';
    projectEditBtn.appendChild(projectEditImg);

    const projectDeleteBtn = document.createElement('button');
    projectDeleteBtn.classList.add('project-delete-btn');
    projectLinkBtns.appendChild(projectDeleteBtn);

    const projectDeleteImg = document.createElement('img');
    projectDeleteImg.src = './images/trash.svg';
    projectDeleteBtn.appendChild(projectDeleteImg);

    tabs.push(projectLink);

    // Displays appropriate tasks whenever a project tab is selected
    projectLink.onclick = function() {
        removeTaskBtn();
        displayTaskBtn();
        highlightSelected(projectLink);
        contentHeader.textContent = projectLink.firstChild.textContent;
        updateTaskDisplay();
        closeTaskForm();
    }
    projectEditBtn.onclick = editProject.bind(this, project, projectLink, projectLinkContainer, projectNameDisplay, contentHeader);

    projectDeleteBtn.onclick = deleteProject.bind(this, project, projectLink, projectLinkContainer, contentHeader);
}

// Initial project display on page load up
function initialProjectDisplay() {
    myProjectList.forEach((project) => {
        displayProject(project);
    });
}

// Functions to display appropriate tasks for selected home category tab
function displayAllTasks() {
    removeTaskBtn();
    displayTaskBtn();
    highlightSelected(allTasks);
    contentHeader.textContent = 'All Tasks';
    updateTaskDisplay();
    closeTaskForm();
}

function displayToday() {
    removeTaskBtn();
    highlightSelected(today);
    contentHeader.textContent = 'Today';
    updateTaskDisplay();
    closeTaskForm();
}

function displayThisWeek() {
    removeTaskBtn();
    highlightSelected(thisWeek);
    contentHeader.textContent = 'This Week';
    updateTaskDisplay();
    closeTaskForm();
}

function displayImportant() {
    removeTaskBtn();
    highlightSelected(important);
    contentHeader.textContent = 'Important';
    updateTaskDisplay();
    closeTaskForm();
}

// Opens menu in mobile view
function openMenu() {
    sidebar.classList.add('show-sidebar');
}

// Closes menu in mobile view
function closeMenu() {
    sidebar.classList.remove('show-sidebar');
}

// Event listener for the menu button in mobile view
menuBtn.addEventListener('click', () => {
    if (sidebar.classList.value === 'sidebar') {
        openMenu();
    } else {
        closeMenu();
    }
});

export { displayAllTasks, displayToday, displayThisWeek, displayImportant, closeTaskForm, updateTaskDisplay, closeProjectForm, initialProjectDisplay, displayProject }