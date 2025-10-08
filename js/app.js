import { TaskManager } from './TaskManager.js';
import { TaskView } from './TaskView.js';
import { TaskController } from './TaskController.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
    const taskView = new TaskView();
    const taskController = new TaskController(taskManager, taskView);

    // Initialize the app
    taskController.init();
});