// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);

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

function deleteTodo(event) {
    const item = event.target;
    // Delete the todo:
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        // Fall animation
        todo.classList.add("fall");
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