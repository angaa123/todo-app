let todos = [];
document.addEventListener("DOMContentLoaded", main);
function main() {
	let todoSave = document.querySelector("#todoSave");
	todoSave.addEventListener("click", addTodo);
}
function addTodo() {
	let markSave = document.querySelector("#mark");
	let todoInput = document.querySelector("#todoInput");
	todos.push({ task: todoInput.value, mark: markSave.value });
	console.log(todos);
	renderTodos();
	todoInput.value = ""; //ugugdliig hustgeh
}
//---------------renderTodos-----------------
function renderTodos() {
	let listOfTodo = document.querySelector(".todo-list-group");
	let inProgressList = document.querySelector(".in-progress-list-group");
	let completedList = document.querySelector(".completed-list-group");
	let blockedli = document.querySelector(".blocked-list-group");
	listOfTodo.innerHTML = "";
	inProgressList.innerHTML = "";
	completedList.innerHTML = "";
	blockedli.innerHTML = "";
	index = 0;
	//-----------for loop-----------------
	for (let index = 0; index < todos.length; index++) {
		// Get the current todo item
		// Create a new li element for the todo item
		let li = document.createElement("li");
		li.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		li.innerHTML = `
				<span>${todos[index].task}</span>
				<button class="btn btn-success ml-2 mrk_btn" data-bs-toggle="modal"data-bs-target="#editTodoModal" data-index="${index}"><i class="bi bi-pencil" data-index="${index}"></i></button>
				<button class="btn btn-danger del_btn"  data-index="${index}"><i class="bi bi-trash" data-index="${index}"></i></button>
				`;
		switch (todos[index].mark) {
			case "TODO":
				listOfTodo.appendChild(li);
				break;
			case "INPROGRESS":
				inProgressList.appendChild(li);
				break;
			case "DONE":
				completedList.appendChild(li);
				break;
			case "BLOCKED":
				blockedli.appendChild(li);
				break;
			default:
				listOfTodo.appendChild(li);
				break;
		}
	}
	connectEvent();

	// Add event listeners to Mark and Delete buttons
}
//-----------------------------------------------
const connectEvent = () => {
	document.querySelectorAll(".mrk_btn").forEach((button) => {
		button.addEventListener("click", markTodo);
	});

	document.querySelectorAll(".del_btn").forEach((button) => {
		button.addEventListener("click", deleteTodo);
	});
};

//-------------------------------------------------------
function markTodo(event) {
	let index = event.target.getAttribute("data-index");
	let todoEditSave = document.querySelector("#todoEditSave");
	function callMakechange() {
		makeChange(index);
		index = null;
	}
	todoEditSave.addEventListener("click", callMakechange);
}
//------------------------------------------------
function deleteTodo(event) {
	console.log(event.target);
	let index = event.target.getAttribute("data-index");
	console.log("/ / / / / / ");
	console.log("index", index);
	console.log(todos[index]);
	console.log("/ / / / / / ");
	todos.splice(index, 1);

	renderTodos();
}
//========================================
function makeChange(index) {
	if (index !== null) {
		todos[index].mark = document.querySelector("#editMark").value;
		console.log(index);
		console.log(todos[index]);
	}
	renderTodos();
}
