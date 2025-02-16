// VARIABLES
let isPaused = false;
let minutes = 25;
let seconds = 60;
let displayMin = document.getElementById("min");
let displaySec = document.getElementById("sec");
let startBtn = document.getElementById("startBtn");
let shortBreak = document.getElementById("short-break");
let longBreak = document.getElementById("long-break");
let pomodoro = document.getElementById("pomodoro");
let addTask = document.getElementById("add");
let option = document.getElementById("category");
let tasks = document.querySelectorAll(".to-do-column .task");
let alarm = document.getElementById("alarm");
let doneTasks = document.querySelectorAll("#done > li");
let contextMenu = document.querySelector(".context-menu");
let addDeletePanel = document.querySelector(".addDeletePanel");
let undo = document.querySelector(".undo");
let undoElement;
let intervalCountdown;
let pomodoroTimer = minutes * seconds;
let idCounter = 1;
let currentElement;

// 
function minutesPerOption() {
    if (timerType === pomodoro) {
        minutes = 25;
        pomodoroTimer = minutes * 60;
    } else if (timerType === shortBreak) {
        minutes = 5;
        pomodoroTimer = minutes * 60;
        minutes = minutes < 10 ? "0" + minutes : minutes
    } else if (timerType === longBreak) {
        minutes = 15;
        pomodoroTimer = minutes * 60;
        minutes = minutes < 10 ? "0" + minutes : minutes
    }
    displayMin.textContent = minutes;

}

// Función para diferente color según el select
function optionColor(selectedOption) {
    let newTasks = document.querySelectorAll(".new-task");
    newTasks.forEach((task) => {
        if (selectedOption === "1") {
            task.style.backgroundColor = "#55ade9";
        } else if (selectedOption === "2") {
            task.style.backgroundColor = "#d5b0ff";
        } else if (selectedOption === "3") {
            task.style.backgroundColor = "#c2b891";
        }
        // Le quito la clase para que cambie de color correctamente
        task.classList.remove("new-task");
    });
}

function countdown() {
    minutes = Math.floor(pomodoroTimer / 60);
    seconds = pomodoroTimer % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    displayMin.textContent = minutes;
    displaySec.textContent = seconds;

    // console.log(minutes, seconds);
    pomodoroTimer--;

    if (pomodoroTimer < 0) {
        clearInterval(intervalCountdown);
        alarm.play();
        setTimeout(() => {
            if (confirm("Time out")) {
                alarm.pause();
                alarm.currentTime = 0;
            }
        }, 100);
    }
    if (timerType == shortBreak || timerType == longBreak) {
        document.title = minutes + ":" + seconds + " - Break";
    } else {
        document.title = minutes + ":" + seconds + " - Work";
    }
}

function disabledButtons() {
    shortBreak.disabled = false;
    longBreak.disabled = false;
    pomodoro.disabled = true;
}

disabledButtons();

function panelControls() {
    shortBreak.onclick = function () {
        clearInterval(intervalCountdown);
        startBtn.textContent = "play_arrow";
        displaySec.textContent = '00';
        disabledButtons();
        timerType = shortBreak;
        minutesPerOption();
        shortBreak.disabled = true;
        pomodoro.disabled = false;
    };

    longBreak.onclick = function () {
        clearInterval(intervalCountdown);
        startBtn.textContent = "play_arrow";
        displaySec.textContent = '00';
        disabledButtons();
        timerType = longBreak;
        minutesPerOption();
        longBreak.disabled = true;
        pomodoro.disabled = false;
    };

    pomodoro.onclick = function () {
        clearInterval(intervalCountdown);
        startBtn.textContent = "play_arrow";
        displaySec.textContent = '00';
        disabledButtons();
        timerType = pomodoro;
        minutesPerOption();
        pomodoro.disabled = true;
    };
}

function currentDate() {
    const d = new Date();
    // 24 en vez de 2024
    let year = d.getFullYear().toString().slice(-2);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let currentDate =
        day +
        "/" +
        month +
        "/" +
        year +
        " " +
        hours +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes);
    return currentDate;
}

