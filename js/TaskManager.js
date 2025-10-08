export class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(task) {
        task.id = Date.now().toString();
        task.completed = false;
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    }

    updateTask(taskId, updatedTask) {
        this.tasks = this.tasks.map(task => 
            task.id === taskId ? { ...task, ...updatedTask } : task
        );
        this.saveTasks();
    }

    toggleTaskStatus(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    getTasks(filters = {}) {
        let filteredTasks = [...this.tasks];

        // Filter by completion status
        if (filters.status !== 'all') {
            const isCompleted = filters.status === 'completed';
            filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
        }

        // Filter by priority
        if (filters.priority !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
        }

        // Sort tasks
        if (filters.sortBy === 'dueDate') {
            filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (filters.sortBy === 'priority') {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        }

        return filteredTasks;
    }

    clearCompleted() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.saveTasks();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}