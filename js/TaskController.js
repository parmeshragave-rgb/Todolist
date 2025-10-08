export class TaskController {
    constructor(taskManager, taskView) {
        this.taskManager = taskManager;
        this.taskView = taskView;
    }

    init() {
        // Bind event handlers
        this.taskView.bindAddTask(this.handleAddTask.bind(this));
        this.taskView.bindDeleteTask(this.handleDeleteTask.bind(this));
        this.taskView.bindToggleTask(this.handleToggleTask.bind(this));
        this.taskView.bindEditTask(this.handleEditTask.bind(this));
        this.taskView.bindFilterChange(this.handleFilterChange.bind(this));
        this.taskView.bindClearCompleted(this.handleClearCompleted.bind(this));

        // Initial render
        this.refreshTasks();
    }

    refreshTasks() {
        const filters = this.taskView.getFilters();
        const tasks = this.taskManager.getTasks(filters);
        this.taskView.renderTasks(tasks);
    }

    handleAddTask(taskData) {
        this.taskManager.addTask(taskData);
        this.taskView.clearForm();
        this.refreshTasks();
    }

    handleDeleteTask(taskId) {
        this.taskManager.deleteTask(taskId);
        this.refreshTasks();
    }

    handleToggleTask(taskId) {
        this.taskManager.toggleTaskStatus(taskId);
        this.refreshTasks();
    }

    handleEditTask(taskId, updatedTask) {
        this.taskManager.updateTask(taskId, updatedTask);
        this.refreshTasks();
    }

    handleFilterChange(filters) {
        this.refreshTasks();
    }

    handleClearCompleted() {
        this.taskManager.clearCompleted();
        this.refreshTasks();
    }
}