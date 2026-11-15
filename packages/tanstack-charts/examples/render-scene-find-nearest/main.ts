// findNearestPoint(scene, x, y, maxDistance, points): hit testing without mounting a chart
import { createChartScene, defineChart, dot, findNearestPoint, renderChartSvg } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { cloud } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cloud(160, 52).map((p, i) => ({ ...p, series: i % 2 ? 'B' : 'A' }));
const SVGNS = 'http://www.w3.org/2000/svg';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the chart. The dashed circle is maxDistance; the ring marks the answer.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  const state = { max: 40, only: 'all' as 'all' | 'A' | 'B' };

  const scene = createChartScene(
    defineChart({
      marks: [dot(rows, { x: 'x', y: 'y', key: 'id', color: 'series', r: 4 })],
      scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
    }),
    { width: 560, height: stage.height },
  );
  stage.box.innerHTML = renderChartSvg(scene, { ariaLabel: 'Two series of dots', idPrefix: stage.id('fn') });
  const svg = stage.box.querySelector('svg')!;
  const reach = document.createElementNS(SVGNS, 'circle');
  const ring = document.createElementNS(SVGNS, 'circle');
  reach.setAttribute('fill', 'none');
  reach.setAttribute('stroke', 'currentColor');
  reach.setAttribute('stroke-dasharray', '4 3');
  ring.setAttribute('fill', 'none');
  ring.setAttribute('stroke', '#facc15');
  ring.setAttribute('stroke-width', '3');
  svg.append(reach, ring);

  const probe = (x: number, y: number): void => {
    // Passing a candidate list restricts the search to exactly those point objects.
    const candidates = state.only === 'all' ? undefined : scene.points.filter((p) => p.datum.series === state.only);
    const p = findNearestPoint(scene, x, y, state.max, candidates);
    reach.setAttribute('cx', String(x));
    reach.setAttribute('cy', String(y));
    reach.setAttribute('r', String(state.max));
    ring.setAttribute('r', p ? '9' : '0');
    if (p) {
      ring.setAttribute('cx', String(p.x));
      ring.setAttribute('cy', String(p.y));
    }
    const text = p ? `nearest: ${p.datum.id}, series ${p.datum.series}, ${Math.hypot(p.x - x, p.y - y).toFixed(1)} px away` : `no point within ${state.max} px`;
    if (readout) readout.textContent = text;
    else stage.say(text);
  };
  if (readout) readout.textContent = 'move the pointer over the chart';
  svg.addEventListener(
    'pointermove',
    (e) => {
      const r = svg.getBoundingClientRect();
      probe(((e.clientX - r.left) * scene.width) / r.width, ((e.clientY - r.top) * scene.height) / r.height);
    },
    { signal: stage.signal },
  );
  if (stage.bar) {
    slider(stage.bar, 'maxDistance', 5, 120, 5, state.max, (v) => { state.max = v; }, (v) => `${v}px`);
    select(stage.bar, 'candidates', [['all', 'every point'], ['A', 'series A only'], ['B', 'series B only']] as const, (v) => { state.only = v; });
  } else {
    // Cards have no pointer: walk the probe along a path instead.
    const t0 = performance.now();
    stage.every(80, () => {
      const t = ((performance.now() - t0) % 6000) / 6000;
      probe(scene.width * (0.15 + 0.7 * t), scene.height * (0.5 + 0.25 * Math.sin(t * 12)));
    });
  }
  return () => stage.dispose();
};

export default mount;
