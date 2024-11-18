const getTodos = () => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

[...document.getElementsByClassName('delete-btn')]
  .forEach(node => node.addEventListener('click', () => console.log(confirm('このTODOを削除してもよろしいですか？'))));

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const uncompletedTodoList = document.getElementById('uncompleted-todo-list');
  const completedTodoList = document.getElementById('completed-todo-list');

  // localStorage から TODO リストを読み込んで復元
  loadTodos();

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // フォームが送信されるのを防止

    const todoText = todoInput.value.trim(); // 入力されたTODOのテキストを取得

    if (todoText !== '') {
      const todoId = generateUUID(); // 新しいUUIDを生成
      const todoData = {
        id: todoId,
        text: todoText,
        completed: false // 初期状態では未完了
      };

      // localStorage に保存
      saveTodo(todoData);

      // 新しいTODOアイテムのHTMLを生成
      const todoCard = createTodoCard(todoData);

      // 未完了TODOリストに追加
      uncompletedTodoList.appendChild(todoCard);

      // 入力フィールドをリセット
      todoInput.value = '';
    }
  });

  // localStorageからTODOをロードして復元
  function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    
    savedTodos.forEach(todoData => {
      const todoCard = createTodoCard(todoData);

      if (todoData.completed) {
        completedTodoList.appendChild(todoCard);
        todoCard.classList.add('todo-completed');
      } else {
        uncompletedTodoList.appendChild(todoCard);
        todoCard.classList.add('todo-uncomplete');
      }
    });
  }

  // TODOアイテムをカードにして返す
  function createTodoCard(todoData) {
    const todoCard = document.createElement('div');
    todoCard.classList.add('todo-card');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todoData.completed;

    const span = document.createElement('span');
    span.classList.add('todo-text');
    span.setAttribute('contenteditable', 'true');
    
    // 改行を処理して、innerHTML にセット
    span.innerHTML = convertNewlinesToBr(todoData.text);  // 改行を <br> タグに変換

    span.setAttribute('data-id', todoData.id);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = '削除';

    // チェックボックスの変更イベントを追加
    checkbox.addEventListener('change', () => {
      todoData.completed = checkbox.checked;
      saveTodosToLocalStorage(); // localStorage を更新

      // リストの移動
      if (checkbox.checked) {
        completedTodoList.appendChild(todoCard);
        todoCard.classList.add('todo-completed');
        todoCard.classList.remove('todo-uncomplete');
      } else {
        uncompletedTodoList.appendChild(todoCard);
        todoCard.classList.add('todo-uncomplete');
        todoCard.classList.remove('todo-completed');
      }
    });

    // 削除ボタンのクリックイベント
    deleteButton.addEventListener('click', () => {
      const confirmDelete = confirm('本当に削除しますか？');
      if (confirmDelete) {
        todoCard.remove(); // TODOアイテムを削除
        removeTodoFromLocalStorage(todoData.id); // localStorage から削除
      }
    });

    // 作成した要素をカードに追加
    todoCard.appendChild(checkbox);
    todoCard.appendChild(span);
    todoCard.appendChild(deleteButton);

    return todoCard;
  }

  // 改行を <br> タグに変換する関数
  function convertNewlinesToBr(text) {
    return text.replace(/\n/g, '<br>'); // \n を <br> に変換
  }

  // localStorage に保存する関数
  function saveTodo(todoData) {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.push(todoData);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // localStorage にある全てのTODOを保存し直す
  function saveTodosToLocalStorage() {
    const todos = [];
    const todoCards = document.querySelectorAll('.todo-card');

    todoCards.forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      const span = card.querySelector('.todo-text');
      // 編集後のテキストも <br> タグに変換して保存
      todos.push({
        id: span.getAttribute('data-id'),
        text: span.innerHTML,  // 改行を <br> タグとして保存
        completed: checkbox.checked
      });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // localStorage から指定したIDのTODOを削除する
  function removeTodoFromLocalStorage(id) {
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // UUIDを生成する関数
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
});

  