function deleteTasks() {
    if (document.getElementById("delete").innerHTML == "") {
        alert("No tasks to delete");
    } else {
        if (confirm("Do you want to permanently delete these tasks?")) {
            document.getElementById("delete").innerHTML = "";
        } else {
            return;
        }
    }
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    console.log(event.target.parentNode);
    undoElement = event.target.parentNode;
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let target = event.target;

    // Buscar el elemento de columna ascendiendo en la jerarquía de elementos DOM
    while (target && !target.classList.contains("column")) {
        target = target.parentNode;
    }
    // Comprobar si hay algun elemento de columna
    if (target && target.classList.contains("column")) {
        target
            .querySelector(".task-list")
            .appendChild(document.getElementById(data));
    }

    if (target && target.classList.contains("column")) {
        if (target.classList.contains("done-column"))
            document.getElementById(data).draggable = false;
    }
    else {
        document.getElementById(data).draggable = true;
    }

    let taskElement = document.getElementById(data);
    console.log(taskElement);
    // contextMenuPrint(taskElement);

    let checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-square-fill check-icon-svg" viewBox="0 0 16 16"><path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/></svg>';

    let deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>';



    let iconsContainer = document.createElement("div");
    iconsContainer.style.display = "flex";
    if (target.classList.contains("done-column")) {
        iconsContainer.style.justifyContent = 'space-between';
        if (taskElement.querySelector('.bi-trash')) {
            iconsContainer.innerHTML = checkIcon;
        } else {
            iconsContainer.innerHTML = deleteIcon + checkIcon;
        }
    } else {
        if (!taskElement.querySelector('.bi-trash')) {
            iconsContainer.innerHTML = deleteIcon;
        }
    }

    taskElement.appendChild(iconsContainer);

    iconsContainer.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task")) {
            taskElement.remove();
        } else {
            return;
        }
    });


}


// function contextMenuPrint(element) {
//   doneTasks.forEach((element) => {
//     element.addEventListener("contextmenu", function (e) {
//       e.preventDefault();
//       contextMenu.style.display = "block";
//       contextMenu.style.left = e.pageX + "px";
//       contextMenu.style.top = e.pageY + "px";
//       // Guardo el elemento al que se le ha dado click derecho
//       currentElement = this;
//       console.log(currentElement);
//     });
//   });
// }

// contextMenuPrint();

// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

// document.addEventListener("click", function () {
//   contextMenu.style.display = "none";
// });

// addDeletePanel.onclick = () => {
//   document.getElementById("delete").appendChild(currentElement);
//   currentElement = null;
// };

// undo.onclick = () => {
//   if (currentElement == null || undoElement == null) {
//     alert("You can´t undo this task");
//   } else {
//     undoElement.appendChild(currentElement);
//   }

//   currentElement = null;
//   undoElement = null;
// };

startBtn.onclick = function () {
    if (startBtn.textContent == 'play_arrow') {
        isPaused = false;
    }
    if (!isPaused) {
        intervalCountdown = setInterval(countdown, 1000);
        startBtn.textContent = "Pause";
    } else {
        clearInterval(intervalCountdown);
        startBtn.textContent = "Resume";
    }
    isPaused = !isPaused;
    countdown();
};

addTask.onclick = function () {
    let title = document.getElementById("taskText").value;
    let description = document.getElementById("description").value;
    let selectedOption = option.value;

    if (title == "" || description == "") {
        alert("Please add a title and a description");
        return;
    } else {
        let taskId = "task" + idCounter;
        idCounter++;

        let newTask = document.createElement("li");
        newTask.className = "task new-task";
        newTask.id = taskId;
        newTask.draggable = true;
        newTask.addEventListener("dragstart", drag);

        let titleElement = document.createElement("h5");
        titleElement.innerHTML = "<b>" + title + "</b>";

        let descriptionElement = document.createElement("p");
        descriptionElement.textContent = description;

        let dateElement = document.createElement("p");
        dateElement.textContent = currentDate();

        let deleteIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>';



        let iconsContainer = document.createElement("div");
        iconsContainer.style.display = "flex";
        if (!newTask.querySelector('.bi-trash')) {
            iconsContainer.innerHTML = deleteIcon;
        }


        newTask.appendChild(titleElement);
        newTask.appendChild(document.createElement("br"));
        newTask.appendChild(descriptionElement);
        newTask.appendChild(dateElement);
        newTask.appendChild(iconsContainer);

        iconsContainer.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this task")) {
                newTask.remove();
            } else {
                return;
            }
        });

        document.getElementById("to-do").appendChild(newTask);

        document.getElementById("taskText").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").value = "0";
        optionColor(selectedOption);
        console.log(currentDate());
    }
};

panelControls();
