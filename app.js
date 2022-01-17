// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo")

// Event listeners
document.addEventListener('DOMContentLoaded', loadLocalTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
    
    // Stops the browser from refreshing whenever the button is pressed.
    event.preventDefault();

    // Creating a todo div:
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create li:
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Add todo to local storage.
    saveLocalTodos(todoInput.value);

    // Complete button:
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // Delete button:
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    // Append to list:
    todoList.appendChild(todoDiv);

    // Clear todo input value;
    todoInput.value = "";
}

function updateTodo(event) {

    const item = event.target;

    // Delete the todo:
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        // Fall animation
        todo.classList.add("fall");
        // Remove from local storage.
        removeLocalTodos(todo);
        // Remove the todo after the transition has ended
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    // Complete the todo:
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {

    // Get the todos. 
    const todos = todoList.childNodes;

    // Loop through the todos and if the todo satisfies the drop box value then
    // show.
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    // Check if there is an already saved todos.
    if (localStorage.getItem('todos') === null) {
        // If there isn't an existing todos, create an empty array.
        todos = [];
    } else {
        // Else, fetch the existing todos array.
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    // Save it back to local storage.
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadLocalTodos() {
    let todos;
    // Check if there is an already saved todos.
    if (localStorage.getItem('todos') === null) {
        // If there isn't an existing todos, create an empty array.
        todos = [];
    } else {
        // Else, fetch the existing todos array.
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {

        // Creating a todo div:
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create li:
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Complete button:
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        // Delete button:
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        // Append to list:
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    // Check if there is an already saved todos.
    if (localStorage.getItem('todos') === null) {
        // If there isn't an existing todos, create an empty array.
        todos = [];
    } else {
        // Else, fetch the existing todos array.
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // Get the text of the todo that is to be removed.
    const todoText = todo.children[0].innerText;
    // Remove the todo from the local todos.
    // `1` to remove once.
    todos.splice(todos.indexOf(todoText), 1);
    // Save it back to local storage.
    localStorage.setItem('todos', JSON.stringify(todos));
}