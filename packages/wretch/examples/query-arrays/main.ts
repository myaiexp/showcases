// A list in .query() repeats the key, so a shop can filter by several tags
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import type { Mount } from '@/types.ts';
import { address } from '../../shared/address.ts';
import { runCases } from '../../shared/cases.ts';
import { PRODUCTS } from '../../shared/data.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The shop shows products that carry every tag asked for.' });
  const server = createServer(stage, {
    '/products': (req) => {
      const tags = req.query.getAll('tag');
      return { json: PRODUCTS.filter((p) => tags.every((t) => p.tags.includes(t))) };
    },
  });
  wire(stage, server, { rows: 0 });
  const bar = address(stage.root);
  const shown = screen(stage.root, 'What the shop shows');

  const api = wretch(`${BASE}/products`).fetchPolyfill(server.fetch).addon(QueryStringAddon);

  const filter = async (tags: string[]): Promise<void> => {
    stage.say(`.query({ tag: ${JSON.stringify(tags)} })`);
    shown.clear();
    await api
      .query({ tag: tags })
      .get()
      .json((items: { name: string }[]) => {
        if (stage.disposed) return;
        bar.set(server.requests.at(-1)!.url);
        shown.show(items.length ? items.map((p) => p.name).join(', ') : 'Nothing matches', items.length ? 'ok' : 'warn');
        stage.say(`${tags.length} tag${tags.length > 1 ? 's' : ''} in the list became ${tags.length} tag= piece${tags.length > 1 ? 's' : ''} in the address`, 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'outdoor', run: () => filter(['outdoor']) },
    { label: 'outdoor + clothing', run: () => filter(['outdoor', 'clothing']) },
    { label: 'cooking + winter', run: () => filter(['cooking', 'winter']) },
  ]);
  return () => stage.dispose();
};

export default mount;
