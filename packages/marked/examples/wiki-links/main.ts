// An inline extension turns [[Page]] into a link, red when page missing
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { note } from '../../shared/panes.ts';
import { esc, render, slugify } from '../../shared/renderer-kit.ts';
import './style.css';

const PAGES = new Set(['packing list', 'itinerary', 'budget']);

const SAMPLE = `# Lisbon trip
Start with the [[Itinerary]], then the [[Packing list]].
Money lives in [[Budget|our budget]].
Still to write: [[Restaurants]] and [[Day trips]].`;

const CARD = `See the [[Itinerary]]
and [[Packing list]].
Todo: [[Restaurants]]`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Write [[Page name]] or [[Page|label]]' });

  const wiki = new Marked({
    extensions: [
      {
        name: 'wikiLink',
        level: 'inline',
        start: (src) => src.indexOf('[['),
        tokenizer(src) {
          const match = /^\[\[([^\]|\n]+)(?:\|([^\]\n]+))?\]\]/.exec(src);
          if (!match) return undefined;
          const page = match[1]!.trim();
          return { type: 'wikiLink', raw: match[0], page, label: (match[2] ?? page).trim() };
        },
        renderer(token) {
          const page = String(token.page);
          const exists = PAGES.has(page.toLowerCase());
          return `<a class="wiki ${exists ? 'exists' : 'missing'}" href="#${slugify(page)}" title="${exists ? 'Open page' : 'Page not written yet'}">${esc(String(token.label))}</a>`;
        },
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(wiki, md),
    caption: 'Double square brackets make a link to another page. Pages in the list are blue; pages nobody wrote yet are red and dashed, like in a wiki.',
  });
  if (!stage.preview) note(stage.root, `Pages that exist: ${[...PAGES].join(', ')}`);

  return () => stage.dispose();
};

export default mount;
