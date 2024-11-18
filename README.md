# ブラウザ上で完結するTODOアプリケーションを作ろう！

## 実装方法

```shell
$ npm install
$ npm run dev
# 表示されるコンソール上のURLよりブラウザ上でプレビューすることができます
```

##メモ
      <div class="todo-card">
        <input type="checkbox" />
        <span class="todo-text" data-id="96004b06-12c8-46fc-9ba5-3b4feee2cff8" contenteditable="true">未完了のTODO 01</span>
        <button class="delete-btn">削除</button>
      </div>
      <div class="todo-card">
        <input type="checkbox" />
        <span class="todo-text" data-id="914c8133-3da7-4bb6-b144-b2866d4c9256" contenteditable="true">未完了のTODO 02</span>
        <button class="delete-btn">削除</button>
      </div>
      <div class="todo-card">
        <input type="checkbox" />
        <span class="todo-text" data-id="299ca8a7-2e07-4aed-a09c-8398665e5627" contenteditable="true">未完了のTODO 03</span>
        <button class="delete-btn">削除</button>
      </div>

      <div class="todo-card todo-completed">
        <input type="checkbox" checked>
        <span class="todo-text" data-id="6f989167-4adf-4476-b4fc-95b0714c03c7" contenteditable="true">完了のTODO 04</span>
        <button class="delete-btn">削除</button>
      </div>
      <div class="todo-card todo-completed">
        <input type="checkbox" checked>
        <span class="todo-text" data-id="db9f41e7-acb2-41e9-976b-63168e0021ee" contenteditable="true">完了のTODO 05</span>
        <button class="delete-btn">削除</button>
      </div>
      <div class="todo-card todo-completed">
        <input type="checkbox" checked>
        <span class="todo-text" data-id="566ac7a3-5f52-4224-8752-14ef146b714c" contenteditable="true">完了のTODO 06</span>
        <button class="delete-btn">削除</button>
      </div>