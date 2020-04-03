import '../styles/style.scss';

const task = [
    {
        _id: "09182479138123763",
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, quo!',
        complete: false,
    },
    {
        _id: "09182479132132323",
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, quo!',
        complete: true,
    },
    {
        _id: "09182432453343763",
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, quo!',
        complete: false,
    }
];

(function (arrOfTask) {
    'use strict'

    const objOfTask = arrOfTask.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});

    // Elements UI
    const listContainer = document.querySelector('.todo-list');
    const todoInput = document.querySelector('.todo__input');

    renderAllTask(objOfTask);

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
}(task));
