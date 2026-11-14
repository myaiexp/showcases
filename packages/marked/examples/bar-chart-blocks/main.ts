// A block extension turns :::chart "label: number" lines into bars
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { liveDemo } from '../../shared/demo.ts';
import { esc, render } from '../../shared/renderer-kit.ts';
import './style.css';

const SAMPLE = `Cups of coffee in the office this week:

:::chart Coffee per day
Mon: 14
Tue: 22
Wed: 18
Thu: 31
Fri: 9
:::

Thursday was the big meeting.`;

const CARD = `:::chart Coffee
Mon: 14
Tue: 22
Wed: 18
Thu: 31
:::`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change a number and the bars rescale' });

  const charts = new Marked({
    extensions: [
      {
        name: 'chart',
        level: 'block',
        start: (src) => src.indexOf(':::chart'),
        tokenizer(src) {
          const match = /^:::chart[ \t]*([^\n]*)\n([\s\S]*?)\n:::[ \t]*(?:\n|$)/.exec(src);
          if (!match) return undefined;
          const rows = match[2]!
            .split('\n')
            .map((line) => /^(.+?):\s*(-?\d+(?:\.\d+)?)\s*$/.exec(line))
            .filter((m): m is RegExpExecArray => m !== null)
            .map((m) => ({ label: m[1]!, value: Number(m[2]) }));
          return { type: 'chart', raw: match[0], title: match[1]!.trim(), rows };
        },
        renderer(token) {
          const rows = token.rows as { label: string; value: number }[];
          const max = Math.max(1, ...rows.map((r) => r.value));
          const bars = rows
            .map(
              (r) =>
                `<div class="row"><span class="lbl">${esc(r.label)}</span><span class="track"><span class="bar" style="width:${Math.max(0, (r.value / max) * 100).toFixed(1)}%"></span></span><span class="val">${r.value}</span></div>`,
            )
            .join('');
          const title = token.title ? `<div class="title">${esc(String(token.title))}</div>` : '';
          return `<figure class="chart">${title}${bars}</figure>\n`;
        },
      },
    ],
  });

  liveDemo(stage, {
    samples: [{ text: stage.preview ? CARD : SAMPLE }],
    render: (md) => render(charts, md),
    caption: 'Each "label: number" line becomes a bar, scaled so the biggest number fills the track. The block keeps its title above the bars.',
  });

  return () => stage.dispose();
};

export default mount;
