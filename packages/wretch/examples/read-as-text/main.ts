// .text() gives the answer exactly as sent, a plain string, with nothing parsed
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv } from '../../shared/screen.ts';
import { pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const POEM = 'Roses are red,\n  violets are blue,\n"sugar" is sweet\n';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Read two different answers as text and look at every character.' });
  const server = createServer(stage, {
    'GET /poem': () => ({ text: POEM }),
    'GET /profile': () => ({ json: { name: 'Aino', age: 31 } }),
  });
  wire(stage, server, { rows: 0 });
  const shown = pane(stage.root, 'What .text() gave you');
  const facts = kv(stage.root, 'About the string');

  const read = async (path: string): Promise<void> => {
    shown.clear();
    stage.say(`api.get("${path}").text()`);
    await wretch(BASE)
      .fetchPolyfill(server.fetch)
      .get(path)
      .text((text) => {
        if (stage.disposed) return;
        // The string is shown with its quotes and \n marks: nothing has been tidied.
        shown.set(JSON.stringify(text), 'ok');
        facts.set([
          ['type', typeof text],
          ['length', `${text.length} characters`],
          ['lines', String(text.split('\n').length)],
        ]);
        stage.say(path === '/poem' ? 'Quotes, spaces and line breaks all survived' : 'Even JSON stays a string when read as text: no data, just characters', 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'A poem', run: () => read('/poem') },
    { label: 'A JSON answer', run: () => read('/profile') },
  ], 2400);
  return () => stage.dispose();
};

export default mount;
