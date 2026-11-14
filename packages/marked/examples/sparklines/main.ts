// An inline extension draws [spark 3 5 4 8] as a tiny inline SVG line chart
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Last 7 days:
- Steps [spark 4200 6100 3900 8000 7200 9100 5000]
- Coffees [spark 3 2 4 1 2 5 2]
- Sleep hours [spark 8 7 6 6 7 9 9]
- Rainfall [spark 0 0 5 12 8 1 0]`;

const CARD = `- Steps [spark 4 6 3 8 7 9 5]
- Coffee [spark 3 2 4 1 2 5 2]
- Rain [spark 0 0 5 12 8 1 0]`;

const W = 80;
const H = 16;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Put at least two numbers after [spark' });

  const charts = new Marked({
    extensions: [
      {
        name: 'spark',
        level: 'inline',
        start: (src) => src.indexOf('[spark'),
        tokenizer(src) {
          const match = /^\[spark((?: -?\d+(?:\.\d+)?){2,})\]/.exec(src);
          if (!match) return undefined;
          return { type: 'spark', raw: match[0], values: match[1]!.trim().split(' ').map(Number) };
        },
        renderer(token) {
          const values = token.values as number[];
          const lo = Math.min(...values);
          const span = Math.max(...values) - lo || 1;
          const pts = values.map((v, i) => [2 + (i / (values.length - 1)) * (W - 4), H - 2 - ((v - lo) / span) * (H - 4)] as const);
          const last = pts[pts.length - 1]!;
          return (
            `<svg class="spark" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
            `<polyline points="${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}" fill="none" stroke="currentColor" stroke-width="1.5"/>` +
            `<circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="2.2" class="end"/></svg>`
          );
        },
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(charts, md),
    caption: 'A list of numbers inside [spark ...] is drawn as a tiny line chart in the middle of the sentence. The dot marks the latest value.',
  });

  return () => stage.dispose();
};

export default mount;
