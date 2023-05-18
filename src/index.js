import { displayAllTasks, displayToday, displayThisWeek, displayImportant, initialProjectDisplay, updateTaskDisplay } from './display';
import { myTaskList } from './createTask';
import { myProjectList } from './createProject';
import { isCompleteArray } from './editTask';

const allTasks = document.getElementById('all-tasks');
const today = document.getElementById('today');
const thisWeek = document.getElementById('this-week');
const important = document.getElementById('important');
const tabs = [allTasks, today, thisWeek, important];

// LOCAL STORAGE

// Local storage current completed tasks
function getCompletedTasks() {
    const storedCompletedTasks = JSON.parse(localStorage.getItem("isCompleteArray"));
    isCompleteArray.length = 0;
    isCompleteArray.push.apply(isCompleteArray, storedCompletedTasks);
}

// UncompletedTaskList local storage uncompleted tasks
function getUncompletedTasks() {
    const storedUncompletedTasks = JSON.parse(localStorage.getItem("uncompletedTaskList"));
    myTaskList.length = 0;
    myTaskList.push.apply(myTaskList, storedUncompletedTasks);
}

// Pulls myTaskList and myProjectList from local storage to get stored tasks and projects
// If the isCompleteArray is NOT empty, pulls completed and uncompleted task lists from local storage
function getLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem("myTaskList"));
    myTaskList.length = 0;
    myTaskList.push.apply(myTaskList, storedTasks);

    if (isCompleteArray) {
        getCompletedTasks();
        getUncompletedTasks();
    }

    const storedProjects = JSON.parse(localStorage.getItem("myProjectList"));
    myProjectList.length = 0;
    myProjectList.push.apply(myProjectList, storedProjects);
}

// Local storage and page display
getLocalStorage();
initialProjectDisplay();
displayAllTasks();

// Home tabs
allTasks.addEventListener('click', displayAllTasks);
today.addEventListener('click', displayToday);
thisWeek.addEventListener('click', displayThisWeek);
important.addEventListener('click', displayImportant);
  
export { allTasks, today, thisWeek, important, tabs, getLocalStorage }