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
  localStorage.setItem(todoData.id, JSON.stringify(todoData));
  location.href = 'index.html';
};

const addTodoToList = () => {
  const todoDataListRaw = [];
  let todoDataListBelum = [];
  let todoDataListSudah = [];
  if (localStorage.length < 1) {
    localStorage.clear();
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const todoDataListJSON = JSON.parse(localStorage.getItem(localStorage.key(i)));
      todoDataListRaw.push(todoDataListJSON);
    }
  }

  todoDataListSudah = todoDataListRaw.filter((item) => {
    return item.isComplete == true;
  });
  todoDataListBelum = todoDataListRaw.filter((item) => {
    return item.isComplete == false;
  });

  displayTodoList(todoDataListBelum, todoDataListSudah);
  hapusTodoFromList(todoDataListBelum, todoDataListSudah);
  updateTodoList(todoDataListBelum, todoDataListSudah);
};

const displayTodoList = (todoListBelum, todoListSudah) => {
  const todoBelumSelesai = document.querySelector('.todo-list .container #belum-selesai');
  const todoSudahSelesai = document.querySelector('.todo-list .container #sudah-selesai');
  todoBelumSelesai.innerHTML = `${todoListBelum.map(templateTodo).join('')}`;
  todoSudahSelesai.innerHTML = `${todoListSudah.map(templateTodo).join('')}`;


  const h2Belum = document.querySelectorAll('.todo-list .container #belum-selesai li h2')
  h2Belum.forEach(item =>{
    item.style.textDecoration =  'unset'  
  })
  const h2Sudah = document.querySelectorAll('.todo-list .container #sudah-selesai li h2')
  h2Sudah.forEach(item =>{
    item.style.textDecoration = 'line-through'
    item.style.color = 'rgb(233, 233, 250)'
  })

  const liSudah = document.querySelectorAll('.todo-list .container #sudah-selesai li')
  liSudah.forEach(item=>{
    item.classList.add('bg-success')
  })
  const h3Sudah = document.querySelectorAll('.todo-list .container #sudah-selesai li h3')
  h3Sudah.forEach(item=>{
    item.style.color = 'rgb(233, 233, 250)'
  })

  const btnCheckSudah = document.querySelectorAll('.todo-list .container #sudah-selesai li .check input');
  btnCheckSudah.forEach(item=>{
    item.checked = true
  })
};

const templateTodo = (todo) => {
  return `<li>
  <div class="row" id="todoList">
    <div class="col-md-10" >
      <h2 class="text-capitalize">${todo.todo}</h2>
      <h3>${todo.date}</h3>
    </div>
    <div class="col-md-2">
      <div class="check">
        <input type="checkbox" name="check" id="checkBtn" />
      </div>
      <div class="hapus">
        <a href="#" class="btn btn-danger btn-sm">Hapus</a>
      </div>
    </div>
  </div>
</li>`;
};

const hapusTodoFromList = (todoListBelum, todoListSudah) => {
  const getKeyBelum = [];
  todoListBelum.forEach((item) => {
    getKeyBelum.push(item.id);
  });
  const listTodoBelum = document.querySelectorAll('.todo-list .container #belum-selesai li');
  const listTodoSudah = document.querySelectorAll('.todo-list .container #sudah-selesai li');
  const todoBelum = [];
  const todoSudah = [];
  listTodoBelum.forEach((item) => {
    todoBelum.push(item);
  });
  listTodoSudah.forEach((item) => {
    todoSudah.push(item);
  });

  const deleteBtnTodoBelum = document.querySelectorAll('.todo-list .container #belum-selesai li .hapus a');
  const deleteBtnTodoSudah = document.querySelectorAll('.todo-list .container #sudah-selesai li .hapus a');

  deleteBtnTodoBelum.forEach((button, index) => {
    button.addEventListener('click', function () {
      localStorage.removeItem(getKeyBelum[index]);
      todoBelum[index].style.display = 'none';
    });
  });
  const getKeySudah = [];
  todoListSudah.forEach((item) => {
    getKeySudah.push(item.id);
  });
  deleteBtnTodoSudah.forEach((button, index) => {
    button.addEventListener('click', function () {
      localStorage.removeItem(getKeySudah[index]);
      todoSudah[index].style.display = 'none';
    });
  });
};

const updateTodoList = (todoListBelum, todoSudahSelesai) => {
  const getKeyBelum = [];
  todoListBelum.forEach((item) => {
    getKeyBelum.push(item.id);
  });

  const btnCheckBelum = document.querySelectorAll('.todo-list .container #belum-selesai li .check input');
  btnCheckBelum.forEach((item, index) => {
    item.addEventListener('click', function () {
      if (item.checked) {
        todoListBelum[index].isComplete = true;
        localStorage.setItem(getKeyBelum[index], JSON.stringify(todoListBelum[index]));
        location.href = 'index.html';
      } else {
        todoListBelum[index].isComplete = false;
        localStorage.setItem(getKeyBelum[index], JSON.stringify(todoListBelum[index]));
        location.href = 'index.html';
      }
    });
  });
  const getKeySudah = [];
  todoSudahSelesai.forEach((item) => {
    getKeySudah.push(item.id);
  });
  const btnCheckSudah = document.querySelectorAll('.todo-list .container #sudah-selesai li .check input');
  btnCheckSudah.forEach((item, index) => {
    item.addEventListener('click', function () {
      if (!item.checked) {
        todoSudahSelesai[index].isComplete = false;
        localStorage.setItem(getKeySudah[index], JSON.stringify(todoSudahSelesai[index]));
        location.href = 'index.html';
      } else {
        todoSudahSelesai[index].isComplete = true;
        localStorage.setItem(getKeySudah[index], JSON.stringify(todoSudahSelesai[index]));
        location.href = 'index.html';
      }
    });
  });
};

addTodoToList();

document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  const btnTodoAdd = document.querySelector('#btnAddTodo');
  btnTodoAdd.addEventListener('click', TodoData);
});
