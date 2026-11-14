// One Fuse.createIndex shared by three Fuse instances that search with different thresholds
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { BOOKS } from '../../shared/data.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns, pills } from '../../shared/widgets.ts';

const KEYS = ['title', 'author'];
const LEVELS = [
  { name: 'Strict', threshold: 0.1 },
  { name: 'Balanced', threshold: 0.4 },
  { name: 'Forgiving', threshold: 0.6 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three searches, one index: the books were only indexed once.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Search books…', tries: ['jon', 'javscript', 'le guin', 'gatsbi'] });
  const info = pills(stage.root);
  const cols = columns(stage, LEVELS.map((l) => `${l.name} ${l.threshold}`));
  const lists = cols.map((c) => resultList(c.body, { max: stage.preview ? 3 : 8, scores: false, ranks: false }));

  // The index is built once, then handed to every Fuse that searches the same list and keys.
  const index = Fuse.createIndex(KEYS, BOOKS);
  const searchers = LEVELS.map((l) => new Fuse(BOOKS, { keys: KEYS, threshold: l.threshold }, index));

  info.set('index built', 1, 'ok');
  info.set('Fuse instances', searchers.length);
  info.set('records', index.size());

  const run = (query: string): void => {
    const q = query.trim();
    const counts = searchers.map((fuse, i) => {
      const results = q ? fuse.search(q) : [];
      lists[i]!.show(results.map((r) => ({ id: r.refIndex, title: r.item.title })), q ? 'nothing' : 'Type to search');
      return results.length;
    });
    stage.say(q ? `"${q}" finds ${counts.join(', ')} books: same index, different strictness` : '');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['jon', 'javscript', 'le guin']);
  return stage.dispose;
};

export default mount;
