import { closeProjectForm, displayProject } from "./display";
import { saveToLocalStorage } from "./createTask";

const projectForm = document.querySelector('.project-form');
const projectNameInput = document.getElementById('project-name');
const projectSubmitBtn = document.querySelector('.project-submit-btn');
const myProjectList = [];

// Function to create new project 
const project = (name) => ({ name });

// Creates a new project and pushes it to myProjectList array
function addProject() {
    const name = projectNameInput.value;

    const newProject = project(name);
    myProjectList.push(newProject);
    displayProject(newProject);
    saveToLocalStorage();
    return newProject;
}

// Clears form to add new project
function clearProjectForm() {
    projectNameInput.value = '';
}

// Adds the new project when the 'add' button is clicked
projectSubmitBtn.addEventListener('click', (e) => {
    if (!projectForm.checkValidity()) {
        projectForm.reportValidity();
    } else {
        addProject();
        closeProjectForm();
        e.preventDefault();
    }
});

export { myProjectList, clearProjectForm }