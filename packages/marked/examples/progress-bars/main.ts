// An inline extension turns [progress 70%] into a filled bar
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Moving-house progress:
- Packing boxes [progress 80%]
- Change of address [progress 100%]
- Painting the hall [progress 35%]
- Buy a sofa [progress 0%]`;

const CARD = `- Packing [progress 80%]
- Address [progress 100%]
- Painting [progress 35%]`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Write [progress 0%] to [progress 100%]' });

  const bars = new Marked({
    extensions: [
      {
        name: 'progress',
        level: 'inline',
        start: (src) => src.indexOf('[progress'),
        tokenizer(src) {
          const match = /^\[progress (\d{1,3})%\]/.exec(src);
          return match ? { type: 'progress', raw: match[0], pct: Math.min(100, Number(match[1])) } : undefined;
        },
        renderer(token) {
          const pct = Number(token.pct);
          return `<span class="progress${pct === 100 ? ' done' : ''}"><span class="fill" style="width:${pct}%"></span></span> <span class="pct">${pct}%</span>`;
        },
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(bars, md),
    caption: 'Each [progress N%] becomes a bar filled to N%. At 100% it turns green. Change a number to watch it fill.',
  });

  return () => stage.dispose();
};

export default mount;
