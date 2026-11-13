// ky.get(url).json() demo: static sample in previews, live request on click
import ky from 'ky';
import type { Mount } from '@/types.ts';
import './style.css';

interface User {
  id: number;
  name: string;
  email: string;
  company?: { name?: string };
  address?: { city?: string };
}

const pick = (u: User): string =>
  JSON.stringify({ id: u.id, name: u.name, email: u.email, company: u.company?.name, city: u.address?.city }, null, 2);

const SAMPLE: User = {
  id: 3,
  name: 'Clementine Bauch',
  email: 'Nathan@yesenia.net',
  company: { name: 'Romaguera-Jacobson' },
  address: { city: 'McKenziehaven' },
};

const mount: Mount = (el, { preview, signal }) => {
  const root = document.createElement('div');
  root.className = preview ? 'root preview' : 'root';
  el.append(root);
  const request = document.createElement('div');
  request.className = 'request';
  const out = document.createElement('pre');
  out.className = 'out';

  if (preview) {
    request.textContent = 'GET https://jsonplaceholder.typicode.com/users/3';
    out.textContent = pick(SAMPLE);
    root.append(request, out);
    return () => undefined;
  }

  const button = document.createElement('button');
  button.className = 'btn';
  button.textContent = 'GET a random user';
  out.textContent = 'Click the button to fetch.';
  root.append(button, request, out);

  button.addEventListener('click', async () => {
    const id = Math.ceil(Math.random() * 10);
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    request.textContent = `GET ${url}`;
    out.classList.remove('err');
    out.textContent = 'Loading...';
    button.disabled = true;
    try {
      const user = await ky.get(url, { signal }).json<User>();
      out.textContent = pick(user);
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
