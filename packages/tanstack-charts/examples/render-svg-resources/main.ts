// SVG resources: gradients in defs, ids scoped by idPrefix, collisions when the prefix is shared
import { areaY, createChartScene, defineChart, lineY, renderChartSvg } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const make = (color: string) =>
  createChartScene(
    defineChart({
      marks: [areaY(revenue, { x: 'month', y: 'revenue', fill: 'url(#wash)' }), lineY(revenue, { x: 'month', y: 'revenue', stroke: color, strokeWidth: 2 })],
      scales: { x: { scale: () => scalePoint<string>().padding(0.1) }, y: { scale: scaleLinear, nice: true, grid: true } },
      gradients: [{ id: 'wash', y1: 1, y2: 0, stops: [{ offset: 0, color, opacity: 0.05 }, { offset: 1, color, opacity: 0.85 }] }],
    }),
    { width: 360, height: 220 },
  );
const sceneA = make('#60a5fa');
const sceneB = make('#fb923c');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Share the prefix and the second chart borrows the first gradient: the ids collide.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  const boxB = stage.addBox();

  const render = (shared: boolean): void => {
    const a = renderChartSvg(sceneA, { ariaLabel: 'Chart A', idPrefix: shared ? 'same' : 'a' });
    const b = renderChartSvg(sceneB, { ariaLabel: 'Chart B', idPrefix: shared ? 'same' : 'b' });
    stage.box.innerHTML = a;
    boxB.innerHTML = b;
    const ids = [...stage.root.querySelectorAll('[id]')].map((n) => n.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    const text = `prefix ${shared ? 'shared' : 'distinct'}\nids on the page: ${ids.join(', ')}\nduplicate ids: ${dupes.length ? dupes.join(', ') : 'none'}`;
    if (readout) readout.textContent = text;
    else stage.say(text.replaceAll('\n', '; '));
  };
  render(false);
  if (stage.bar) checkbox(stage.bar, 'share one idPrefix', false, render);
  else stage.cycle([false, true], 2400, render);
  return () => stage.dispose();
};

export default mount;
