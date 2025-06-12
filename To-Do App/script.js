let taskIdCounter = 0;
let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const timestamp = new Date();
  tasks.push({
    id: ++taskIdCounter,
    text: taskText,
    createdAt: timestamp,
    completedAt: null
  });

  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const pendingList = document.getElementById("pendingList");
  const completedList = document.getElementById("completedList");

  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.text}</strong>
      <div class="timestamp">Added: ${task.createdAt.toLocaleString()}</div>
      <div class="task-buttons">
        ${!task.completedAt ? `<button onclick="markComplete(${task.id})">✅</button>` : ''}
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;

    if (task.completedAt) {
      const completeTime = document.createElement("div");
      completeTime.className = "timestamp";
      completeTime.textContent = `Completed: ${task.completedAt.toLocaleString()}`;
      li.appendChild(completeTime);
      completedList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });
}

function markComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task && !task.completedAt) {
    task.completedAt = new Date();
    renderTasks();
  }
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}
