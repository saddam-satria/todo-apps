const TodoData = () => {
  const todoInput = document.querySelector('#todo-input').value;
  const dateInput = document.querySelector('#tanggal').value;
  const date = new Date();
  const id = String(date.getDate()) + String(date.getMonth()) + String(date.getFullYear()) + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds());

  const todoData = {
    id: id,
    todo: todoInput,
    date: dateInput,
    isComplete: false,
  };

  if (todoInput == '' || dateInput == '') {
    swal({
      text: 'Data tidak boleh kosong !',
      icon: 'error',
      button: 'Oke deh',
    });
  } else {
    addTodoToStorage(todoData);
  }
};

const addTodoToStorage = (todoData) => {
  // Jika ada data yang undefined
  if (typeof (localStorage) === undefined) {
    localStorage.clear()
  }else{
    localStorage.setItem(todoData.id, JSON.stringify(todoData));
    location.href = 'index.html';
  }
};

const addTodoToList = () => {
  let todoDataList = [];
  for (let i = 0; i < localStorage.length; i++) {
    const todoDataListJSON = JSON.parse(localStorage.getItem(localStorage.key(i)));
    todoDataList.push(todoDataListJSON);
  }
  displayTodoList(todoDataList);
  hapusTodoFromList(todoDataList);
};

const displayTodoList = (todoList) => {
  const ul = document.querySelector('.todo-list .container ul');
  ul.innerHTML = `${todoList.map(templateTodo).join('')}`;
};

const templateTodo = (todo) => {
  return `<li>
  <div class="row" id="todoList">
    <div class="col-md-10" >
      <h2>${todo.todo}</h2>
      <h3>${todo.date}</h3>
    </div>
    <div class="col-md-2">
      <div class="check">
        <input type="checkbox" name="check" id="check" />
      </div>
      <div class="hapus">
        <a href="#" class="btn btn-danger btn-sm">Hapus</a>
      </div>
    </div>
  </div>
</li>`;
};

const hapusTodoFromList = (todoList) => {
  const getKey = [];
  todoList.forEach((item) => {
    getKey.push(item.id);
  });
  const listIndex = [];
  const li = document.querySelectorAll('.todo-list .container ul li');
  li.forEach((item) => {
    listIndex.push(item);
  });
  const deleteBtn = document.querySelectorAll('.todo-list .container ul li .hapus a');
  deleteBtn.forEach((button, index) => {
    button.addEventListener('click', function () {
      localStorage.removeItem(getKey[index]);
      listIndex[index].style.display = 'none';
    });
  });
};

addTodoToList();

document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  const btnTodoAdd = document.querySelector('#btnAddTodo');
  btnTodoAdd.addEventListener('click', TodoData);
});
