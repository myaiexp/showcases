// A to-do list driven by post, get, put, patch and delete
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { todoList, type Todo } from './todo-list.ts';
import './style.css';

const NEW_ITEMS = ['Buy oat milk', 'Book the dentist', 'Water the ferns'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button is one method. The list is what the server holds.' });
  // The server keeps the list in memory, like a real one would in its database.
  let stored: Todo[] = [{ id: 1, title: 'Call grandma', done: false }, { id: 2, title: 'Pay the rent', done: false }];
  let nextId = 3;
  const server = createServer(stage, {
    'GET /todos': () => ({ json: stored }),
    'POST /todos': (req) => {
      const todo = { id: nextId++, title: (req.body as { value: { title: string } }).value.title, done: false };
      stored = [...stored, todo];
      return { status: 201, json: todo };
    },
    'PUT /todos/:id': (req) => {
      const todo = { ...(req.body as { value: Todo }).value, id: Number(req.params['id']) };
      stored = stored.map((t) => (t.id === todo.id ? todo : t));
      return { json: todo };
    },
    'PATCH /todos/:id': (req) => {
      stored = stored.map((t) => (String(t.id) === req.params['id'] ? { ...t, ...(req.body as { value: object }).value } : t));
      return { json: stored.find((t) => String(t.id) === req.params['id']) };
    },
    'DELETE /todos/:id': (req) => {
      stored = stored.filter((t) => String(t.id) !== req.params['id']);
      return { json: { deleted: Number(req.params['id']) } };
    },
  });
  wire(stage, server, { rows: 0 });
  const view = todoList(stage.root);

  const api = wretch(BASE).fetchPolyfill(server.fetch);
  let shownList: Todo[] = [];
  let added = 0;

  const refresh = async (method: string): Promise<void> => {
    shownList = await api.get('/todos').json<Todo[]>();
    if (!stage.disposed) view.show(shownList, method);
  };
  const step = async (method: string, say: string, call: () => Promise<unknown>): Promise<void> => {
    stage.say(say);
    await call().catch(() => {});
    if (stage.disposed) return;
    await refresh(method).catch(() => {});
    if (!stage.disposed) stage.say(`${say}: done, the list was read again`, 'ok');
  };
  const first = (): Todo | undefined => shownList[0];
  const last = (): Todo | undefined => shownList.at(-1);

  runCases(
    stage,
    [
      { label: 'GET', run: () => step('GET', 'api.get("/todos")', async () => {}) },
      {
        label: 'POST',
        run: () => step('POST', 'api.post({ title }, "/todos")', () => api.post({ title: NEW_ITEMS[added++ % 3] }, '/todos').json()),
      },
      {
        label: 'PUT',
        run: () => step('PUT', 'api.put({ title, done }, "/todos/1")', () => api.put({ title: 'Call grandma on Sunday', done: false }, `/todos/${first()?.id ?? 1}`).json()),
      },
      {
        label: 'PATCH',
        run: () => step('PATCH', 'api.patch({ done: true }, "/todos/1")', () => api.patch({ done: true }, `/todos/${first()?.id ?? 1}`).json()),
      },
      {
        label: 'DELETE',
        run: () => step('DELETE', 'api.delete("/todos/…")', () => api.delete(`/todos/${last()?.id ?? 1}`).json()),
      },
    ],
    1400,
  );
  return () => stage.dispose();
};

export default mount;
