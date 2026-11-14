// Filters left empty stay out of the address when omitUndefinedOrNullValues is on
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import type { Mount } from '@/types.ts';
import { address } from '../../shared/address.ts';
import { runCases } from '../../shared/cases.ts';
import { POSTS, type Post } from '../../shared/data.ts';
import { columns, screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';

interface Filters {
  userId?: number;
  id?: number;
  title?: string;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A search page with optional filters. Some are left empty. The server applies every filter it is given.' });
  const server = createServer(stage, {
    '/posts': (req) => {
      const q = req.query;
      // A filter that is present counts, even when its value is empty.
      return {
        json: POSTS.filter(
          (p) =>
            (!q.has('userId') || p.userId === Number(q.get('userId'))) &&
            (!q.has('id') || p.id === Number(q.get('id'))) &&
            (!q.has('title') || p.title.toLowerCase().includes((q.get('title') ?? '').toLowerCase())),
        ),
      };
    },
  });
  const [left, right] = columns(stage.root, 2) as [HTMLElement, HTMLElement];
  const plain = { bar: address(left, 'Without the option'), out: screen(left, 'Posts found') };
  const omit = { bar: address(right, 'With the option'), out: screen(right, 'Posts found') };

  const api = wretch(BASE).fetchPolyfill(server.fetch).addon(QueryStringAddon);

  const search = (filters: Filters, omitEmpty: boolean, side: typeof plain) =>
    api
      .url('/posts')
      .query(filters, { omitUndefinedOrNullValues: omitEmpty })
      .get()
      .json((found: Post[]) => {
        if (stage.disposed) return;
        side.bar.set(server.requests.at(-1)!.url);
        side.out.show(found.length ? `${found.length} found` : 'Nothing found', found.length ? 'ok' : 'bad');
      })
      .catch(() => {});

  const run = async (filters: Filters, say: string): Promise<void> => {
    plain.out.clear('…');
    omit.out.clear('…');
    stage.say(say);
    await search(filters, false, plain);
    await search(filters, true, omit);
    if (!stage.disposed) stage.say('An empty filter in the address is still a filter: the server tried to match it', 'warn');
  };

  runCases(stage, [
    { label: 'Only userId', run: () => run({ userId: 1, id: undefined, title: undefined }, '.query({ userId: 1, id: undefined, title: undefined })') },
    { label: 'Only title', run: () => run({ userId: undefined, id: undefined, title: 'bread' }, '.query({ userId: undefined, id: undefined, title: "bread" })') },
    { label: 'Nothing filled in', run: () => run({ userId: undefined, id: undefined, title: undefined }, '.query({}) with every filter left empty') },
  ], 2400);
  return () => stage.dispose();
};

export default mount;
