// An inline extension turns [4/5 stars] into filled and empty star glyphs
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Café reviews:
- Blue Door [4/5 stars]: great flat white
- Corner Bakery [5/5 stars]: best croissant
- Station Kiosk [2/5 stars]: slow queue
- Harbour Grill [3/6 stars]: six-star scale`;

const CARD = `- Blue Door [4/5 stars]
- Bakery [5/5 stars]
- Kiosk [2/5 stars]`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Write [3/5 stars], or any [n/m stars]' });

  const stars = new Marked({
    extensions: [
      {
        name: 'rating',
        level: 'inline',
        start: (src) => src.indexOf('['),
        tokenizer(src) {
          const match = /^\[(\d)\/(\d{1,2}) stars?\]/.exec(src);
          if (!match || Number(match[1]) > Number(match[2])) return undefined;
          return { type: 'rating', raw: match[0], value: Number(match[1]), max: Number(match[2]) };
        },
        renderer(token) {
          const value = Number(token.value);
          const max = Number(token.max);
          return `<span class="stars" title="${value} out of ${max}"><span class="on">${'★'.repeat(value)}</span>${'☆'.repeat(max - value)}</span>`;
        },
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(stars, md),
    caption: 'The first number is how many stars are filled, the second how many there are in total.',
  });

  return () => stage.dispose();
};

export default mount;
