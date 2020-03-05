'use strict'

const todoInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo-list');
const allBtn = document.querySelector('.all-btn');
const activeBtn = document.querySelector('.active-btn');
const completeBtn = document.querySelector('.complete-btn');
const clearBtn = document.querySelector('.clear-btn');

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

}
