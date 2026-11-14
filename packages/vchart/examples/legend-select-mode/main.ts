// Legend selectMode (multiple, single, focus) and allowAllCanceled, with the selection read back
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every, readout } from '../../shared/chart.ts';
import { groupedRows, GROUPS, pick } from '../../shared/components-data.ts';

const MODES = ['multiple', 'single', 'focus'] as const;

const build = (mode: string, allowAllCanceled: boolean): ISpec => ({
  type: 'line',
  data: [{ id: 'trend', values: groupedRows(['Jan', 'Feb', 'Mar', 'Apr', 'May'], GROUPS, 21) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  legends: { visible: true, orient: 'top', selectMode: mode as (typeof MODES)[number], allowAllCanceled },
});

const mount: Mount = (el, ctx) => {
  let mode = 'multiple';
  let allowAllCanceled = false;
  const { vchart, release } = createChart(el, ctx, build(mode, allowAllCanceled));
  let released = false;
  let out: HTMLPreElement | undefined;
  const show = (): void => {
    if (out) out.textContent = `selected legend items: ${JSON.stringify(vchart.getLegendSelectedDataByIndex(0))}`;
  };
  const apply = (): void => {
    if (released) return;
    void vchart.updateSpec(build(mode, allowAllCanceled)).then(() => !released && show());
  };

  let stop = (): void => {};
  if (ctx.preview) {
    // Rotate which series is the only one selected, as a single-select legend would.
    let i = 0;
    stop = every(1500, () => {
      i += 1;
      vchart.setLegendSelectedDataByIndex(0, i % 5 === 4 ? [...GROUPS] : [pick(GROUPS, i)]);
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'selectMode', MODES, (v) => ((mode = v), apply()));
    select(bar, 'allowAllCanceled', ['false', 'true'], (v) => ((allowAllCanceled = v === 'true'), apply()));
    el.prepend(bar);
    out = readout(el);
    vchart.on('legendItemClick', () => {
      setTimeout(() => {
        if (!released) show();
      }, 0);
    });
    show();
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
