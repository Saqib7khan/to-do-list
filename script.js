// Define an array to store tasks
let tasks = [];

// Function to add a new task
function addTask(event) {
    event.preventDefault();

    try {
        // Get input values
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const dueDate = document.getElementById('dueDate').value.trim();
        const priority = document.getElementById('priority').value.trim();
        const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

        // Check for empty inputs
        if (!title || !description || !dueDate || !priority) {
            throw new Error('Please fill out all required fields.');
        }

        // Create task object
        const task = {
            title,
            description,
            dueDate,
            priority,
            tags,
            completed: false
        };

        // Add task to array
        tasks.push(task);

        // Render tasks
        renderTasks();

        // Reset form
        document.getElementById('taskForm').reset();
    } catch (error) {
        alert(error.message);
    }
}

// Function to render tasks
function renderTasks() {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            <p>Tags: ${task.tags.join(', ')}</p>
            <button onclick="completeTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

// Function to mark task as completed
function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Event listener for form submission
document.getElementById('taskForm').addEventListener('submit', addTask);

// Initial rendering of tasks
renderTasks();
