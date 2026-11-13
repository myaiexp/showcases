// Wretch base client demo: static sample in previews, live GET on click
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import './style.css';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const SAMPLE: Todo = { userId: 1, id: 12, title: 'quo adipisci enim quam ut ab', completed: true };

const mount: Mount = (el, { preview, signal }) => {
  const root = document.createElement('div');
  root.className = preview ? 'root preview' : 'root';
  el.append(root);
  const request = document.createElement('div');
  request.className = 'request';
  const out = document.createElement('pre');
  out.className = 'out';

  if (preview) {
    request.textContent = 'wretch(base).get("/todos/12").json()';
    out.textContent = JSON.stringify(SAMPLE, null, 2);
    root.append(request, out);
    return () => undefined;
  }

  const api = wretch('https://jsonplaceholder.typicode.com').options({ signal });
  const button = document.createElement('button');
  button.className = 'btn';
  button.textContent = 'GET a random to-do';
  out.textContent = 'Click the button to fetch.';
  root.append(button, request, out);

  button.addEventListener('click', async () => {
    const id = Math.ceil(Math.random() * 200);
    request.textContent = `wretch(base).get("/todos/${id}").json()`;
    out.classList.remove('err');
    out.textContent = 'Loading...';
    button.disabled = true;
    try {
      const todo = await api.get(`/todos/${id}`).json<Todo>();
      out.textContent = JSON.stringify(todo, null, 2);
    } catch (err) {
      if (signal.aborted || (err instanceof DOMException && err.name === 'AbortError')) return;
      out.classList.add('err');
      out.textContent =
        'Request failed: ' + (err instanceof Error ? err.message : String(err)) +
        '\n(Check your connection: this demo hits a live API.)';
    } finally {
      if (!signal.aborted) button.disabled = false;
    }
  });
  return () => undefined;
};

export default mount;
