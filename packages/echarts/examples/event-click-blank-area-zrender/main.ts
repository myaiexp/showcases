// A bar chart where a bar click picks a bar and a click on blank space (found with getZr) clears the pick
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const items = ['Shirt', 'Sweater', 'Chiffon', 'Pants', 'Heels', 'Socks'];
const values = [5, 20, 36, 10, 10, 20];

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx, { height: 340, previewHeight: 176 });
  const log = document.createElement('div');
  log.style.cssText = 'font:12px/1.6 monospace;opacity:.9;padding-top:6px;min-height:20px';
  el.append(log);

  let picked: number | null = null;
  const render = (): void => {
    chart.setOption({
      animationDurationUpdate: 250,
      grid: { top: 24, left: 40, right: 16, bottom: 28 },
      xAxis: { type: 'category', data: items },
      yAxis: {},
      series: [
        {
          type: 'bar',
          // The picked bar keeps full opacity; the others fade while something is picked.
          data: values.map((v, i) => ({ value: v, itemStyle: { opacity: picked === null || picked === i ? 1 : 0.3 } })),
        },
      ],
    });
    log.textContent = picked === null ? 'nothing picked' : `picked: ${items[picked]}`;
  };
  render();

  // The ECharts 'click' event only fires when the pointer is on an element (a bar here).
  chart.on('click', (p) => {
    picked = p.dataIndex;
    render();
    log.textContent += ' (echarts click on a bar)';
  });

  // The zrender event fires anywhere. `event.target` is the graphic element under the
  // pointer, so no target means the pointer is on blank space.
  const zr = chart.getZr();
  const onZrClick = (e: { target?: unknown; offsetX: number; offsetY: number }): void => {
    if (e.target) return;
    // containPixel tells blank space inside the plot area from the margin around it.
    const inGrid = chart.containPixel('grid', [e.offsetX, e.offsetY]);
    picked = null;
    render();
    log.textContent += inGrid ? ' (zrender click: blank inside the grid)' : ' (zrender click: outside the grid)';
  };
  zr.on('click', onZrClick);

  let stop = (): void => {};
  if (ctx.preview) {
    // No pointer in a card: pick bars one by one and clear, the way the clicks would.
    let i = 0;
    stop = every(900, () => {
      i++;
      picked = i % 7 === 6 ? null : i % 7;
      render();
    });
  }
  return () => {
    stop();
    zr.off('click', onZrClick);
    dispose();
    log.remove();
  };
};

export default mount;
