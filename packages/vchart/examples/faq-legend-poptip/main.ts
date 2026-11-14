// FAQ: the poptip that shows the full text of an omitted legend label, and how to turn it off
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick } from '../../shared/components-data.ts';

const values = [
  { category: 'Very long category name number one', value: 10 },
  { category: 'Another quite long category name', value: 9 },
  { category: 'Third category with a long label', value: 6 },
  { category: 'Short', value: 5 },
  { category: 'Fifth lengthy legend label here', value: 4 },
];

const spec: ISpec = {
  type: 'pie',
  data: [{ id: 'd', values }],
  categoryField: 'category',
  valueField: 'value',
  legends: {
    visible: true,
    orient: 'right',
    // The legend is narrow, so labels are cut with an ellipsis; hovering one shows a poptip with the whole text.
    item: { width: 130 },
  },
};

const mount: Mount = (el, ctx) => {
  let chart = createChart(el, ctx, spec);
  // poptip is a constructor option (VChart api: IInitOption), so switching it needs a new instance.
  const rebuild = (poptip: boolean): void => {
    chart.release();
    chart = createChart(el, ctx, spec, { init: { poptip } });
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    const note = document.createElement('span');
    note.textContent = 'Hover a cut-off legend label.';
    bar.append(note);
    select(bar, 'poptip', ['on (default)', 'off'], (v) => rebuild(v.startsWith('on')));
  }
  // The preview has no pointer: it swaps the data so the truncated labels are not static.
  let i = 0;
  const stop = every(1600, () => {
    i += 1;
    void chart.vchart.updateData('d', values.map((d, k) => ({ ...d, value: 3 + ((i + k * 3) % 9) })));
  });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
