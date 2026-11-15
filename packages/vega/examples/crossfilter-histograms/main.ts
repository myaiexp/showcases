// Three histograms cross-filter each other: drag across any chart to brush a range, click to clear
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { flights } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

// One field per chart: its data range, the bin width, and the chart's left edge in the data rectangle.
const W = 200;
const H = 110;
const CHARTS = [
  { field: 'delay', lo: -60, hi: 180, step: 10, x0: 0, label: 'delay (min)', color: 'steelblue' },
  { field: 'time', lo: 0, hi: 24, step: 1, x0: 260, label: 'time (hour)', color: '#e8a33d' },
  { field: 'distance', lo: 0, hi: 2400, step: 100, x0: 520, label: 'distance (mi)', color: '#7fc97f' },
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 720,
    height: H,
    padding: { top: 30, left: 10, right: 10, bottom: 40 },
    autosize: 'none',
    signals: CHARTS.flatMap((c, k) => {
      const inside = `x() >= ${c.x0} && x() <= ${c.x0 + W} && y() >= 0 && y() <= ${H}`;
      return [
        // Brush in pixels within the chart: anchor on press, then the range follows the pointer.
        { name: `anchor${k}`, value: 0, on: [{ events: `mousedown[${inside}]`, update: `x() - ${c.x0}`, force: true }] },
        {
          name: `brush${k}`,
          value: [0, 0],
          on: [
            { events: { signal: `anchor${k}` }, update: `[anchor${k}, anchor${k}]`, force: true },
            {
              events: `[mousedown[${inside}], window:mouseup] > window:mousemove`,
              update: `[min(anchor${k}, clamp(x() - ${c.x0}, 0, ${W})), max(anchor${k}, clamp(x() - ${c.x0}, 0, ${W}))]`,
            },
          ],
        },
        // A brush under 3px wide counts as cleared: the query then spans the whole field.
        {
          name: `${c.field}Range`,
          update: `brush${k}[1] - brush${k}[0] < 3 ? [${c.lo - 1}, ${c.hi + 1}] : [${c.lo} + brush${k}[0] / ${W} * ${c.hi - c.lo}, ${c.lo} + brush${k}[1] / ${W} * ${c.hi - c.lo}]`,
        },
      ];
    }),
    data: [
      {
        // The binned rows, before any filtering: the grey histograms read these.
        name: 'raw',
        values: flights(11, 4000),
        transform: CHARTS.map((c) => ({ type: 'bin' as const, field: c.field, extent: [c.lo, c.hi], step: c.step, as: [`${c.field}0`, `${c.field}1`] })),
      },
      {
        name: 'flights',
        source: 'raw',
        transform: [
          {
            type: 'crossfilter',
            signal: 'xfilter',
            fields: CHARTS.map((c) => c.field),
            query: CHARTS.map((c) => ({ signal: `${c.field}Range` })),
          },
        ],
      },
      { name: 'passing', source: 'flights', transform: [{ type: 'resolvefilter', filter: { signal: 'xfilter' }, ignore: 0 }, { type: 'aggregate', ops: ['count'], as: ['n'] }] },
      ...CHARTS.flatMap((c, k) => {
        const count = { type: 'aggregate' as const, groupby: [`${c.field}0`, `${c.field}1`], ops: ['count' as const], as: ['n'] };
        return [
          // Grey: every flight. Colour: flights that pass the OTHER two charts' queries (ignore this chart's own bit).
          // A set derived from the crossfilter must start with resolvefilter and continue with aggregate.
          { name: `all${k}`, source: 'raw', transform: [count] },
          { name: `hist${k}`, source: 'flights', transform: [{ type: 'resolvefilter' as const, filter: { signal: 'xfilter' }, ignore: 1 << k }, count] },
        ];
      }),
    ],
    marks: [
      {
        type: 'text',
        from: { data: 'passing' },
        encode: { update: { x: { value: 0 }, y: { value: -14 }, fill: { value: '#ddd' }, text: { signal: "datum.n + ' of 4000 flights pass all three brushes'" } } },
      },
      ...CHARTS.map((c, k) => ({
        type: 'group' as const,
        name: `chart${k}`,
        encode: { enter: { x: { value: c.x0 }, y: { value: 0 }, width: { value: W }, height: { value: H } } },
        scales: [
          { name: 'x', type: 'linear' as const, domain: [c.lo, c.hi], range: [0, W] },
          { name: 'y', type: 'linear' as const, domain: { data: `all${k}`, field: 'n' }, range: [H, 0], nice: true },
        ],
        axes: [
          { orient: 'bottom' as const, scale: 'x', title: c.label, tickCount: 6 },
        ],
        marks: [
          {
            type: 'rect' as const,
            from: { data: `all${k}` },
            interactive: false,
            encode: { update: { x: { scale: 'x', field: `${c.field}0` }, x2: { scale: 'x', field: `${c.field}1`, offset: -1 }, y: { scale: 'y', field: 'n' }, y2: { scale: 'y', value: 0 }, fill: { value: '#555' } } },
          },
          {
            type: 'rect' as const,
            from: { data: `hist${k}` },
            interactive: false,
            encode: { update: { x: { scale: 'x', field: `${c.field}0` }, x2: { scale: 'x', field: `${c.field}1`, offset: -1 }, y: { scale: 'y', field: 'n' }, y2: { scale: 'y', value: 0 }, fill: { value: c.color } } },
          },
          {
            // The brush: a translucent band over the selected range.
            type: 'rect' as const,
            interactive: false,
            encode: {
              update: {
                x: { signal: `brush${k}[0]` },
                x2: { signal: `brush${k}[1]` },
                y: { value: 0 },
                y2: { value: H },
                fill: { value: '#fff' },
                fillOpacity: { value: 0.18 },
                stroke: { value: '#ddd' },
              },
            },
          },
        ],
      })),
    ],
  };

  const view = await stage.render(spec);

  // Cards: the pretend pointer brushes one chart after another, then clicks to clear.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const plan: [number, number, number][] = [[0, 70, 150], [1, 80, 130], [2, 10, 90], [0, 20, 100]];
    stage.every(2200, async (i) => {
      if (i % 5 === 0) {
        const c = CHARTS[0]?.x0 ?? 0;
        ghost.click(c + 100, 50);
        return;
      }
      const [k, a, b] = plan[i % plan.length] ?? plan[0] ?? [0, 0, 0];
      const x0 = CHARTS[k]?.x0 ?? 0;
      await ghost.drag([x0 + a, 55], [x0 + b, 55], 900, 12);
    });
  }
  return () => stage.dispose();
};

export default mount;
