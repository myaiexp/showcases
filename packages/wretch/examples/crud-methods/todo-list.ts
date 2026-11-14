// The to-do list as the app shows it, badged with the method that last changed it
export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export interface TodoList {
  show(todos: readonly Todo[], method: string): void;
}

export function todoList(parent: HTMLElement): TodoList {
  const box = document.createElement('div');
  box.className = 'todos';
  const head = document.createElement('div');
  head.className = 'todos-head';
  const badge = document.createElement('span');
  badge.className = 'method';
  const count = document.createElement('span');
  count.className = 'todos-count';
  head.append(badge, count);
  const list = document.createElement('ul');
  box.append(head, list);
  parent.append(box);

  return {
    show(todos, method) {
      badge.textContent = method;
      badge.dataset['method'] = method;
      badge.animate([{ transform: 'scale(1.25)' }, { transform: 'none' }], { duration: 350 });
      count.textContent = `${todos.length} item${todos.length === 1 ? '' : 's'} on the server`;
      list.replaceChildren(
        ...todos.map((t) => {
          const li = document.createElement('li');
          li.textContent = `${t.done ? '☑' : '☐'} ${t.title}`;
          if (t.done) li.className = 'done';
          return li;
        }),
      );
    },
  };
}
