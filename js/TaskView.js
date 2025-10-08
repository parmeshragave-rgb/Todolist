export class TaskView {
    constructor() {
        this.initializeElements();
        this.taskTemplate = document.getElementById('taskTemplate');
    }

    initializeElements() {
        this.taskForm = document.getElementById('taskForm');
        this.taskContainer = document.getElementById('taskContainer');
        this.statusFilter = document.getElementById('statusFilter');
        this.priorityFilter = document.getElementById('priorityFilter');
        this.sortBy = document.getElementById('sortBy');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
    }

    renderTasks(tasks) {
        this.taskContainer.innerHTML = '';
        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.taskContainer.appendChild(taskElement);
        });
    }

    createTaskElement(task) {
        const template = this.taskTemplate.content.cloneNode(true);
        const taskElement = template.querySelector('.task-item');

        taskElement.dataset.id = task.id;
        if (task.completed) taskElement.classList.add('completed');

        // Set task content
        taskElement.querySelector('.task-title').textContent = task.title;
        taskElement.querySelector('.task-description').textContent = task.description;
        taskElement.querySelector('.task-priority').textContent = task.priority.toUpperCase();
        taskElement.querySelector('.task-priority').dataset.priority = task.priority;
        taskElement.querySelector('.task-due-date').textContent = new Date(task.dueDate).toLocaleDateString();

        // Set checkbox status
        const checkbox = taskElement.querySelector('.task-checkbox');
        checkbox.checked = task.completed;

        return taskElement;
    }

    getFormData() {
        return {
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            priority: document.getElementById('taskPriority').value,
            dueDate: document.getElementById('taskDueDate').value
        };
    }

    clearForm() {
        this.taskForm.reset();
    }

    getFilters() {
        return {
            status: this.statusFilter.value,
            priority: this.priorityFilter.value,
            sortBy: this.sortBy.value
        };
    }

    bindAddTask(handler) {
        this.taskForm.addEventListener('submit', e => {
            e.preventDefault();
            handler(this.getFormData());
        });
    }

    bindDeleteTask(handler) {
        this.taskContainer.addEventListener('click', e => {
            if (e.target.closest('.btn-delete')) {
                const taskElement = e.target.closest('.task-item');
                handler(taskElement.dataset.id);
            }
        });
    }

    bindToggleTask(handler) {
        this.taskContainer.addEventListener('change', e => {
            if (e.target.matches('.task-checkbox')) {
                const taskElement = e.target.closest('.task-item');
                handler(taskElement.dataset.id);
            }
        });
    }

    bindEditTask(handler) {
        this.taskContainer.addEventListener('click', e => {
            if (e.target.closest('.btn-edit')) {
                const taskElement = e.target.closest('.task-item');
                const taskId = taskElement.dataset.id;
                
                // Get current task data for editing
                const title = taskElement.querySelector('.task-title').textContent;
                const description = taskElement.querySelector('.task-description').textContent;
                const priority = taskElement.querySelector('.task-priority').textContent.toLowerCase();
                const dueDate = taskElement.querySelector('.task-due-date').textContent;

                // You could implement a modal or inline editing here
                const updatedTask = {
                    title: prompt('Edit title:', title),
                    description: prompt('Edit description:', description),
                    priority: prompt('Edit priority (low/medium/high):', priority),
                    dueDate: prompt('Edit due date (YYYY-MM-DD):', dueDate)
                };

                if (updatedTask.title) { // Only update if user didn't cancel
                    handler(taskId, updatedTask);
                }
            }
        });
    }

    bindFilterChange(handler) {
        const filterChange = () => handler(this.getFilters());
        this.statusFilter.addEventListener('change', filterChange);
        this.priorityFilter.addEventListener('change', filterChange);
        this.sortBy.addEventListener('change', filterChange);
    }

    bindClearCompleted(handler) {
        this.clearCompletedBtn.addEventListener('click', handler);
    }
}