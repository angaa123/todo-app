document.addEventListener('DOMContentLoaded', function() {
    var todos = []; // Initialize an empty array to store the todo items

    function add_todo(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        var todoInput = document.querySelector('#todoInput'); // Get the value of the input field
        if (todoInput && todoInput.value !== '') { // Check if the input field is not empty
            todos.push(todoInput.value); // Add the new todo item to the array
            renderTodos(); // Render the updated list of todos on the page
            todoInput.value = ''; // Clear the input field after adding the todo item
        }
    }

    // Add event listener to the form submit button
    var todoForm = document.querySelector('#todoForm');
    todoForm.addEventListener('submit', add_todo);

    // Function to render the list of todos on the page
    function renderTodos() {
        var list = document.querySelector('.list-group'); // Get the ul element where the todo items will be inserted
        if (list) {
            list.innerHTML = ''; // Clear any existing todo items from the list
            todos.forEach(function(todo, index) { // Loop through each todo item in the array and render it on the page
                var li = document.createElement('li'); // Create a new li element for the todo item
                li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'); // Add Bootstrap classes to style the li element
                li.innerHTML = `<span>${todo}</span>
                                <button class="btn btn-success ml-2" data-index="${index}" onclick="markTodo.call(this)">Mark</button>
                                <button class="btn btn-danger" data-index="${index}" onclick="deleteTodo.call(this)">Delete</button>`; // Set the innerHTML of the li element to display the todo item and two buttons for marking and deleting the todo item
                list.appendChild(li); // Append the li element to the ul element
            });
        }
        console.log(todos);
    }

    // Function to mark a todo item as completed
    window.markTodo = function() {
        var index = this.dataset.index; // Get the index of the todo item from the data-index attribute on the button
        todos[index] = `<s>${todos[index].replace(/<\/?s>/g, '')}</s>`; // Toggle the <s> tag to mark/unmark the todo item as completed
        renderTodos(); // Render the updated list of todos on the page
    }

    // Function to delete a todo item from the array and the page
    window.deleteTodo = function() {
        var index = this.dataset.index; // Get the index of the todo item from the data-index attribute on the button
        todos.splice(index, 1); // Remove the todo item from the array using the splice() method
        renderTodos(); // Render the updated list of todos on the page
    }
});