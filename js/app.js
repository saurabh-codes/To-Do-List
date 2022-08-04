// Selectors
const todoInput = document.querySelector('.input');

const todoButton = document.querySelector('.button');

const todoList = document.querySelector('.todo-list');

const filterOption = document.querySelector('.filter-todo');


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Functions
function addTodo(event){
    event.preventDefault();

    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    // Add Todo to Local Storage
    saveLocalTodos(todoInput.value);

    // Checkmark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
        
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = 'Delete';
         
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to List
    todoList.appendChild(todoDiv);

    // Clear To-Do Input Value
    todoInput.value = "";

}


// Delete To-Do List
function deleteCheck(e){
    const item = e.target;

    // Delete To-Do
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        
        // Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    // Checkmark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function saveLocalTodos(todo){
    // Check
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    // Check
    let todos;
    
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    // Checkmark Button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
         
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = 'Delete';
         
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to List
    todoList.appendChild(todoDiv);

    });

}

function removeLocalTodos(todo){
    // Check
    let todos;
    
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}
