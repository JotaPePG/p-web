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
