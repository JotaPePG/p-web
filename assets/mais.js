const formElement = document.getElementById("form");
const sendButton = document.getElementById("send");
const tabs = document.querySelectorAll(".tab-btn");
const date = new Date();
const today = date.getDate();

let listaDeTarefas = [];

tabs.forEach((tab) => tab.addEventListener("click", () => tabClicked(tab)));

const tabClicked = (tab) => {
  const contents = document.querySelectorAll(".container-content");
  const svgs = document.querySelectorAll(".svg");
  contents.forEach((content) => content.classList.remove("show"));
  tabs.forEach((tab) => tab.classList.remove("selected"));
  svgs.forEach((svg) => svg.classList.remove("selected"));

  const contentId = tab.getAttribute("content-id");
  const content = document.getElementById(contentId);
  const svg = document.querySelectorAll("[svg-id=" + contentId + "]");
  console.log(contentId);

  content.classList.add("show");
  tab.setAttribute("class", "tab-btn selected");
  svg[0].setAttribute("class", "svg selected");
};

const scheduledTasks = document.getElementsByName("scheduled-tasks")[0];
scheduledTasks.addEventListener("click", function () {
  const tasksJSON = localStorage.getItem("tasks");
  const tabelaContainer = document.getElementsByName("taskdiv-scheduled")[0];
  const tasks = JSON.parse(tasksJSON);
  tabelaContainer.innerHTML = "";
  tasks.forEach(function (task) {
    console.log(task.time);
    tabelaContainer.appendChild(criarTabelaParaTarefa(task));
  });
});

function salvarTarefa(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault(); // Impedir o envio do formulário

  const taskDescription = document.querySelector(".inserttask").value;
  const taskTime = document.querySelector(".inserttime").value;
  const taskDate = document.querySelector(".insertdate").value;
  const tabelaContainer = document.getElementById("taskdiv");

  tabelaContainer.innerHTML = "";

  const newTask = {
    description: taskDescription,
    time: taskTime,
    date: taskDate,
  };

  listaDeTarefas.push(newTask);

  salvarTarefa(newTask);
  formElement.reset();

  console.log(newTask);
  console.log(listaDeTarefas);

  const tasksJSON = localStorage.getItem("tasks");

  if (tasksJSON) {
    const tasks = JSON.parse(tasksJSON);
    let listaDeHorarios = [];
    tasks.forEach(function (task) {
      let objeto = {
        tarefa: task,
        time: task.time,
      };
      listaDeHorarios.push(objeto);
    });
    console.log(listaDeHorarios);
    listaDeHorarios = listaDeHorarios.sort((a, b) => {
      const timeA = a.time.split(":").map(Number);
      const timeB = b.time.split(":").map(Number);
      const dateA = new Date();
      const dateB = new Date();

      dateA.setHours(timeA[0], timeA[1]);
      dateB.setHours(timeB[0], timeB[1]);

      return dateA - dateB;
    });
    listaDeHorarios.forEach(function (task) {
      const tabelaTarefa = criarTabelaParaTarefa(task.tarefa);
      const taskDay = task.tarefa.date.slice(-2);
      console.log(taskDay);
      if (taskDay == today) {
        tabelaContainer.appendChild(tabelaTarefa);
      }
    });
  } else {
    console.log("Não há tarefas armazenadas no localStorage.");
  }
});

function buscarTarefas() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
}

function buscarElementoDeTarefa(elemento, indice) {
  const tasks = buscarTarefas();

  if (indice >= 0 && indice < tasks.length) {
    return tasks[indice][elemento];
  } else {
    return null;
  }
}

function criarTabelaParaTarefa(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const taskName = document.createElement("h2");
  taskName.classList.add("taskname", "formatc3");
  taskName.textContent = task.description;

  const timeCheckboxDiv = document.createElement("div");
  timeCheckboxDiv.classList.add("time-checkbox");

  const taskTime = document.createElement("h2");
  taskTime.classList.add("formatc3");
  taskTime.textContent = task.time;

  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox-todaytasks");
  checkbox.setAttribute("onclick", "checkTask(this)");

  timeCheckboxDiv.appendChild(taskTime);
  timeCheckboxDiv.appendChild(checkbox);
  taskDiv.appendChild(taskName);
  taskDiv.appendChild(timeCheckboxDiv);

  return taskDiv;
}

function criarTabelasParaTarefas(listaDeTarefas) {
  const tabelaContainer = document.getElementById("taskdiv");

  tabelaContainer.innerHTML = "";

  listaDeTarefas.forEach(function (task) {
    const tabelaTarefa = criarTabelaParaTarefa(task);
    tabelaContainer.appendChild(tabelaTarefa);
  });
}

// Verifica se os inputs estão em branco

document.addEventListener("DOMContentLoaded", function () {
  const inserttime = document.getElementById("inserttime");

    inserttime.addEventListener("input", function () {
      if (inserttime.value.trim() !== "") {
        inserttime.classList.add("checked");
      }
    });

    form.addEventListener("submit", function(event) {

      inserttime.classList.remove("checked");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const insertdate = document.getElementById("insertdate");

    insertdate.addEventListener("input", function () {
      if (insertdate.value.trim() !== "") {
        insertdate.classList.add("checked");
      } 
    });

    form.addEventListener("submit", function(event) {

      insertdate.classList.remove("checked");
  });
});


function checkTask(checkbox) {
  const timecheckbox = checkbox.parentElement;

  if (checkbox.checked) {
    timecheckbox.classList.add('check');
    
  } else {
    timecheckbox.classList.remove('check');
  }
}

function checkTask(checkbox) {
  const task = checkbox.closest('.task');
  const taskname = task.querySelector('.taskname');
  const timecheckbox = checkbox.parentElement;

  if (checkbox.checked) {
      taskname.classList.add('check');
      timecheckbox.classList.add('check');
      task.classList.add('check');
  } else {
      taskname.classList.remove('check');
      timecheckbox.classList.remove('check');
      task.classList.remove('check');
  }
}