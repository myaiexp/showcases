// ThemeRiver stream labels (position, size, formatter) and boundaryGap, which keeps the river off the edges of the view
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';

const topics = ['Climate', 'Energy', 'Health', 'Space', 'Sport', 'Tech'];
const WEEK = 7 * 86400000;
const start = Date.UTC(2026, 0, 5);

// [week, value, topic] rows: every topic has a value for every week, as themeRiver needs.
function build(phase: number): (string | number)[][] {
  const out: (string | number)[][] = [];
  for (let w = 0; w < 30; w++) {
    topics.forEach((t, k) => {
      const v = 5 + 4 * Math.sin((w + phase) / (3 + k * 0.7) + k * 1.3) + 2 * Math.cos((w + phase) / 2.2 - k);
      out.push([start + w * WEEK, Math.round(v * 10) / 10, t]);
    });
  }
  return out;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  let position = 'left';
  let gap = 10;
  let fontSize = 12;
  let upper = false;
  let phase = 0;

  const show = (): void => {
    chart.setOption({
      singleAxis: { type: 'time', top: 16, bottom: ctx.preview ? 28 : 40, left: 24, right: 24 },
      series: [
        {
          type: 'themeRiver',
          data: build(phase),
          // boundaryGap: free space above and below the river, as [top, bottom]; a number
          // is pixels, a string a percentage of the view's height.
          boundaryGap: [`${gap}%`, `${gap}%`],
          // label: the stream's name, drawn once per stream at its start (left) or end (right).
          label: {
            show: true,
            position: position as 'left' | 'right' | 'inside',
            fontSize,
            color: '#fff',
            formatter: (p: { name: string }) => (upper ? p.name.toUpperCase() : p.name),
          },
          emphasis: { focus: 'self' },
        },
      ],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // Cycle the label side and the gap while the rivers flow.
    const sides = ['left', 'inside', 'right'];
    let i = 0;
    stop = every(900, () => {
      i++;
      phase += 0.6;
      position = sides[Math.floor(i / 3) % sides.length]!;
      gap = [4, 14, 24][i % 3]!;
      show();
    });
  } else {
    select(bar!, 'label.position', ['left', 'right', 'inside'], (v) => {
      position = v;
      show();
    });
    slider(bar!, 'boundaryGap %', [0, 40, 2], gap, (v) => {
      gap = v;
      show();
    });
    slider(bar!, 'label.fontSize', [8, 22, 1], fontSize, (v) => {
      fontSize = v;
      show();
    });
    select(bar!, 'label.formatter', ['name', 'UPPERCASE name'], (v) => {
      upper = v !== 'name';
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
