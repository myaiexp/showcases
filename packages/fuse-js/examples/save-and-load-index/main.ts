// An index saved as JSON text, sent away, and loaded into a new Fuse that skips indexing
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { people } from '../../shared/big-data.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine, columns, pills, textBox } from '../../shared/widgets.ts';

const KEYS = ['name', 'company', 'description'];
const kb = (bytes: number): string => (bytes < 10240 ? `${(bytes / 1024).toFixed(1)} KB` : `${Math.round(bytes / 1024)} KB`);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The right-hand side never builds an index: it reads the one that arrived as text.' });
  const [build, page] = columns(stage, ['Build side', 'The page']);
  callLine(build!.body, 'JSON.stringify(fuse.getIndex().toJSON())');
  const peek = textBox(build!.body, 'fz-peek');
  peek.style.cssText = 'font-family:var(--font-mono);font-size:0.78em;overflow:hidden;word-break:break-all;max-height:' + (stage.preview ? '3.6em' : '7em');
  const sizeInfo = pills(build!.body);
  callLine(page!.body, 'Fuse.parseIndex(JSON.parse(json))');
  callLine(page!.body, 'new Fuse(list, { keys }, index)');
  const box = searchBox(page!.body, stage, { placeholder: 'Search…', tries: ['pilot', 'chess', 'jazz'] });
  const list = resultList(page!.body, { max: stage.preview ? 2 : 5, scores: false });

  let fuse: Fuse<ReturnType<typeof people>[number]> | null = null;
  let docs = people(stage.preview ? 24 : 200);

  const run = (): void => {
    const q = box.value.trim();
    if (!fuse || !q) {
      list.show([], fuse ? 'Type to search' : 'Waiting for the index…');
      return;
    }
    const results = fuse.search(q, { limit: 5 });
    list.show(results.map((r) => ({ id: r.refIndex, title: r.item.name, ...(stage.preview ? {} : { sub: r.item.description }) })));
  };
  const send = (): void => {
    // Build side: a Fuse indexes the list; its index can be turned into text.
    const index = new Fuse(docs, { keys: KEYS }).getIndex();
    const json = JSON.stringify(index.toJSON());
    peek.textContent = `${json.slice(0, stage.preview ? 120 : 320)}…`;
    sizeInfo.set('records', index.size());
    const bytes = new TextEncoder().encode(json).length;
    sizeInfo.set('as text', kb(bytes));
    // The page: read the text back into an index and hand it to Fuse with the same list.
    const loaded = Fuse.parseIndex<(typeof docs)[number]>(JSON.parse(json));
    fuse = new Fuse(docs, { keys: KEYS }, loaded);
    run();
    stage.say(`${index.size()} records travelled as ${kb(bytes)} of text; the page did no indexing`, 'ok');
  };
  box.onInput(run);

  if (stage.preview) {
    page!.el.style.transition = 'opacity 0.4s';
    stage.play(async (wait) => {
      fuse = null;
      page!.el.style.opacity = '0.25';
      peek.textContent = '';
      sizeInfo.set('records', '…');
      sizeInfo.set('as text', '…');
      run();
      await wait(1200);
      send();
      page!.el.style.opacity = '1';
      await wait(500);
      for (const q of ['pilot', 'jazz']) {
        await box.type(q);
        await wait(1500);
        await box.erase();
      }
    });
  } else if (stage.bar) {
    select(stage.bar, 'people in the list', [24, 200, 2000, 8000].map((n) => [n, n.toLocaleString('en')] as const), (n) => ((docs = people(n)), send()), 200);
    send();
  }
  return stage.dispose;
};

export default mount;
