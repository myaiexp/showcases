// renderer.image turns ![alt](src "caption") into a figure with a caption
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { cat, landscape } from '../../shared/images.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

// Definitions are added after the typed text, so the Markdown stays short.
const DEFINITIONS = `

[cat]: ${cat} "Biscuit, asleep again"
[hills]: ${landscape} "The view from the hostel"
[plain]: ${landscape}`;

const ALBUM = `Photos from the weekend:

![A cat][cat]

![Green hills][hills]

![No caption here][plain]`;

const CARD = `![Cat][cat]

![Hills][hills]`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pictures are ![alt text][name]; the title in quotes becomes the caption' });

  const figures = new Marked({
    renderer: {
      image({ href, title, text }) {
        const caption = title ? `<figcaption>${esc(title)}</figcaption>` : '';
        return `<figure class="photo"><img src="${esc(href)}" alt="${esc(text)}">${caption}</figure>`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : ALBUM }],
    sides: [
      { label: 'default', render: (md) => render(plain, md + DEFINITIONS) },
      { label: 'image override', render: (md) => render(figures, md + DEFINITIONS) },
    ],
    caption: 'The quoted title on each picture becomes a caption under it, in a framed figure. A picture without a title gets no caption.',
  });

  return () => stage.dispose();
};

export default mount;
