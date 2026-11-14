// A client with .resolve(r => r.json()): every call returns the data itself
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { button, textInput } from '../../shared/controls.ts';
import { USERS, type User } from '../../shared/data.ts';
import { envelope } from '../../shared/envelope.ts';
import { pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';

const NEWCOMERS = ['Eeva Laine', 'Femi Adeyemi', 'Gus Lindqvist'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Load the users, then add one. The server is simulated in the page.' });
  let users: User[] = [];
  const reset = (): void => {
    users = USERS.slice(0, 3).map((u) => ({ ...u }));
  };
  reset();
  const server = createServer(stage, {
    'GET /users': (req) => (req.headers.get('authorization') ? { json: users } : { status: 401, json: {} }),
    'POST /users': (req) => {
      const sent = req.body.kind === 'json' ? (req.body.value as { name: string }) : { name: '?' };
      const user = { id: users.length + 1, name: sent.name, email: '', city: '' };
      users.push(user);
      return { status: 201, json: user };
    },
  });
  wire(stage, server, { rows: stage.preview ? 1 : 3 });
  if (!stage.preview) envelope(stage, { title: 'Last request: the login header is on every call', headers: ['authorization'], noBody: true }).follow(server);
  const screen = pane(stage.root, 'Users shown in the app');

  // The client: login header once, and every answer is already read as JSON.
  const api = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .auth('Bearer token')
    .resolve((r) => r.json());

  const draw = (list: User[]): void => {
    screen.clear();
    for (const u of list) screen.add(`${u.id}. ${u.name}`);
  };
  const load = async (): Promise<void> => {
    stage.say('const users = await api.get("/users")');
    // .resolve() gave every answer back as unknown data: say what this one is.
    const list = (await api.get('/users')) as User[];
    if (stage.disposed) return;
    draw(list);
    stage.say(`users is already the list: ${list.length} people, no .json() written here`, 'ok');
  };
  const add = async (name: string): Promise<void> => {
    stage.say(`const user = await api.post({ name: "${name}" }, "/users")`);
    const user = (await api.post({ name }, '/users')) as User;
    if (stage.disposed) return;
    screen.add(`${user.id}. ${user.name}`, 'ok');
    stage.say(`user is the created person, #${user.id}, straight from the server`, 'ok');
  };
  const safe = (p: Promise<void>): void => void p.catch(() => {});

  let name = NEWCOMERS[0]!;
  if (stage.bar) {
    button(stage.bar, 'Load users', () => safe(load()));
    textInput(stage.bar, 'Name', name, (v) => (name = v), 14);
    button(stage.bar, 'Add user', () => safe(add(name.trim() || 'Nobody')));
  }
  if (stage.preview) {
    stage.play(async (wait) => {
      reset();
      screen.clear();
      await load();
      await wait(1400);
      await add(NEWCOMERS[0]!);
      await wait(2000);
    });
  } else safe(load());
  return () => stage.dispose();
};

export default mount;
