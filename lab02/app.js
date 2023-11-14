class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.term = '';
    }

    draw() {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';

        this.getFilteredTasks().forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${this.highlightSearchTerm(task.text)}</span>
                <span>${task.dueDate ? this.formatDueDate(task.dueDate) : 'Brak daty'}</span>
                <button class="edit-btn" data-index="${index}">Edytuj</button>
                <button class="delete-btn" data-index="${index}">Usuń</button>
            `;
            todoList.appendChild(listItem);
        });

        this.saveToLocalStorage();
    }

    highlightSearchTerm(text) {
        const lowerText = text.toLowerCase();
        const lowerTerm = this.term.toLowerCase();

        if (lowerTerm && lowerText.includes(lowerTerm)) {
            const startIdx = lowerText.indexOf(lowerTerm);
            const endIdx = startIdx + lowerTerm.length;

            return (
                text.substring(0, startIdx) +
                `<span class="highlight">${text.substring(startIdx, endIdx)}</span>` +
                text.substring(endIdx)
            );
        }

        return text;
    }
    addTask(task) {
        this.tasks.push(task);
        this.draw();
    }
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.draw();
    }
    editTask(index, newText, newDueDate) {
        this.tasks[index].text = newText;
        this.tasks[index].dueDate = newDueDate;
        this.draw();
    }
    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    formatDueDate(dueDate) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dueDate).toLocaleDateString('pl-PL', options);
    }
    getFilteredTasks() {
        return this.tasks.filter(task => task.text.toLowerCase().includes(this.term.toLowerCase()));
    }
    highlightSearchTerm(text) {
        const lowerText = text.toLowerCase();
        const lowerTerm = this.term.toLowerCase();

        if (lowerTerm && lowerText.includes(lowerTerm)) {
            const startIdx = lowerText.indexOf(lowerTerm);
            const endIdx = startIdx + lowerTerm.length;

            return text.substring(0, startIdx) + `<span class="highlight">${text.substring(startIdx, endIdx)}</span>` + text.substring(endIdx);
        }

        return text;
    }
    testMethod() {
        console.log(this.tasks);
    }
}

    const todoListInstance = new Todo();
    document.getElementById('add-btn').addEventListener('click', function() {
    const newTaskInput = document.getElementById('new-task');
    const dueDateInput = document.getElementById('due-date');

    if (newTaskInput.value.trim() !== '') {
        todoListInstance.addTask({
            text: newTaskInput.value,
            dueDate: dueDateInput.value
        });

        newTaskInput.value = '';
        dueDateInput.value = '';
    }
});

    document.getElementById('todo-list').addEventListener('click', function(event) {
    const index = event.target.dataset.index;

    if (event.target.classList.contains('delete-btn')) {
        todoListInstance.deleteTask(index);
    } else if (event.target.classList.contains('edit-btn')) {
        const task = todoListInstance.tasks[index];
        document.getElementById('edit-task-text').value = task.text;
        document.getElementById('edit-due-date').value = task.dueDate || '';
        
        document.getElementById('edit-task').style.display = 'block';
        document.getElementById('add-task').style.display = 'none';
        
        currentEditIndex = index;
    }
});

    document.getElementById('save-btn').addEventListener('click', function() {
    const newTaskInput = document.getElementById('edit-task-text');
    const dueDateInput = document.getElementById('edit-due-date');

    todoListInstance.editTask(currentEditIndex, newTaskInput.value, dueDateInput.value);

    document.getElementById('edit-task').style.display = 'none';
    document.getElementById('add-task').style.display = 'block';
});

    document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('edit-task').style.display = 'none';
    document.getElementById('add-task').style.display = 'block';
});

    document.getElementById('search').addEventListener('input', function() {
    todoListInstance.term = this.value;
    todoListInstance.draw();
});

todoListInstance.draw();
