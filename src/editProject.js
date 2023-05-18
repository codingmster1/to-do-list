import { ignoreEvent , isCompleteArray } from "./editTask";
import { myProjectList } from "./createProject";
import { displayAllTasks, updateTaskDisplay } from "./display";
import { myTaskList } from "./createTask";

const editProjectForm = document.querySelector('.edit-project-form');
const editProjectNameInput = document.querySelector('.edit-project-name-input');
const editProjectSubmitBtn = document.querySelector('.edit-project-submit-btn');
const editProjectCancelBtn = document.querySelector('.edit-project-cancel-btn');


// Opens form to edit projects
function openEditProjectForm() {
    editProjectForm.style.display = 'block';
}

// Clears input fields on form to edit projects
function clearEditProjectForm() {
    editProjectNameInput.value = '';
}

// Displays hidden project (the project currently being edited, which is hidden when form to edit project opens)
function showHiddenProject() {
    const openProject = document.querySelector('.editing-project');
    openProject.classList.toggle('editing-project');
}

// Closes form to edit projects
function closeEditProjectForm() {
    editProjectForm.style.display = 'none';
    clearEditProjectForm();
    showHiddenProject();
}

// Autofills input field on form to edit projects with the current info of the project being edited
function autofillProjectInfo(project) {
    editProjectNameInput.value = project.name;
}

// Opens the form to edit projects on the selected project
function editProject(project, projectLink, projectLinkContainer, projectNameDisplay, contentHeader) {
    ignoreEvent();

    if (editProjectForm.style.display === '' || editProjectForm.style.display === 'none') {
        projectLink.classList.toggle('editing-project');
        openEditProjectForm();
        projectLinkContainer.insertBefore(editProjectForm, projectLink);
        autofillProjectInfo(project);
        editProjectNameInput.focus();
    } else {
        showHiddenProject();
        projectLink.classList.toggle('editing-project');
        projectLinkContainer.insertBefore(editProjectForm, projectLink);
        autofillProjectInfo(project);
        editProjectNameInput.focus();
    }

    // Saves the new project information when the save button is clicked
    editProjectSubmitBtn.onclick = function(e) {
        if (!editProjectForm.checkValidity()) {
            editProjectForm.reportValidity();
        } else {
            if (project.name === contentHeader.textContent) {
                contentHeader.textContent = editProjectNameInput.value;
            }
            project.name = editProjectNameInput.value;
            projectNameDisplay.textContent = project.name;
            console.log(project.name);
            
            closeEditProjectForm();
            localStorage.setItem("myProjectList", JSON.stringify(myProjectList));
            e.preventDefault();
        }
    }

    editProjectCancelBtn.onclick = closeEditProjectForm;
}

// Deletes the selected project and updates display
function deleteProject(project, projectLink, projectLinkContainer, contentHeader) {
    ignoreEvent();

    for (let i = myTaskList.length - 1; i >= 0; i--) {
        const task = myTaskList[i];
        if (task.taskProject === project.name) {
            myTaskList.splice(myTaskList.indexOf(task), 1);
            updateTaskDisplay();
        }
    }

    for (let i = isCompleteArray.length - 1; i >= 0; i--) {
        const completedTask = isCompleteArray[i];
        if (completedTask.taskProject === project.name) {
            isCompleteArray.splice(isCompleteArray.indexOf(completedTask), 1);
            localStorage.setItem("isCompleteArray", JSON.stringify(isCompleteArray));
            updateTaskDisplay();
        }
    }

    if (project.name === contentHeader.textContent) {
        displayAllTasks();
    }

    myProjectList.splice(myProjectList.indexOf(project), 1);
    projectLinkContainer.removeChild(projectLink);
    localStorage.setItem("myProjectList", JSON.stringify(myProjectList));
}

export { editProject, deleteProject }