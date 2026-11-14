// convertDatumToPosition: an HTML badge pinned to the maximum datum, re-pinned on every layout
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const CATS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const values = (seed: number): { day: string; value: number }[] => {
  const r = rng(seed);
  return CATS.map((day) => ({ day, value: Math.round(20 + r() * 70) }));
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = document.createElement('div');
  stage.style.cssText = 'position:relative;width:100%';
  el.append(stage);
  const data = { current: values(1) };
  const { vchart, release } = createChart(
    el,
    ctx,
    {
      type: 'bar',
      data: [{ id: 'd', values: data.current }],
      xField: 'day',
      yField: 'value',
      axes: [{ orient: 'left', max: 120, min: 0 }, { orient: 'bottom', type: 'band' }],
    } as never,
    { parent: stage },
  );
  const badge = document.createElement('div');
  badge.style.cssText =
    'position:absolute;transform:translate(-50%,-100%);padding:2px 8px;border-radius:10px;background:#f6bd16;color:#111;font-size:12px;white-space:nowrap;pointer-events:none;transition:left .3s,top .3s';
  stage.append(badge);

  let alive = true;
  const pin = (): void => {
    if (!alive) return;
    const top = data.current.reduce((a, b) => (b.value > a.value ? b : a));
    // The third argument asks for canvas coordinates, which is what an overlay inside the stage needs.
    const p = vchart.convertDatumToPosition(top, { seriesIndex: 0 }, true);
    if (!p) {
      badge.style.display = 'none';
      return;
    }
    badge.style.display = 'block';
    badge.textContent = ctx.preview ? `${top.value}` : `peak: ${top.day} ${top.value}`;
    badge.style.left = `${p.x}px`;
    badge.style.top = `${p.y - 4}px`;
  };
  // layoutEnd fires after every layout (data changes and resizes included): positions are valid then.
  vchart.on('layoutEnd', pin);
  const pinTimer = window.setTimeout(pin, 300);

  let seed = 1;
  const change = (): void => {
    if (!alive) return;
    data.current = values(++seed);
    void vchart.updateData('d', data.current);
  };
  if (bar) button(bar, 'New data', change);
  const stop = bar ? () => {} : every(2200, change);
  return () => {
    alive = false;
    window.clearTimeout(pinTimer);
    stop();
    release();
    stage.remove();
  };
};

export default mount;
