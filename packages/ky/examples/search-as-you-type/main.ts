// Search as you type: each new key cancels the search before it
import type { Mount } from '@/types.ts';
import { checkbox, textInput } from '../../shared/controls.ts';
import { demo, notes } from '../../shared/req-kit.ts';

const WORDS = ['apple', 'apricot', 'pear', 'peach', 'pepper', 'plum', 'pineapple', 'banana', 'pea'];

const mount: Mount = (el, ctx) => {
  let cancelOld = true;
  let text = '';
  let sent = 0;
  let cancelled = 0;
  let inFlight = 0;
  let shown: { q: string; hits: string[] } | null = null;
  let controller: AbortController | null = null;
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Type in the box. Short searches are slow to answer here, as they are for real: without cancelling, an old answer can arrive last and replace the right one.',
    server: { latency: 100 },
    routes: {
      '/search': (req) => {
        const q = req.url.searchParams.get('q') ?? '';
        // Short searches match more and take longer, so the answers can overtake each other.
        return { delay: [0, 700, 450, 150][q.length] ?? 100, json: { q, hits: WORDS.filter((w) => w.startsWith(q)) } };
      },
    },
  });
  const row = stage.row();
  const box = notes(row, 'Search box');
  const results = notes(row, 'Results on screen');

  const paint = (): void => {
    box.set([`typed: "${text}"`, `sent ${sent}, cancelled ${cancelled}`]);
    if (!shown) return results.pending('nothing yet');
    const stale = shown.q !== text;
    results.set([[`for "${shown.q}"${stale ? '  (old)' : ''}`, stale ? 'bad' : 'ok'], shown.hits.join(', ') || 'no matches']);
    if (inFlight > 0) return;
    if (stale) stage.say(`Stale: results are for "${shown.q}"`, 'bad');
    else stage.say(cancelled ? `Fresh: ${cancelled} old searches cancelled` : 'Fresh results', 'ok');
  };

  const search = async (q: string): Promise<void> => {
    if (cancelOld) controller?.abort();
    controller = new AbortController();
    sent++;
    inFlight++;
    paint();
    try {
      // `signal` ties this search to the controller; the next keystroke aborts it.
      const got = await api.get('https://shop.example/search', { searchParams: { q }, signal: controller.signal, retry: 0 }).json<{ q: string; hits: string[] }>();
      shown = got;
    } catch (error) {
      if (stage.disposed) return;
      if ((error as Error).name !== 'AbortError') throw error;
      cancelled++;
    } finally {
      inFlight--;
      if (!stage.disposed) paint();
    }
  };
  const type = (v: string): void => {
    text = v;
    if (!v) {
      controller?.abort();
      shown = null;
      paint();
      return;
    }
    stage.task(() => search(v));
  };

  if (stage.preview) {
    let round = 0;
    stage.play(async (wait) => {
      cancelOld = round++ % 2 === 1;
      server.reset();
      text = '';
      sent = cancelled = inFlight = 0;
      shown = null;
      controller = null;
      paint();
      stage.say(cancelOld ? 'Typing, cancelling old searches…' : 'Typing, letting old searches run…');
      for (const letter of 'pea') {
        await wait(150);
        type(text + letter);
      }
      await wait(2600);
    });
  } else {
    textInput(stage.bar!, 'search', '', type, 14);
    checkbox(stage.bar!, 'cancel the older search on each key', true, (v) => (cancelOld = v));
    paint();
  }
  return stage.dispose;
};

export default mount;
