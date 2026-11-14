// FAQ: follow the tooltip with your own marker: dimensionHover plus convertDatumToPosition
import type { Mount } from '@/types.ts';
import { createChart, every, readout } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const XS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mount: Mount = (el, ctx) => {
  const rand = seeded(14);
  const values = XS.map((x) => ({ x, y: Math.round(20 + rand() * 60) }));
  const out = ctx.preview ? null : readout(el);
  const { vchart, release, container } = createChart(el, ctx, {
    type: 'line',
    data: [{ id: 'd', values }],
    xField: 'x',
    yField: 'y',
    point: { visible: false },
  });
  container.style.position = 'relative';
  const ring = document.createElement('div');
  ring.style.cssText =
    'position:absolute;width:22px;height:22px;margin:-11px 0 0 -11px;border:2px solid #ffd666;border-radius:50%;pointer-events:none;display:none;transition:left .15s,top .15s';
  container.append(ring);
  let alive = true;
  const track = (x: string): void => {
    const datum = values.find((v) => v.x === x);
    if (!alive || !datum) return;
    // Canvas coordinates of the datum in series 0.
    const p = vchart.convertDatumToPosition(datum, { seriesIndex: 0 }, true);
    if (!p) return;
    ring.style.display = 'block';
    ring.style.left = `${p.x}px`;
    ring.style.top = `${p.y}px`;
    if (out) out.textContent = `dimensionHover: ${datum.x} = ${datum.y}  ->  canvas (${Math.round(p.x)}, ${Math.round(p.y)})`;
  };
  vchart.on('dimensionHover', (e) => {
    const d = (e as unknown as { dimensionInfo?: { value?: string }[] }).dimensionInfo?.[0];
    if (d?.value) track(d.value);
  });
  let i = 0;
  const stop = every(1000, () => {
    if (!ctx.preview) return;
    i++;
    track(XS[i % XS.length] as string);
  });
  setTimeout(() => track('Wed'), 400);
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
