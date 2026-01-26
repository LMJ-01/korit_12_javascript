const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo__item';

    if (todo.completed) {
      li.classList.add('todo__item--completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    const span = document.createElement('span');
    span.className = 'todo__text';
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo__delete-btn';
    deleteBtn.innerHTML = '&times;';

    li.append(checkbox, span, deleteBtn);
    todoList.appendChild(li);

    checkbox.addEventListener('change', () => {
      todos[index].completed = checkbox.checked;
      li.classList.toggle('todo__item--completed', checkbox.checked);
      saveTodos();
    });

    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });
  });
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return alert('내용을 입력하세요');

  todos.push({ text, completed: false });
  todoInput.value = '';
  saveTodos();
  renderTodos();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', e => e.key === 'Enter' && addTodo());
window.onload = renderTodos;
