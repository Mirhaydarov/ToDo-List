'use strict'

const todoInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo-list');
const allBtn = document.querySelector('.all-btn');
const activeBtn = document.querySelector('.active-btn');
const completeBtn = document.querySelector('.complete-btn');
const clearBtn = document.querySelector('.clear-btn');

function appendElement(element, child) {
    element.appendChild(child);
}

function toggle(element, elClass) {
    element.classList.toggle(elClass);
}

function styleDisplay(element, type) {
    element.style.display = type;
}

todoInput.addEventListener('keydown', event => {
    const isSpace = event.target.value.match(/^[ ]+$/);
    const removeSpace = event.target.value.replace(/^[ ]+$/, '');
    const keyName = event.key;

    if (isSpace) {
        event.target.value = removeSpace;

    } else if (keyName === 'Enter' && event.target.value !== '') {
        createTodo();
        event.target.value = '';

    } else if (keyName === 'Escape') {
        event.target.value = '';
        event.target.blur();
    }

});

function createTodo() {
    const todoContainer = document.createElement('li');
    const todoItem = document.createElement('div');
    const todoDesc = document.createElement('label');
    const todoEdit = document.createElement('div');
    const deleteBtn = document.createElement('button');

    todoItem.classList.add('todo-list__item');
    todoDesc.classList.add('todo-list__desc');
    todoEdit.classList.add('todo-list__edit');
    deleteBtn.classList.add('todo-list__delete');

    todoDesc.textContent = todoInput.value;

    appendElement(todoList, todoContainer);
    appendElement(todoContainer, todoItem);
    appendElement(todoItem, todoDesc);
    appendElement(todoItem, deleteBtn);

    todoDesc.addEventListener('click', () => {
        toggle(todoDesc, 'done');
        toggle(todoContainer, 'done');
        styleDisplay(clearBtn, 'none');

        document.querySelectorAll('li .done').forEach( index => {
            if (index) {
                styleDisplay(clearBtn, 'block');
            }
        })
    });

}
