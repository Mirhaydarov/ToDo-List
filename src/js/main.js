import '../styles/style.scss';


(function () {
    'use strict'

    const tasks = JSON.parse(localStorage.getItem('task_value')) || [];

    // Elements UI
    const listContainer = document.querySelector('.todo-list');
    const todoInput = document.querySelector('.todo__input');

    // Events
    todoInput.addEventListener('keydown', onCreateTaskHandler);
    listContainer.addEventListener('click', onDeleteTaskHandler);

    renderAllTask(tasks.reverse());

    function renderAllTask(tasksList) {
        const fragment = document.createDocumentFragment();

        Object.values(tasksList).forEach(task => {
            const li = taskTemplate(task);
            fragment.appendChild(li);
        });

        listContainer.appendChild(fragment);
    }

    function taskTemplate({ _id, body }) {
        const li = document.createElement('li');
        li.setAttribute('data-task-id', _id);

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
        li.appendChild(todoBox);

        return li;
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

    function isConfirmed(id) {
        const { body } = objOfTask[id];

        const isConfirmed = confirm(
            `Вы действительно хотите удалить эту задачу: ${body} ?`
        );

        if (!isConfirmed) return isConfirmed;
        delete objOfTask[id];
        return isConfirmed;
    }

    function deleteTaskFromHtml(confirmed, el) {
        if (!confirmed) return;
        el.remove();
    }

    function onDeleteTaskHandler({ target }) {
        if (target.classList.contains('todo-list__delete')) {
            const parent = target.closest('[data-task-id]');
            const getId = parent.dataset.taskId;
            const confirmed = isConfirmed(getId);

            deleteTaskFromHtml(confirmed, parent);
        }
    }

}());
