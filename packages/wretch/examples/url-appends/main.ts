// .url() adds a piece to the address each time, building it up step by step
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button } from '../../shared/controls.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { addressBar } from './address-bar.ts';
import './style.css';

const BLOGS = [{ id: 42, name: 'Notes from the lake' }, { id: 7, name: 'Bread diary' }];
const PIECES = ['/api', '/blogs', '/42'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add pieces to the address, then send. Each .url() makes a new, longer client.' });
  const server = createServer(stage, {
    'GET /api/blogs/:id': (req) => {
      const blog = BLOGS.find((b) => String(b.id) === req.params['id']);
      return blog ? { json: blog } : { status: 404, json: { error: 'No such blog' } };
    },
    'GET /api/blogs': () => ({ json: BLOGS }),
  });
  wire(stage, server, { rows: 0 });
  const bar = addressBar(stage.root, BASE);
  const shown = screen(stage.root, 'What the app shows');

  // Start from the bare host; every .url() below returns a longer copy.
  const start = wretch(BASE).fetchPolyfill(server.fetch);
  let api = start;
  let pieces: string[] = [];

  const add = (piece: string): void => {
    api = api.url(piece);
    pieces = [...pieces, piece];
    bar.show(pieces);
    stage.say(`.url("${piece}") added to the address`);
  };
  const send = async (): Promise<void> => {
    stage.say(`GET ${pieces.join('') || '/'}`);
    const data = await api.get().json<unknown>().catch(() => ({ error: 'nothing at that address' }));
    if (stage.disposed) return;
    shown.show(JSON.stringify(data));
    stage.say('The finished address reached the server', 'ok');
  };
  const reset = (): void => {
    api = start;
    pieces = [];
    bar.show(pieces);
    shown.clear();
    stage.say('Back to the bare address');
  };

  if (stage.bar) {
    for (const piece of PIECES) button(stage.bar, `.url("${piece}")`, () => add(piece));
    button(stage.bar, 'Send', () => void send());
    button(stage.bar, 'Start over', reset);
  }
  runScript(stage, async (wait) => {
    reset();
    for (const piece of PIECES) {
      await wait(900);
      add(piece);
    }
    await wait(500);
    await send();
    await wait(1800);
  });
  return () => stage.dispose();
};

export default mount;
