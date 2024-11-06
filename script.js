const taskInput = document.getElementById('task')
const taskList = document.getElementById('list')
const tasks = JSON.parse(localStorage.getItem('tasks')) || []

function addTask() {
	const taskText = taskInput.value.trim()
	if (taskText === '') return

	const task = { text: taskText }
	tasks.push(task)
	localStorage.setItem('tasks', JSON.stringify(tasks))

	taskInput.value = ''

	displayTasks()
}

function deleteTask(index) {
	tasks.splice(index, 1)
	localStorage.setItem('tasks', JSON.stringify(tasks))

	displayTasks()
}

let indexToDelete = null // Para armazenar o índice da tarefa a ser deletada

function deleteTask(index) {
	indexToDelete = index // Armazena o índice da tarefa a ser excluída
	const deleteModal = new bootstrap.Modal(
		document.getElementById('deleteConfirmationModal')
	)
	deleteModal.show() // Mostra o modal de confirmação
}

// Função para confirmar a exclusão
document.getElementById('confirmDelete').addEventListener('click', () => {
	if (indexToDelete !== null) {
		tasks.splice(indexToDelete, 1) // Remove a tarefa
		localStorage.setItem('tasks', JSON.stringify(tasks))
		displayTasks() // Atualiza a lista de tarefas

		indexToDelete = null // Reseta o índice
	}
	// Fecha o modal após a exclusão
	const deleteModal = bootstrap.Modal.getInstance(
		document.getElementById('deleteConfirmationModal')
	)
	deleteModal.hide()
})

function editTask(index) {
	const newTaskText = prompt('Edite a tarefa:', tasks[index].text)

	if (newTaskText !== null) {
		tasks[index].text = newTaskText
		localStorage.setItem('tasks', JSON.stringify(tasks))

		displayTasks()
	}
}

function doneTask(index) {
	tasks[index].done = !tasks[index].done
	localStorage.setItem('tasks', JSON.stringify(tasks))

	displayTasks()
}

function displayTasks() {
	taskList.innerHTML = ''

	tasks.forEach((task, index) => {
		const li = document.createElement('li')

		li.className =
			'list-group-item d-flex justify-content-between align-items-center'

		const taskTextSpan = document.createElement('span')
		taskTextSpan.textContent = task.text

		if (task.done) {
			taskTextSpan.style.textDecoration = 'line-through'
		}

		const buttonContainer = document.createElement('div')
		buttonContainer.innerHTML = `
      <button class="edit-btn" onclick="editTask(${index})">Editar</button>
      <button class="delete-btn" onclick="deleteTask(${index})">Excluir</button>
      <button class="done-btn" onclick="doneTask(${index})">${
			task.done ? 'Desmarcar' : 'Marcar'
		} como feito</button>
    `

		li.appendChild(taskTextSpan)
		li.appendChild(buttonContainer)
		taskList.appendChild(li)
	})
}

displayTasks()
