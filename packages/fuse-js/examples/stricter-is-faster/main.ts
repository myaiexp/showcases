// One query timed at threshold 0.2, 0.4, 0.6 and 0.8, with how many items each finds
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { bars } from '../../shared/bars.ts';
import { benchDocs } from '../../shared/big-data.ts';
import { button } from '../../shared/controls.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';

const THRESHOLDS = [0.2, 0.4, 0.6, 0.8];
const KEYS = ['title', 'description', 'category', 'tags'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each bar is one search; the note is how many items it matched.' });
  const box = searchBox(stage.root, stage, { value: 'javascript', tries: ['javascript', 'golang', 'whisky', 'kilo lima'] });
  const chart = bars(stage.root, THRESHOLDS.map((t) => `threshold ${t}`));
  const docs = benchDocs(stage.preview ? 600 : 10000);
  // One Fuse per threshold, built once; only the searches are timed.
  const fuses = THRESHOLDS.map((threshold) => new Fuse(docs, { keys: KEYS, threshold }));

  const runAll = async (): Promise<void> => {
    if (!box.value.trim()) {
      stage.say('Type a query to time', 'warn'); // an empty query just returns every doc
      return;
    }
    chart.clear();
    for (const [i, fuse] of fuses.entries()) {
      await stage.wait(40);
      const t0 = performance.now();
      const found = fuse.search(box.value).length;
      chart.set(i, performance.now() - t0, `· ${found.toLocaleString('en')} found`);
    }
    stage.say(`"${box.value}" over ${docs.length.toLocaleString('en')} docs: stricter = fewer matches, sooner`, 'ok');
  };
  const fail = (err: unknown): void => {
    if (!stage.disposed) stage.say(String(err), 'bad');
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      await runAll();
      await wait(6000);
    });
  } else if (stage.bar) {
    button(stage.bar, 'Time the searches', () => void runAll().catch(fail));
    box.el.addEventListener('keydown', (e) => e.key === 'Enter' && void runAll().catch(fail));
    void runAll().catch(fail);
  }
  return stage.dispose;
};

export default mount;
