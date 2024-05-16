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

// Função para salvar tarefas no localStorage
function salvarTarefa(task) {
  // Verificar se já existem tarefas salvas
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Adicionar a nova tarefa ao array de tarefas
  tasks.push(task);

  // Salvar o array de tarefas atualizado no localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Obter o formulário e o botão de envio

// Adicionar um ouvinte de evento para o envio do formulário
formElement.addEventListener("submit", function (event) {
  event.preventDefault(); // Impedir o envio do formulário

  // Obter os valores dos inputs
  const taskDescription = document.querySelector(".inserttask").value;
  const taskTime = document.querySelector(".inserttime").value;
  const taskDate = document.querySelector(".insertdate").value;
  const tabelaContainer = document.getElementById("taskdiv");

  tabelaContainer.innerHTML = "";

  // Criar um objeto para representar a nova tarefa
  const newTask = {
    description: taskDescription,
    time: taskTime,
    date: taskDate,
  };

  listaDeTarefas.push(newTask);

  // Salvar a nova tarefa no localStorage
  salvarTarefa(newTask);
  // Limpar os inputs após salvar a tarefa
  formElement.reset();

  // const tabelaMinhaTarefa = criarTabelaParaTarefa(newTask);
  // tabelaContainer.appendChild(tabelaMinhaTarefa);

  console.log(newTask);
  console.log(listaDeTarefas);

  // Verificar se existem tarefas salvas no localStorage
  const tasksJSON = localStorage.getItem("tasks");

  // Verificar se há tarefas salvas no localStorage
  if (tasksJSON) {
    // Converter os dados JSON de volta para objetos JavaScript
    const tasks = JSON.parse(tasksJSON);
    let listaDeHorarios = [];
    tasks.forEach(function (task) {
      let objeto = {
        tarefa: task,
        time: task.time,
      };
      listaDeHorarios.push(objeto);
    });
    // Iterar sobre cada tarefa e criar uma tabela para ela
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
      // Criar e adicionar uma tabela para a tarefa atual
      const tabelaTarefa = criarTabelaParaTarefa(task.tarefa);
      const taskDay = task.tarefa.date.slice(-2);
      console.log(taskDay);
      if (taskDay == today) {
        tabelaContainer.appendChild(tabelaTarefa);
      }
    });
  } else {
    // Se não houver tarefas salvas, exibir uma mensagem ou realizar alguma outra ação
    console.log("Não há tarefas armazenadas no localStorage.");
  }
});

function buscarTarefas() {
  // Verificar se existem tarefas salvas
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
}

function buscarElementoDeTarefa(elemento, indice) {
  // Buscar todas as tarefas
  const tasks = buscarTarefas();

  // Verificar se o índice fornecido é válido
  if (indice >= 0 && indice < tasks.length) {
    // Retornar o elemento específico da tarefa no índice dado
    return tasks[indice][elemento];
  } else {
    return null; // Retornar null se o índice for inválido
  }
}

function criarTabelaParaTarefa(task) {
  // Criar os elementos HTML para a tabela da tarefa
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

  // Adicionar os elementos criados à tabela da tarefa
  timeCheckboxDiv.appendChild(taskTime);
  timeCheckboxDiv.appendChild(checkbox);
  taskDiv.appendChild(taskName);
  taskDiv.appendChild(timeCheckboxDiv);

  // Retornar a tabela da tarefa criada
  return taskDiv;
}

function criarTabelasParaTarefas(listaDeTarefas) {
  // Selecionar o contêiner onde as tabelas serão inseridas
  const tabelaContainer = document.getElementById("taskdiv");

  // Limpar qualquer conteúdo existente no contêiner
  tabelaContainer.innerHTML = "";

  // Iterar sobre cada objeto de tarefa na lista
  listaDeTarefas.forEach(function (task) {
    // Criar e adicionar uma tabela para o objeto de tarefa atual
    const tabelaTarefa = criarTabelaParaTarefa(task);
    tabelaContainer.appendChild(tabelaTarefa);
  });
}
