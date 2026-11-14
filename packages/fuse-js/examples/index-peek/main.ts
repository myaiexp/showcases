// What the index keeps for each field: the text (v) and a length note (n), read from toJSON()
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { BOOKS } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine } from '../../shared/widgets.ts';
import './style.css';

const PICK = [12, 13, 8, 2, 7, 11, 5];
const DOCS = PICK.map((i) => ({ title: BOOKS[i]!.title, author: BOOKS[i]!.author }));
const KEYS = ['title', 'author'];
const STEPS = [1, 0, 2];

interface Cell {
  v: string;
  n: number;
}
interface Rec {
  i: number;
  $: Record<string, Cell>;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'n is 1 for a one-word field and shrinks as the field gets longer. fieldNormWeight changes how fast.' });
  const call = callLine(stage.root);
  const table = document.createElement('div');
  table.className = 'fz-peek';
  stage.root.append(table);
  const rows = stage.preview ? 5 : DOCS.length;

  const run = (fieldNormWeight: number): void => {
    const fuse = new Fuse(DOCS, { keys: KEYS, fieldNormWeight });
    // toJSON() is the index as plain data: one record per document, one {v, n} per key.
    const records = fuse.getIndex().toJSON().records as unknown as Rec[];
    call.set(`new Fuse(docs, { keys, fieldNormWeight: ${fieldNormWeight} }).getIndex().toJSON().records`);
    const head = ['i', ...KEYS.flatMap((k) => [`${k} (v)`, 'n'])].map((t) => `<span class="fz-peek-h">${t}</span>`).join('');
    const body = records.slice(0, rows).map((r) => {
      const cells = KEYS.map((_, k) => {
        const c = r.$[k]!;
        const text = document.createElement('span');
        text.className = 'fz-peek-v';
        text.textContent = c.v;
        text.title = c.v;
        const bar = document.createElement('span');
        bar.className = 'fz-peek-n';
        bar.style.setProperty('--n', String(c.n));
        bar.textContent = c.n.toFixed(2);
        return [text, bar];
      }).flat();
      const idx = document.createElement('span');
      idx.className = 'fz-peek-i';
      idx.textContent = String(r.i);
      return [idx, ...cells];
    });
    table.innerHTML = head;
    for (const row of body) table.append(...row);
    const titles = records.map((r) => r.$[0]!);
    const short = titles.reduce((a, b) => (b.n > a.n ? b : a));
    const long = titles.reduce((a, b) => (b.n < a.n ? b : a));
    stage.say(
      fieldNormWeight === 0
        ? 'fieldNormWeight 0: every field has n = 1, length is ignored'
        : `"${short.v}" has n ${short.n.toFixed(2)}, "${long.v}" only ${long.n.toFixed(2)}: a match in the longer field scores a bit worse`,
      'info',
    );
  };

  if (stage.preview) stage.cycle(STEPS, 2800, run);
  else if (stage.bar) {
    slider(stage.bar, 'fieldNormWeight', 0, 2, 0.5, 1, run, (v) => v.toFixed(1));
    run(1);
  }
  return stage.dispose;
};

export default mount;
