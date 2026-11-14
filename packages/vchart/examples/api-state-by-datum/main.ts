// setSelected / setHovered with full and partial data, then the clear methods
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { barSpec, rows } from '../../shared/api-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const spec = barSpec({
    legend: false,
    extra: {
      bar: {
        state: {
          selected: { stroke: '#f6bd16', lineWidth: 3 },
          hover: { stroke: '#fff', lineWidth: 2 },
          selected_reverse: { fillOpacity: 0.3 },
        },
      },
      interaction: { select: { enable: true }, hover: { enable: true } },
    },
  });
  const { vchart, release } = createChart(el, ctx, spec);
  const out = bar ? readout(el) : null;
  const all = rows(1);
  const first = all[0];
  if (!first) throw new Error('no data');
  let alive = true;
  const say = (text: string): void => {
    if (out) out.textContent = text;
  };

  const actions: [string, () => void][] = [
    ['setSelected: one datum', () => { vchart.setSelected(first); say(`setSelected(${JSON.stringify(first)})`); }],
    ['setSelected: a series { c }', () => { vchart.setSelected({ c: first.c }); say(`setSelected({ c: '${first.c}' }): every bar of that series`); }],
    ['setSelected: a category { x }', () => { vchart.setSelected({ x: 'Q2' }); say("setSelected({ x: 'Q2' }): every bar in that category"); }],
    ['setHovered: a series', () => { vchart.setHovered({ c: 'South' }); say("setHovered({ c: 'South' })"); }],
    ['clearSelected', () => { vchart.clearSelected(); say('clearSelected()'); }],
    ['clearHovered', () => { vchart.clearHovered(); say('clearHovered()'); }],
    ['clearAllStates', () => { vchart.clearAllStates(); say('clearAllStates()'); }],
  ];
  if (bar) {
    for (const [label, fn] of actions) button(bar, label, fn);
    return () => {
      alive = false;
      release();
    };
  }
  const script = [
    () => vchart.setSelected({ c: 'North' }),
    () => vchart.setHovered({ x: 'Q3' }),
    () => vchart.setSelected({ x: 'Q4' }),
    () => { vchart.clearSelected(); vchart.clearHovered(); },
  ];
  let i = 0;
  const stop = every(1200, () => {
    if (alive) (script[i++ % script.length] as () => void)();
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
