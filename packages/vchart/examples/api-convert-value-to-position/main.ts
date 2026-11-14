// convertValueToPosition: an HTML threshold line at a value that is not part of the chart's data
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, slider } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const CATS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const r = rng(4);
const DATA = CATS.map((day) => ({ day, value: Math.round(20 + r() * 70) }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = document.createElement('div');
  stage.style.cssText = 'position:relative;width:100%';
  el.append(stage);
  const { vchart, release } = createChart(
    el,
    ctx,
    {
      type: 'bar',
      data: [{ id: 'd', values: DATA }],
      xField: 'day',
      yField: 'value',
      axes: [{ orient: 'left', min: 0, max: 100 }, { orient: 'bottom', type: 'band' }],
    } as never,
    { parent: stage },
  );
  const line = document.createElement('div');
  line.style.cssText = 'position:absolute;height:0;border-top:2px dashed #e8684a;pointer-events:none;left:0;width:100%';
  const tag = document.createElement('span');
  tag.style.cssText = 'position:absolute;right:8px;top:-20px;font-size:12px;color:#e8684a';
  line.append(tag);
  stage.append(line);
  const out = bar ? readout(el) : null;

  let alive = true;
  const place = (value: number): void => {
    if (!alive) return;
    // A single value plus an axis query returns one coordinate (axisIndex 0 is the first axis in the spec: left).
    const y = vchart.convertValueToPosition(value, { axisIndex: 0 }, true);
    if (typeof y !== 'number') return;
    line.style.top = `${y}px`;
    tag.textContent = `threshold ${value}`;
    if (out) out.textContent = `convertValueToPosition(${value}, { axisIndex: 0 }, true) -> ${y.toFixed(1)}px`;
  };
  window.setTimeout(() => place(60), 300);
  if (bar) {
    slider(bar, 'threshold', [0, 100, 1], 60, place);
    return () => {
      alive = false;
      release();
      stage.remove();
    };
  }
  let t = 0;
  const stop = every(120, () => {
    t += 0.1;
    place(Math.round(55 + Math.sin(t) * 30));
  });
  return () => {
    alive = false;
    stop();
    release();
    stage.remove();
  };
};

export default mount;
