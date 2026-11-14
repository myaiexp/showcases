// Title placement: orient, align and verticalAlign
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { pick, walk } from '../../shared/components-data.ts';

const ORIENTS = ['top', 'bottom', 'left', 'right'] as const;
const ALIGNS = ['left', 'center', 'right'] as const;
const VALIGNS = ['top', 'middle', 'bottom'] as const;
type Orient = (typeof ORIENTS)[number];
type Align = (typeof ALIGNS)[number];
type VAlign = (typeof VALIGNS)[number];

const data = walk(12, 33);

const build = (orient: Orient, align: Align, verticalAlign: VAlign): ISpec => ({
  type: 'area',
  data: [{ id: 'area', values: data }],
  xField: 'x',
  yField: 'y',
  line: { style: { stroke: '#38bdf8' } },
  area: { style: { fill: '#38bdf8', fillOpacity: 0.25 } },
  axes: [{ orient: 'left' }, { orient: 'bottom', label: { autoHide: true } }],
  title: {
    visible: true,
    text: 'Daily readings',
    subtext: 'orient / align / verticalAlign',
    orient,
    align,
    verticalAlign,
    textStyle: { fill: '#f8fafc', fontWeight: 'bold' },
    subtextStyle: { fill: '#94a3b8' },
  },
});

const mount: Mount = (el, ctx) => {
  let orient: Orient = 'top';
  let align: Align = 'left';
  let verticalAlign: VAlign = 'top';
  const { vchart, release } = createChart(el, ctx, build(orient, align, verticalAlign));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(orient, align, verticalAlign));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1500, () => {
      i += 1;
      orient = pick(['top', 'top', 'bottom', 'top'] as const, i);
      align = pick(ALIGNS, i);
      verticalAlign = 'top';
      apply();
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'orient', ORIENTS, (v) => ((orient = v as Orient), apply()));
    select(bar, 'align', ALIGNS, (v) => ((align = v as Align), apply()));
    select(bar, 'verticalAlign', VALIGNS, (v) => ((verticalAlign = v as VAlign), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
