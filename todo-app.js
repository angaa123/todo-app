let todos = [{}];
document.addEventListener("DOMContentLoaded", main);
function main() {
	var todoForm = document.querySelector("#todoForm");
	todoForm.addEventListener("submit", addTodo);
}

function addTodo(event) {
	event.preventDefault(); // Prevent form from submitting normally
	let todoInput = document.querySelector("#todoInput");
	todos.push({ task: todoInput.value, mark: "todo" });
	console.log(todos);
	renderTodos();
	todoInput.value = ""; // Clear the input field after adding the todo item
}
function renderTodos() {
	let listOfTodo = document.querySelector(".todo-list-group");
	listOfTodo.innerHTML = "";
	for (let index = 0; index < todos.length; index++) {
		// Get the current todo item
		let todo = todos[index];

		// Create a new li element for the todo item
		let li = document.createElement("li");
		li.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		if (todo.mark) {
			li.classList.add("bg-success");
		}
		li.innerHTML = `
        <span>${todo.task}</span> 
        <button class="btn btn-success ml-2 mrk_btn" data-index="${index}">Mark</button>
        <button class="btn btn-success ml-2 unmrk_btn" data-index="${index}">UnMark</button>
        <button class="btn btn-danger del_btn"  data-index="${index}">Delete</button>
        `;
		listOfTodo.appendChild(li);
	}
	// Add event listeners to Mark and Delete buttons
	document.querySelectorAll(".mrk_btn").forEach((button) => {
		button.addEventListener("click", markTodo);
	});
	document.querySelectorAll(".del_btn").forEach((button) => {
		button.addEventListener("click", deleteTodo);
	});
	document.querySelectorAll(".unmrk_btn").forEach((button) => {
		button.addEventListener("click", unmarkTodo);
	});
}

function markTodo(event) {
	let index = event.target.getAttribute("data-index");
	todos[index].mark = true;
	renderTodos();
}
function unmarkTodo(event) {
	let index = event.target.getAttribute("data-index");
	todos[index].mark = false;
	renderTodos();
}

function deleteTodo(event) {
	let index = event.target.getAttribute("data-index");
	todos.splice(index, 1);
	renderTodos();
}
