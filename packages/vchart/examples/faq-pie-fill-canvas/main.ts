// FAQ: a pie that fills a narrow canvas with padding 0 and outerRadius 1
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { pick } from '../../shared/components-data.ts';

const values = [
  { type: 'Oxygen', value: 46.6 },
  { type: 'Silicon', value: 27.7 },
  { type: 'Aluminium', value: 8.1 },
  { type: 'Iron', value: 5 },
  { type: 'Calcium', value: 3.6 },
];

const build = (pad: number | undefined, radius: number, label: string): ISpec => ({
  type: 'pie',
  data: [{ id: 'd', values }],
  categoryField: 'type',
  valueField: 'value',
  // A number applies to all four sides; leaving it out keeps VChart's default margin.
  ...(pad === undefined ? {} : { padding: pad }),
  // outerRadius is a share of the largest circle that fits: 1 touches the plot edge.
  outerRadius: radius,
  legends: { visible: false },
  label: { visible: label !== 'none', position: label === 'inside' ? 'inside' : 'outside', style: { fontSize: 11 } },
});

const mount: Mount = (el, ctx) => {
  // A deliberately narrow box, like the page in the question.
  const box = document.createElement('div');
  box.style.cssText = 'width:min(100%,260px);border:1px dashed #64748b';
  el.append(box);
  let pad: number | undefined = undefined;
  let radius = 0.6;
  let label = 'inside';
  const { vchart, release } = createChart(el, ctx, build(pad, radius, label), { parent: box, height: 300, previewHeight: 190 });
  let released = false;
  const apply = (): void => {
    // Dropping the padding key does not unset it on update, so send an explicit default-like value.
    if (!released) void vchart.updateSpec(build(pad ?? 30, radius, label));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'padding', ['default look (30)', '0'], (v) => ((pad = v === '0' ? 0 : 30), apply()));
    slider(bar, 'outerRadius', [0.4, 1, 0.05], radius, (v) => ((radius = v), apply()));
    select(bar, 'label', ['inside', 'outside', 'none'], (v) => ((label = v), apply()));
  }
  let i = 0;
  const stop = every(1600, () => {
    i += 1;
    if (ctx.preview) {
      pad = pick([30, 0], i);
      radius = pad === 0 ? 1 : 0.6;
      apply();
    }
  });
  return () => {
    stop();
    released = true;
    release();
    box.remove();
  };
};

export default mount;
