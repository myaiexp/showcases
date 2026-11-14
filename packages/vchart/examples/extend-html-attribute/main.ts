// customMark style.html (needs enableHtmlAttribute): an HTML banner in a layout slot above the plot
import type { Mount } from '@/types.ts';
import { weekdayRows } from '../../shared/anim-data.ts';
import { createChart, every } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  const rows = (seed: number) => weekdayRows(seed);
  const summary = (data: { sales: number }[]) => [{ total: data.reduce((s, d) => s + d.sales, 0), best: Math.max(...data.map((d) => d.sales)) }];
  let data = rows(1);
  const bannerHeight = ctx.preview ? 32 : 48;
  const { vchart, release } = createChart(
    el,
    ctx,
    {
      type: 'bar',
      data: [
        { id: 'sales', values: data },
        { id: 'kpi', values: summary(data) },
      ],
      xField: 'day',
      yField: 'sales',
      legends: { visible: false },
      customMark: [
        {
          type: 'rect',
          dataId: 'kpi',
          layoutType: 'region-relative',
          orient: 'top',
          height: bannerHeight,
          zIndex: 10001,
          style: {
            fill: '#1b2230',
            cornerRadius: 6,
            x: (_d: unknown, c: { getLayoutBounds(): { x1: number } }) => c.getLayoutBounds().x1,
            y: (_d: unknown, c: { getLayoutBounds(): { y1: number } }) => c.getLayoutBounds().y1,
            width: (_d: unknown, c: { getLayoutBounds(): { width(): number } }) => c.getLayoutBounds().width(),
            height: (_d: unknown, c: { getLayoutBounds(): { height(): number } }) => c.getLayoutBounds().height(),
            html: (d: { total: number; best: number }, c: { getLayoutBounds(): { width(): number } }) => ({
              id: 'kpi-banner',
              style: { width: `${c.getLayoutBounds().width()}px` },
              dom: `<div style="display:flex;align-items:center;justify-content:space-between;height:${bannerHeight}px;padding:0 14px;box-sizing:border-box;font-family:sans-serif;color:#e8ecf4">
                <b style="font-size:${ctx.preview ? 13 : 16}px">Weekly sales</b>
                <span><span style="color:#8aa4ff">total</span> <b>${d.total}</b>${ctx.preview ? '' : ` &nbsp; <span style="color:#ffd93d">best day</span> <b>${d.best}</b>`}</span>
              </div>`,
            }),
          },
        },
      ],
    } as never,
    { init: { enableHtmlAttribute: true } },
  );
  let i = 1;
  let alive = true;
  const stop = every(2400, () => {
    if (!alive) return;
    data = rows(++i);
    void vchart.updateData('sales', data);
    void vchart.updateData('kpi', summary(data));
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
