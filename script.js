const form = document.getElementById('form');
const input  = document.getElementById('input');
const todosList = document.getElementById('todos');

input.focus();

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos) {
    todos.forEach(todo => addTodo(todo));
}

function addTodo(todo) {
    let todoText = input.value;
    
    // When the todo is retrieved from stored data
    if(todo) {
        todoText = todo.text;
    }
    
    if(todoText) {
        const li = document.createElement('li');
        // If the stored todo was completed
        if(todo && todo.completed) {
            li.classList.add('todo', 'completed');
        } else {
            li.classList.add('todo');
        }

        // Set the text of the li to the input or stored todo
        li.innerText = todoText;

        // Create the div for the buttons
        const buttons = document.createElement('div');
        buttons.classList.add('button');
        
        // Create the check and delete button with their classes and icons
        const btnCheck = document.createElement('button');
        btnCheck.classList.add('btn', 'btn--check');
        btnCheck.innerHTML = '<i class="fas fa-check"></i>'
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn--trash');
        btnDelete.innerHTML = '<i class="fas fa-trash"></i>'
    
        buttons.appendChild(btnCheck);
        buttons.appendChild(btnDelete);
        li.appendChild(buttons);
        todosList.appendChild(li);
    
        // Add the event listener to the buttons for checking and deleting
        btnCheck.addEventListener('click', () => { 
            li.classList.toggle('completed');
            updateLS();
        })
        btnDelete.addEventListener('click', () => {
            if(window.confirm('Do you want to delete this todo?')) {
                li.remove();
                updateLS();
            }
        })
        
        updateLS();
    } 
}

function updateLS() {
    const todosEl = document.querySelectorAll('.todo');
    console.log(todosEl);
    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos));
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo();   
    // Clear the input text
    input.value = ''

})



