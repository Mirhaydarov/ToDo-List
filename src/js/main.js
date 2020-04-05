import '../styles/style.scss';


(function () {
    'use strict'

    const tasks = JSON.parse(localStorage.getItem('task_value')) || [];
    let saveLastTaskBody = '';

    // Elements UI
    const listContainer = document.querySelector('.todo-list');
    const todoInput = document.querySelector('.todo__input');
    const todoEdit = document.createElement('div');

    // Events
    todoInput.addEventListener('keydown', onCreateTaskHandler);
    todoEdit.addEventListener('keydown', onSaveEditsTaskHandler);
    listContainer.addEventListener('click', onDeleteTaskHandler);
    listContainer.addEventListener('dblclick', onEditTaskHandler);
    listContainer.addEventListener('click', onDoneTaskHandler);
    listContainer.addEventListener('click', onDisableDefaultLabelAction);

    renderAllTask(tasks.reverse());

    function onDoneTaskHandler({ target }) {
        if (target.classList.contains('todo-list__check-input')) {
            const taskBody = target.parentElement.textContent;
            toggleClassIfTaskComplete(tasks, taskBody, target);
        }
    }

    function toggleTaskComplete(tasksList, i, checkbox, boolean) {
        tasksList[i].complete = boolean;
        checkbox.parentElement.classList.toggle('done');
        checkbox.checked = boolean;
    }

    function toggleClassIfTaskComplete(tasksList, taskBody, checkbox) {
        tasksList.forEach((task, i) => {
            if (task.body === taskBody) {
                tasksList[i].complete
                    ? toggleTaskComplete(tasksList, i, checkbox, false)
                    : toggleTaskComplete(tasksList, i, checkbox, true);
            }
            saveOnLocalStorage(tasksList);
        });
    }

    function addClassDoneIfTasksComplete(tasksList) {
        const tasksBody = document.querySelectorAll('.todo-list__desc');

        tasksBody.forEach(body => {
            const checkbox = body.firstElementChild;

            tasksList.forEach((task, i) => {
                if (task.body === body.textContent) {
                    if (tasksList[i].complete) {
                        body.classList.add('done');
                        checkbox.checked = true;
                    }
                }
            });
        });
    }

    function renderAllTask(tasksList) {
        const fragment = document.createDocumentFragment();

        Object.values(tasksList).forEach(task => {
            const todoContainer = taskTemplate(task);
            fragment.appendChild(todoContainer);
        });

        listContainer.appendChild(fragment);
        addClassDoneIfTasksComplete(tasksList.reverse());
    }

    function taskTemplate({ _id, body }) {
        const todoContainer = document.createElement('li');
        todoContainer.setAttribute('data-task-id', _id);

        const todoBox = document.createElement('div');
        todoBox.classList.add('todo-list__item');

        const input = document.createElement('input');
        input.classList.add('todo-list__check-input');
        input.setAttribute('type', 'checkbox');

        const checkbox = document.createElement('span');
        checkbox.classList.add('todo-list__check-box');

        const desc = document.createElement('label');
        desc.classList.add('todo-list__desc');
        desc.textContent = body;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('todo-list__delete');

        desc.appendChild(input);
        desc.appendChild(checkbox);
        todoBox.appendChild(desc);
        todoBox.appendChild(deleteBtn);
        todoContainer.appendChild(todoBox);

        return todoContainer;
    }

    function taskCreate(body) {
        const newTask = {
            body,
            complete: false,
            _id: `task-${Math.random()}`
        };

        tasks.push(newTask);
        saveOnLocalStorage(tasks)

        return { ...newTask };
    }

    function saveOnLocalStorage(item) {
        localStorage.setItem(
            "task_value",
            JSON.stringify(item)
        )
    }

    function onCreateTaskHandler({ target, code }) {
        if (code === 'Enter' && target.value !== '') {
            const todoValue = todoInput.value;
            const task = taskCreate(todoValue);
            const listItem = taskTemplate(task);

            listContainer.insertAdjacentElement(
                'afterbegin',
                listItem
            );
            target.value = '';

        } else if (code === 'Escape') {
            target.value = '';
            return;
        }
    }

    function isConfirmed(body) {
        const isConfirmed = confirm(
            `Вы действительно хотите удалить эту задачу: ${body} ?`
        );

        if (!isConfirmed) return isConfirmed;
        return isConfirmed;
    }

    function deleteTaskFromLocalStorage(confirmed, tasksList, id, taskObj) {
        if (!confirmed) return;
        const lastChild = tasksList.length - 1;

        tasksList.forEach((task, i) => {
            if (task._id === id && taskObj) {
                tasksList.splice(i, 1, taskObj)
                tasksList.splice(lastChild, 1);

            } else if (task._id === id) {
                tasksList.splice(i, 1)
            }
        });
        saveOnLocalStorage(tasksList);
    }

    function deleteTaskFromHtml(confirmed, el) {
        if (!confirmed) return;
        el.remove();
    }

    function onDeleteTaskHandler({ target }) {
        if (target.classList.contains('todo-list__delete')) {
            const todoContainer = target.closest('[data-task-id]');
            const getId = todoContainer.dataset.taskId;
            const getBody = target.previousElementSibling.textContent;
            const confirmed = isConfirmed(getBody);

            deleteTaskFromHtml(confirmed, todoContainer);
            deleteTaskFromLocalStorage(confirmed, tasks, getId);
        }
    }

    function onEditTaskHandler({ target }) {
        if (target.classList.contains('todo-list__desc')) {
            const taskBody = target.textContent;
            const taskParent = target.parentElement;
            saveLastTaskBody = taskBody;

            elementForEditTask(taskBody, taskParent);
            taskParent.removeChild(target);
        }
    }

    function elementForEditTask(body, el) {
        todoEdit.setAttribute('contenteditable', 'true');
        todoEdit.textContent = body;

        el.insertAdjacentElement(
            'afterbegin',
            todoEdit
        );
    }

    function onSaveEditsTaskHandler({ target, code }) {
        if (code === 'Enter') {
            createEditedTask(target, todoEdit.textContent);

        } else if (code === 'Escape') {
            createEditedTask(target, saveLastTaskBody);
        }
    }

    function createEditedTask(target, taskBody) {
        const todoContainer = target.closest('[data-task-id]');
        const getId = todoContainer.dataset.taskId;
        const createTask = taskCreate(taskBody);
        const task = taskTemplate(createTask);

        todoContainer.insertAdjacentElement('afterend', task);
        todoContainer.remove();

        deleteTaskFromLocalStorage(true, tasks, getId, createTask);
    }

    function onDisableDefaultLabelAction(event) {
    if (event.target.classList.contains('todo-list__desc')) {
        event.preventDefault();
        }
    }
}());
