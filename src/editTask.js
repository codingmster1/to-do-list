import { myTaskList } from "./createTask";
import { updateTaskDisplay } from "./display";

const editTaskForm = document.querySelector('.edit-task-form');
const editTitleInput = document.getElementById('edit-title');
const editDetailsInput = document.getElementById('edit-details');
const editDueDateInput = document.getElementById('edit-due-date');
const editIsImportantInput = document.getElementById('edit-is-important');
const editSubmitBtn = document.querySelector('.edit-submit-btn');
const editCancelBtn = document.querySelector('.edit-cancel-btn');
const isCompleteArray = [];

// Ignores taskDiv onclick event when buttons within the taskDiv are clicked
function ignoreEvent(e) {
    if (!e) {
        e = window.event;
    }
    e.stopPropagation();
}

// Toggles the completion status of a task whenever the checkbox is clicked
function toggleComplete(status, statusContainer, title, task) {
    ignoreEvent();

    if (status.classList.value === 'task-incomplete') {
        status.classList.toggle('task-incomplete');
        statusContainer.removeChild(statusContainer.lastChild);

        const taskComplete = document.createElement('img');
        taskComplete.src = './images/circle-filled.svg';
        statusContainer.appendChild(taskComplete);

        title.style.setProperty('text-decoration', 'line-through');

        task.isComplete = true;

        isCompleteArray.push(myTaskList.splice(myTaskList.indexOf(task), 1)[0]);

        updateTaskDisplay();

    } else {
        status.classList.toggle('task-incomplete');
        statusContainer.removeChild(statusContainer.lastChild);

        const taskIncomplete = document.createElement('img');
        taskIncomplete.src = './images/circle-unfilled.svg';
        statusContainer.appendChild(taskIncomplete);

        title.style.setProperty('text-decoration', 'none');

        task.isComplete = false;

        isCompleteArray.splice(isCompleteArray.indexOf(task), 1);

        updateTaskDisplay();
    }

    localStorage.setItem("isCompleteArray", JSON.stringify(isCompleteArray));
}

// Toggles the priority status of a task whenever the star is clicked
function togglePriority(statusContainer, task) {
    ignoreEvent();

    if (statusContainer.classList.value === 'priority-status priority') {
        statusContainer.classList.toggle('priority');
        statusContainer.classList.toggle('no-priority');
        statusContainer.removeChild(statusContainer.lastChild);

        const noPriority = document.createElement('img');
        noPriority.src = './images/star-unfilled.svg';
        statusContainer.appendChild(noPriority);

        task.isImportant = false;
    } else if (statusContainer.classList.value === 'priority-status no-priority') {
        statusContainer.classList.toggle('no-priority');
        statusContainer.classList.toggle('priority');
        statusContainer.removeChild(statusContainer.lastChild);

        const priority = document.createElement('img');
        priority.src = './images/star-filled.svg';
        statusContainer.appendChild(priority);

        task.isImportant = true;
    }

    if (isCompleteArray) {
        localStorage.setItem("uncompletedTaskList", JSON.stringify(myTaskList));
        localStorage.setItem("isCompleteArray", JSON.stringify(isCompleteArray));
    } else {
        localStorage.setItem("myTaskList", JSON.stringify(myTaskList));
    }
}

// Opens form to edit tasks
function openEditTaskForm() {
    editTaskForm.style.display = 'block';
    editTitleInput.focus();
}

// Clears input fields on form to edit tasks
function clearEditTaskForm() {
    editTitleInput.value = '';
    editDetailsInput.value = '';
    editDueDateInput.value = '';
    editIsImportantInput.checked = false;
}

// Displays hidden task (the task currently being edited, which is hidden when form to edit task opens)
function showHiddenTask() {
    const openTask = document.querySelector('.editing-task');
    openTask.classList.toggle('editing-task');
}

// Closes form to edit tasks
function closeEditTaskForm() {
    editTaskForm.style.display = 'none';
    clearEditTaskForm();
    showHiddenTask();
}

// Autofills input fields on form to edit tasks with the current task info of the task being edited
function autofillTaskInfo(task) {
    editTitleInput.value = task.title;
    editDueDateInput.value = task.dueDate;
    editIsImportantInput.checked = task.isImportant;
    if (task.details) {
        editDetailsInput.value = task.details;
    } else {
        editDetailsInput.value = '';
    }
}

// Opens the form to edit tasks on the selected task
function editTask(task, taskDiv, toDoContainer) {
    ignoreEvent();

    if (editTaskForm.style.display === 'none') {
        taskDiv.classList.toggle('editing-task');
        openEditTaskForm();
        toDoContainer.insertBefore(editTaskForm, taskDiv);
        autofillTaskInfo(task);
        editTitleInput.focus();
    } else {
        showHiddenTask();
        taskDiv.classList.toggle('editing-task');
        toDoContainer.insertBefore(editTaskForm, taskDiv);
        autofillTaskInfo(task);
        editTitleInput.focus();
    }

    // Saves the new task information when the save button is clicked
    editSubmitBtn.onclick = function(e) {
        if (!editTaskForm.checkValidity()) {
            editTaskForm.reportValidity();
        } else {
            task.title = editTitleInput.value;
            task.details = editDetailsInput.value;
            task.dueDate = editDueDateInput.value;
            task.isImportant = editIsImportantInput.checked;

            closeEditTaskForm();
            updateTaskDisplay();
            if (isCompleteArray) {
                localStorage.setItem("uncompletedTaskList", JSON.stringify(myTaskList));
                localStorage.setItem("isCompleteArray", JSON.stringify(isCompleteArray));
            } else {
                localStorage.setItem("myTaskList", JSON.stringify(myTaskList));
            }
            e.preventDefault();
        }
    };

    editCancelBtn.onclick = closeEditTaskForm;
}

// Deletes selected task from appropriate arrays and updates display
function deleteTask(index, task) {
    ignoreEvent();
    myTaskList.splice(index, 1);

    if (isCompleteArray.includes(task)) {
        isCompleteArray.splice(isCompleteArray.indexOf(task), 1);
    }

    updateTaskDisplay();

    if (isCompleteArray) {
        localStorage.setItem("uncompletedTaskList", JSON.stringify(myTaskList));
        localStorage.setItem("isCompleteArray", JSON.stringify(isCompleteArray));
    } else {
        localStorage.setItem("myTaskList", JSON.stringify(myTaskList));
    }
}

export { toggleComplete, togglePriority, editTask, deleteTask, ignoreEvent, isCompleteArray }