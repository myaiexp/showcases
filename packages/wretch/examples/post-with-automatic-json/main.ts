// POST a plain object: wretch writes the JSON body and header for you
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { button, textInput } from '../../shared/controls.ts';
import { envelope } from '../../shared/envelope.ts';
import { grid, pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import './style.css';

const IDEAS = ['Pine report', 'Sourdough diary', 'Map night', 'Cold dip log'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type a title and publish. The server is simulated in the page.' });
  // The server keeps what it is sent and answers 201 with the post and a new id.
  const server = createServer(stage, {
    'POST /posts': (req) => {
      const sent = req.body.kind === 'json' ? (req.body.value as object) : {};
      return { status: 201, json: { id: 100 + req.attempt, ...sent } };
    },
  });
  wire(stage, server, { rows: stage.preview ? 0 : 3 });
  const row = grid(stage.root);
  envelope(stage, { parent: row, title: 'Server received', headers: ['content-type'] }).follow(server);
  const list = pane(row, "The app's posts");
  const start = (): void => {
    list.clear();
    list.add('#1 Morning light…', 'dim');
    list.add('#2 A field guide…', 'dim');
  };
  start();

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const publish = async (title: string): Promise<void> => {
    stage.say(`api.post({ title: "${title}", userId: 1 }, "/posts").json()`);
    // The object goes in; wretch sets content-type to JSON and writes the text.
    const created = await api.post({ title, userId: 1 }, '/posts').json<{ id: number; title: string }>();
    if (stage.disposed) return;
    list.add(`#${created.id} ${created.title}`, 'ok');
    if (stage.preview) while (list.body.children.length > 3) list.body.firstElementChild?.remove();
    stage.say(`wretch sent the object as JSON; the server answered with it plus a new number, #${created.id}`, 'ok');
  };

  let title = IDEAS[0]!;
  if (stage.bar) {
    textInput(stage.bar, 'Title', title, (v) => (title = v), 18);
    button(stage.bar, 'Publish', () => void publish(title.trim() || 'Untitled').catch(() => {}));
  }
  if (stage.preview) {
    stage.play(async (wait) => {
      start();
      for (const idea of IDEAS.slice(0, 3)) {
        await publish(idea);
        await wait(1500);
      }
    });
  } else void publish(title).catch(() => {});
  return () => stage.dispose();
};

export default mount;
