// DOM elements against rows: one polyline paints every row; the scene also holds unpainted focus dots
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { rng, walk } from '../../shared/random.ts';
import { countNodes } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const all = walk(rng(66), 30000, 0, 1).map((v, i) => ({ id: `r${i}`, i, v }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Raise the row count: the painted DOM stays small while the scene and its points grow.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();

  const options = (n: number) => ({
    definition: defineChart({
      marks: [lineY(all.slice(0, n), { x: 'i', y: 'v', stroke: '#60a5fa', strokeWidth: 1 })],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
      pointer: false,
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'A long line',
  });
  const host = stage.own(mountChart(stage.box, options(2000)));
  const show = (n: number): void => {
    host.update(options(n));
    const scene = host.getScene();
    const kinds = countNodes(scene.nodes);
    const text = `${n} rows: interaction points ${scene.points.length}, polylines ${kinds.polyline ?? 0}, all scene nodes ${Object.values(kinds).reduce((s, c) => s + c, 0)}\nscene nodes by kind: ${Object.entries(kinds).map(([k, c]) => `${k} ${c}`).join(', ')}\nelements in the DOM: ${stage.box.querySelectorAll('*').length} (circles ${stage.box.querySelectorAll('circle').length}, paths ${stage.box.querySelectorAll('path').length})`;
    if (readout) readout.textContent = text;
    else stage.say(`${n} rows: ${scene.points.length} points, ${stage.box.querySelectorAll('*').length} DOM elements`);
  };
  show(2000);
  if (stage.bar) slider(stage.bar, 'rows', 100, 30000, 100, 2000, show);
  else stage.cycle([500, 5000, 30000], 2200, show);
  return () => stage.dispose();
};

export default mount;
