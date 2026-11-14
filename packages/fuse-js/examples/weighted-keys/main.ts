// Title and body weights decide which help article ranks first for "refund"
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

const ARTICLES = [
  { title: 'Refund policy', body: 'How to send an order back and get your money returned within thirty days.' },
  { title: 'Shipping times', body: 'Delivery takes three to five days. A refund of shipping costs is not possible once sent.' },
  { title: 'Change your address', body: 'Update where orders go. Any refund goes to the original payment method, not the new address.' },
  { title: 'Reset your password', body: 'Use the link in the email we send you to choose a new password.' },
  { title: 'Contact support', body: 'Chat or email us any time. Billing and refund questions are answered first.' },
];

// How much the title counts; the body gets the rest.
const TITLE_WEIGHTS = [0.9, 0.5, 0.1];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the weight: the same query, a different winner.' });
  const box = searchBox(stage.root, stage, { value: 'refund', placeholder: 'Search help articles…', tries: ['refund', 'password', 'address'] });
  const info = stage.preview ? pills(stage.root) : null;
  const list = resultList(stage.root, { max: stage.preview ? 3 : 5, ranks: true });
  let titleWeight = TITLE_WEIGHTS[0]!;

  const run = (): void => {
    info?.set('title weight', titleWeight.toFixed(1));
    info?.set('body weight', (1 - titleWeight).toFixed(1));
    // Each key carries a weight: a hit in a heavier key pulls the score down further.
    // ignoreLocation lets a word anywhere in the body count, not just near its start.
    const fuse = new Fuse(ARTICLES, {
      keys: [
        { name: 'title', weight: titleWeight },
        { name: 'body', weight: Math.max(0.01, 1 - titleWeight) },
      ],
      includeScore: true,
      includeMatches: true,
      ignoreLocation: true,
    });
    const results = fuse.search(box.value);
    list.show(
      results.map((r) => ({ id: r.refIndex, title: marked(r, 'title', r.item.title), sub: marked(r, 'body', r.item.body), score: r.score })),
      box.value ? 'No article is close' : 'Type a word to search',
    );
    stage.say(
      results[0] ? `With the title counting ${Math.round(titleWeight * 100)}% and the body ${Math.round((1 - titleWeight) * 100)}%, "${results[0].item.title}" ranks first` : '',
      'ok',
    );
  };

  if (stage.preview) stage.cycle(TITLE_WEIGHTS, 2400, (w) => ((titleWeight = w), run()));
  else if (stage.bar) {
    slider(stage.bar, 'title weight', 0.1, 0.9, 0.1, titleWeight, (v) => ((titleWeight = v), run()), (v) => `${v.toFixed(1)} (body ${(1 - v).toFixed(1)})`);
    box.onInput(run);
    run();
  }
  return stage.dispose;
};

export default mount;
