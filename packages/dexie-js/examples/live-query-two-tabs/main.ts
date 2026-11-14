// Two connections to one database, like two open tabs: a change in one redraws the other
import Dexie, { liveQuery, type EntityTable } from 'dexie';
import type { Mount } from '@/types.ts';
import { caption, columns } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tableView } from '../../shared/table-view.ts';
import { tour } from '../../shared/tour.ts';

interface Todo {
  id: number;
  title: string;
  done: 0 | 1;
}
type TodoDb = Dexie & { todos: EntityTable<Todo, 'id'> };

function openTodos(name: string): TodoDb {
  const db = new Dexie(name) as TodoDb;
  db.version(1).stores({ todos: '++id, done' });
  return db;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each tab has its own connection and its own live query.' });
  // Same database name, two separate Dexie instances: what two tabs of one app would have.
  const name = stage.dbName('todos');
  const tabB = stage.own(openTodos(name), { keep: true });
  const tabA = stage.own(openTodos(name));

  const say = caption(stage.root);
  const [left, right] = columns(stage.root, 1, 1);
  const cols = ['title', { field: 'done', width: '3em', format: (v: unknown) => (v ? '✔' : '·') }];
  const show = (db: TodoDb, parent: HTMLElement, title: string) => {
    const view = tableView(stage, parent, { title, columns: cols, badges: false });
    // Each tab draws its own list from its own connection.
    const sub = liveQuery(() => db.todos.toArray()).subscribe({ next: (rows) => view.show(rows), error: stage.fail });
    stage.onDispose(() => sub.unsubscribe());
  };
  show(tabA, left!, 'tab A');
  show(tabB, right!, 'tab B');

  let n = 0;
  const TITLES = ['Buy milk', 'Call Per', 'Pay rent', 'Fix bike'];
  tour(
    stage,
    [
      {
        label: 'Tab A: add a todo',
        run: async () => {
          const title = TITLES[n++ % TITLES.length]!;
          say.set(`Tab A adds "${title}"; tab B sees it.`, `tabA.todos.add({ title: '${title}', done: 0 })`);
          await tabA.todos.add({ title, done: 0 } as Todo);
        },
      },
      {
        label: 'Tab B: tick the oldest',
        run: async () => {
          const first = await tabB.todos.where('done').equals(0).first();
          if (!first) return;
          say.set(`Tab B ticks "${first.title}"; tab A sees it.`, `tabB.todos.update(${first.id}, { done: 1 })`);
          await tabB.todos.update(first.id, { done: 1 });
        },
      },
      {
        label: 'Tab A: clear done',
        run: async () => {
          say.set('Tab A deletes the done ones.', "tabA.todos.where('done').equals(1).delete()");
          await tabA.todos.where('done').equals(1).delete();
        },
      },
    ],
  );
  say.set('One database, open in two tabs.', "new Dexie('todos') // twice");

  return stage.dispose;
};

export default mount;
