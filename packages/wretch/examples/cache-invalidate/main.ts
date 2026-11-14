// throttlingCache({ invalidate }): a write drops the reads it makes stale
import wretch from 'wretch';
import { throttlingCache } from 'wretch/middlewares';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { cameFromCache, logTo, mwScene, solo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE } from '../../shared/server.ts';

const mount: Mount = (el, ctx) => {
  const todos: string[] = [];
  const { stage, server, tl } = mwScene(el, ctx, {
    hint: 'Read the list twice, add an item, then read the list again.',
    routes: {
      'GET /todos': () => ({ json: todos }),
      'POST /todos': (req) => {
        if (req.body.kind === 'json') todos.push((req.body.value as { text: string }).text);
        return { status: 201, json: { ok: true } };
      },
    },
    span: 2500,
    latency: ctx.preview ? 150 : 250,
  });
  const out = pane(stage.root, 'What the list shows');
  const log = logTo(stage, out);
  let invalidateOnWrite = true;

  const run = solo(async () => {
    tl.reset();
    out.clear();
    todos.splice(0, todos.length, 'Buy bread', 'Walk the dog');
    const api = wretch(BASE)
      .fetchPolyfill(server.fetch)
      .middlewares([
        throttlingCache({
          throttle: 6000,
          // Return a pattern (string or RegExp) and every cached key that matches is dropped.
          invalidate: invalidateOnWrite ? (_url, opts) => (opts.method === 'POST' ? /\/todos/ : undefined) : undefined,
        }),
      ]);
    stage.say(invalidateOnWrite ? 'A POST to /todos will drop the cached list' : 'Nothing drops the cached list');

    const read = async (): Promise<boolean> => {
      const res = await api.get('/todos').res();
      const list = (await res.json()) as string[];
      if (stage.disposed) return false;
      const stale = list.length < todos.length;
      log(`List: ${list.length} items (${cameFromCache(res) ? 'cache' : 'server'})${stale ? ' STALE' : ''}`, stale ? 'bad' : 'ok');
      return stale;
    };
    try {
      await read();
      await stage.wait(300);
      await read();
      await stage.wait(300);
      tl.mark('add item');
      await api.post({ text: 'Pay rent' }, '/todos').res();
      const stale = await read();
      if (stage.disposed) return;
      if (stale) stage.say('The new item is missing: the cache still holds the old list', 'bad');
      else stage.say('The POST dropped the cached list, so the next read fetched the new one', 'ok');
    } catch (err) {
      if (!stage.disposed) console.error(err);
    }
  });

  if (stage.bar) {
    checkbox(stage.bar, 'invalidate on POST', invalidateOnWrite, (v) => (invalidateOnWrite = v));
    button(stage.bar, 'Run again', () => void run());
  }
  let n = 0;
  runScript(stage, async (wait) => {
    if (stage.preview) invalidateOnWrite = n++ % 2 === 1;
    await run();
    await wait(1500);
  });
  return () => stage.dispose();
};

export default mount;
