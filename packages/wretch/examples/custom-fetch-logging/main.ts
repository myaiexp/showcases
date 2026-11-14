// A custom fetch for .fetchPolyfill() that logs and times every request
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';

const PAGES = ['/posts', '/users/1', '/posts/3'];
const SLOW: Record<string, number> = { '/posts': 700, '/users/1': 0, '/posts/3': 300 };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button sends a request through the wrapped fetch.' });
  const server = createServer(stage, {
    '/posts/:id': () => ({ json: { id: 3, title: 'Bread that rises overnight' }, delay: SLOW['/posts/3']! }),
    '/users/:id': () => ({ json: { id: 1, name: 'Aino Virtanen' }, delay: SLOW['/users/1']! }),
    '/posts': () => ({ json: [{ id: 1 }, { id: 2 }], delay: SLOW['/posts']! }),
  });
  wire(stage, server, { rows: stage.preview ? 0 : 3 });
  // A pane stands in for the browser console, so the lines are visible on the page.
  const consolePane = pane(stage.root, 'console');
  const log = (text: string, tone?: 'ok' | 'dim'): void => {
    if (stage.disposed) return;
    consolePane.add(text, tone);
    while (consolePane.body.children.length > (stage.preview ? 4 : 8)) consolePane.body.firstElementChild?.remove();
  };

  // The wrapper: log, start a timer, call the real fetch, log when it settles.
  // `server.fetch` stands in for the browser's own fetch here.
  const api = wretch(BASE).fetchPolyfill((url, opts) => {
    log(`Fetching: ${url}`);
    const started = performance.now();
    return server.fetch(url, opts).finally(() => {
      log(`${url.replace(BASE, '')}: ${Math.round(performance.now() - started)} ms`, 'ok');
    });
  });

  const load = async (path: string): Promise<void> => {
    stage.say(`api.get("${path}").json() goes through the wrapper`);
    await api.get(path).json();
    if (!stage.disposed) stage.say('The wrapper wrote one line before and one after, and wretch never noticed', 'ok');
  };
  const safe = (path: string): void => void load(path).catch(() => {});

  if (stage.bar) PAGES.forEach((p) => button(stage.bar!, `GET ${p}`, () => safe(p)));
  if (stage.preview) {
    stage.play(async (wait) => {
      for (const p of PAGES) {
        await load(p);
        await wait(1000);
      }
      consolePane.clear();
    });
  } else safe(PAGES[0]!);
  return () => stage.dispose();
};

export default mount;
