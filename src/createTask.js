import { closeTaskForm, updateTaskDisplay } from "./display";
import { myProjectList } from "./createProject";

const contentHeader = document.querySelector('.content-heading');
const titleInput = document.getElementById('title');
const detailsInput = document.getElementById('details');
const dueDateInput = document.getElementById('due-date');
const isImportantInput = document.getElementById('is-important');
const addTaskForm = document.querySelector('.task-form');
const addTaskBtn = document.querySelector('.submit-btn');
const myTaskList = [];

// Factory function to create a new task object
const task = (title, details, dueDate, isImportant, isComplete, taskProject) => ({ title, details, dueDate, isImportant, isComplete, taskProject });

// Saves current state of myTaskList and myProjectList to local storage
function saveToLocalStorage() {
    localStorage.setItem("myTaskList", JSON.stringify(myTaskList));
    localStorage.setItem("myProjectList", JSON.stringify(myProjectList));
}

// Creates a new task object and pushes it to myTaskList array
function addTask() {
    const title = titleInput.value;
    const details = detailsInput.value;
    const dueDate = dueDateInput.value;
    const isImportant = isImportantInput.checked;
    const isComplete = false;
    let taskProject = '';

    // Sets a task's project if it is created under a project display
    myProjectList.forEach((project) => {
        if (contentHeader.textContent === project.name) {
            taskProject = project.name;
        }
    });

    const newTask = task(title, details, dueDate, isImportant, isComplete, taskProject);
    myTaskList.push(newTask);
    updateTaskDisplay();
    saveToLocalStorage();
    return newTask;
}

// Clears form to add new task
function clearTaskForm() {
    titleInput.value = '';
    detailsInput.value = '';
    dueDateInput.value = '';
    isImportantInput.checked = false;
}

// Adds the new task when the 'add' button is clicked
addTaskBtn.addEventListener('click', (e) => {
    if (!addTaskForm.checkValidity()) {
        addTaskForm.reportValidity();
    } else {
        addTask();
        closeTaskForm();
        e.preventDefault();
    }
});

export { myTaskList, clearTaskForm, saveToLocalStorage }