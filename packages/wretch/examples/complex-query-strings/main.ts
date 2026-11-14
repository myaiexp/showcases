// A posts page builds its address from authors, a page size and a sort order
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import type { Mount } from '@/types.ts';
import { address } from '../../shared/address.ts';
import { checkbox, select, slider } from '../../shared/controls.ts';
import { POSTS, USERS, type Post } from '../../shared/data.ts';
import { screen } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';

interface Choice {
  userId: number[];
  limit: number;
  sort: 'id' | 'title';
}

const PRESETS: Choice[] = [
  { userId: [1, 2], limit: 5, sort: 'id' },
  { userId: [3], limit: 2, sort: 'title' },
  { userId: [1, 2, 3], limit: 4, sort: 'title' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick authors, a page size and a sort order. The address is rebuilt from them.' });
  const server = createServer(stage, {
    '/posts': (req) => {
      const authors = req.query.getAll('userId').map(Number);
      const sort = req.query.get('_sort') === 'title' ? 'title' : 'id';
      const found = POSTS.filter((p) => !authors.length || authors.includes(p.userId)).sort((a, b) => (sort === 'id' ? a.id - b.id : a.title.localeCompare(b.title)));
      return { json: found.slice(0, Number(req.query.get('_limit') ?? found.length)) };
    },
  });
  const bar = address(stage.root);
  const shown = screen(stage.root, 'Posts on the page');

  const api = wretch(BASE).fetchPolyfill(server.fetch).addon(QueryStringAddon);
  let latest = 0;

  const search = async (c: Choice): Promise<void> => {
    const mine = ++latest;
    await api
      .url('/posts')
      // A list becomes one userId=… piece per item; the other keys are plain pieces.
      .query({ userId: c.userId, _limit: c.limit, _sort: c.sort })
      .get()
      .json((posts: Post[]) => {
        if (stage.disposed || mine !== latest) return;
        bar.set(server.requests.at(-1)!.url);
        shown.show(stage.preview ? `ids: ${posts.map((p) => p.id).join(', ')}` : posts.map((p) => `#${p.id} ${p.title}`).join('\n') || 'No posts', posts.length ? 'ok' : 'warn');
        stage.say(`${c.userId.length} author${c.userId.length === 1 ? '' : 's'}, at most ${c.limit}, sorted by ${c.sort}`, 'ok');
      })
      .catch(() => {});
  };

  if (stage.bar) {
    const now: Choice = { ...PRESETS[0]!, userId: [...PRESETS[0]!.userId] };
    const go = (): void => void search({ ...now, userId: [...now.userId] });
    for (const u of USERS.slice(0, 3)) {
      checkbox(stage.bar, u.name, now.userId.includes(u.id), (on) => {
        now.userId = on ? [...now.userId, u.id].sort() : now.userId.filter((id) => id !== u.id);
        go();
      });
    }
    slider(stage.bar, 'Page size', 1, 6, 1, now.limit, (v) => {
      now.limit = v;
      go();
    });
    select(stage.bar, 'Sort by', [['id', 'id'], ['title', 'title']] as const, (v) => {
      now.sort = v;
      go();
    });
    go();
  } else {
    stage.cycle(PRESETS, 2400, (c) => void search(c));
  }
  return () => stage.dispose();
};

export default mount;
