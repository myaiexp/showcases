// One loose query, minMatchCharLength 1 vs 2 vs 3: marks and results thin out
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';

const TITLES = [
  'Learning Scala',
  'JavaScript Patterns',
  'Design Patterns',
  'Clean Code',
  'Eloquent JavaScript',
  'Python Crash Course',
  'Structure of Programs',
  'The Pragmatic Programmer',
  'Refactoring',
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Matches shorter than minMatchCharLength are not reported, so they are not marked and cannot carry a result on their own.' });
  const box = searchBox(stage.root, stage, { value: 'scala', tries: ['scala', 'patern', 'program', 'refactor'] });
  const lengths = stage.preview ? [1, 3] : [1, 2, 3];
  const cols = columns(
    stage,
    lengths.map((n) => `minMatchCharLength: ${n}`),
  );
  const lists = cols.map((c) => resultList(c.body, { max: stage.preview ? 5 : 8, ranks: false, scores: false, empty: 'No matches' }));

  // The same loose search each time (anywhere in the title, threshold 0.6); only the minimum run changes.
  const fuses = lengths.map((minMatchCharLength) => new Fuse(TITLES, { minMatchCharLength, threshold: 0.6, ignoreLocation: true, includeMatches: true }));

  const run = (query: string): void => {
    if (!query.trim()) {
      lists.forEach((l) => l.show([], 'Type a word'));
      stage.say('');
      return;
    }
    const found = fuses.map((f) => f.search(query));
    found.forEach((rs, i) => lists[i]!.show(rs.map((r) => ({ id: r.refIndex, title: marked(r, undefined, r.item) }))));
    const counts = found.map((rs) => rs.length);
    stage.say(
      `Titles found: ${counts.join(' / ')} for minimum ${lengths.join(' / ')}`,
      counts[0]! > counts[counts.length - 1]! ? 'ok' : 'info',
    );
  };
  box.onInput(run);
  run(box.value);
  if (stage.preview) stage.cycle(['scala', 'patern', 'scala'], 2600, (q) => box.set(q));
  return stage.dispose;
};

export default mount;
