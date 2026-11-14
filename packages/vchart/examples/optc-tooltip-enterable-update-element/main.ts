// tooltip.enterable + updateElement: a clickable button added to the tooltip DOM
import type { Mount } from '@/types.ts';
import { createChart, readout } from '../../shared/chart.ts';
import { dimensionTour, groupedRows } from '../../shared/components-data.ts';

const CATS = ['Q1', 'Q2', 'Q3', 'Q4'];

const mount: Mount = (el, ctx) => {
  let clicks = 0;
  const log = ctx.preview ? null : readout(el);
  const show = (text: string): void => {
    if (log) log.textContent = text;
  };
  show('Hover a bar, then move into the tooltip and click its button.');
  const { vchart, release } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'd', values: groupedRows(CATS, ['North', 'South'], 6) }],
    xField: ['x', 'c'],
    yField: 'y',
    seriesField: 'c',
    tooltip: {
      enterable: true,
      showDelay: 150,
      transitionDuration: 150,
      // The callback may change the tooltip DOM's content but must not replace the node.
      updateElement: (tip: HTMLElement) => {
        if (tip.querySelector('[data-detail]')) return;
        const b = document.createElement('button');
        b.type = 'button';
        b.dataset.detail = '1';
        b.textContent = 'Details';
        b.style.cssText = 'margin-top:6px;padding:2px 8px;cursor:pointer';
        b.addEventListener('click', () => {
          clicks += 1;
          show(`Details clicked ${clicks} time${clicks === 1 ? '' : 's'}`);
        });
        tip.append(b);
      },
    },
  } as never);
  const stop = ctx.preview ? dimensionTour(vchart, CATS, 1200) : () => {};
  return () => {
    stop();
    release();
  };
};

export default mount;
