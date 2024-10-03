let tasks = [];

document.getElementById('nameInput').addEventListener('input', function() {
    const username = this.value;
    document.getElementById('username').textContent = username ? username : 'User';
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        updateTaskLists();
        updateProgress();
    }
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskLists();
    updateProgress();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskLists();
    updateProgress();
}

function editTask(index) {
    const newTaskText = prompt("Edit the task:", tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText;
        updateTaskLists();
    }
}

function updateTaskLists() {
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span>${task.text}</span>
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${index})">
            ${task.completed ? '<span style="color: green;">Completed</span>' : ''}
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        if (task.completed) {
            completedTasksList.appendChild(taskElement);
        } else {
            pendingTasksList.appendChild(taskElement);
        }
    });
}

function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    document.getElementById('taskProgress').value = progress;
}

function toggleTheme() {
    const body = document.body;
    const button = document.getElementById('themeToggleButton');

    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');

    if (body.classList.contains('light-mode')) {
        button.textContent = 'Dark Mode';
    } else {
        button.textContent = 'Light Mode';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('username').textContent = 'User';
    updateTaskLists();
    updateProgress();
});
