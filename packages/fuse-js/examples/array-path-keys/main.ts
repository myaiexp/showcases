// A key that contains a dot: the string path splits it, the array path keeps it whole
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { codeHeads } from '../../shared/code-heads.ts';
import { columns, q } from '../../shared/widgets.ts';

// Each upload keeps its details under meta, and two of those names contain a dot.
const UPLOADS = [
  { owner: 'Sara', meta: { 'file.name': 'budget-2026.xlsx', 'file.type': 'spreadsheet' } },
  { owner: 'Mikko', meta: { 'file.name': 'holiday-photos.zip', 'file.type': 'archive' } },
  { owner: 'Aiko', meta: { 'file.name': 'meeting-notes.docx', 'file.type': 'document' } },
  { owner: 'Lucas', meta: { 'file.name': 'logo-final.svg', 'file.type': 'image' } },
  { owner: 'Grace', meta: { 'file.name': 'budget-review.pdf', 'file.type': 'document' } },
];

const QUERIES = ['budjet', 'notes', 'logo'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "'meta.file.name' is read as meta → file → name, and there is no such path." });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'budjet', placeholder: 'Find an upload…', tries: QUERIES });
  const cols = columns(stage, ["keys: ['meta.file.name']", "keys: [['meta', 'file.name']]"]);
  codeHeads(cols);
  const [dotted, array] = cols;
  const max = stage.preview ? 3 : 5;
  const dottedList = resultList(dotted!.body, { max, ranks: false, scores: false, empty: 'Found nothing' });
  const arrayList = resultList(array!.body, { max, ranks: false, scores: !stage.preview });

  // A string key is split at every dot. An array key is taken as written, so
  // ['meta', 'file.name'] means: meta, then the one field named "file.name".
  const byString = new Fuse(UPLOADS, { keys: ['meta.file.name'], includeMatches: true });
  const byArray = new Fuse(UPLOADS, { keys: [['meta', 'file.name']], includeMatches: true, includeScore: true });

  const run = (query: string): void => {
    if (!query.trim()) {
      dottedList.show([], 'Type a file name');
      arrayList.show([], 'Type a file name');
      stage.say('');
      return;
    }
    const a = byString.search(query);
    const b = byArray.search(query);
    dottedList.show(a.map((r) => ({ id: r.refIndex, title: r.item.meta['file.name'] })));
    // Fuse reports the array key as a dotted string again: matches[].key is 'meta.file.name'.
    arrayList.show(
      b.map((r) => ({
        id: r.refIndex,
        title: marked(r, 'meta.file.name', r.item.meta['file.name']),
        badge: !stage.preview && r.matches?.[0] ? q(r.matches[0].key ?? '') : undefined,
        score: r.score,
      })),
    );
    stage.say(
      b.length ? `The array key finds ${b.length}; the dotted string finds ${a.length}. Fuse reports where it matched as 'meta.file.name'` : `No upload is close to "${query}"`,
      b.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, QUERIES);
  return stage.dispose;
};

export default mount;
