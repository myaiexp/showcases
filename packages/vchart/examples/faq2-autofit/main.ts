// FAQ: autoFit follows the container; a size in the spec or autoFit false freezes the chart
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, type Chart } from '../../shared/chart.ts';

const SETUPS = ['default (autoFit)', 'width + height in spec', 'autoFit: false'] as const;
type Setup = (typeof SETUPS)[number];

const mount: Mount = (el, ctx) => {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'width:100%;transition:width .6s';
  el.append(wrap);
  let setup: Setup = 'default (autoFit)';
  const make = (): Chart => {
    const spec = {
      type: 'bar',
      data: [{ id: 'd', values: ['A', 'B', 'C', 'D', 'E'].map((x, i) => ({ x, y: [12, 30, 22, 41, 18][i] })) }],
      xField: 'x',
      yField: 'y',
      ...(setup === 'width + height in spec' ? { width: 360, height: ctx.preview ? 180 : 300 } : {}),
      ...(setup === 'autoFit: false' ? { autoFit: false } : {}),
    } as ISpec;
    return createChart(el, ctx, spec, { parent: wrap, previewHeight: 180, height: 300 });
  };
  let chart = make();
  const rebuild = (): void => {
    chart.release();
    chart = make();
  };
  let narrow = false;
  const toggle = (): void => {
    narrow = !narrow;
    wrap.style.width = narrow ? '55%' : '100%';
  };
  let stop: () => void;
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => {
      i++;
      if (i % 6 === 0) {
        setup = SETUPS[(SETUPS.indexOf(setup) + 1) % SETUPS.length] as Setup;
        rebuild();
      }
      toggle();
    });
  } else {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'setup', SETUPS, (v) => {
      setup = v as Setup;
      rebuild();
    });
    stop = every(2200, toggle);
  }
  return () => {
    stop();
    chart.release();
    wrap.remove();
  };
};

export default mount;
