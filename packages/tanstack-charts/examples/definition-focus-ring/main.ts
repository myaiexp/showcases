// focusRing: the ring drawn around the focused point, set on the definition
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the line to see the ring.' });
  let on = true;
  let radius = 9;
  let strokeWidth = 3;

  const build = () =>
    defineChart({
      marks: [lineY(signups, { x: 'month', y: 'value', stroke: '#60a5fa', points: true })],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      focusRing: on ? { radius, strokeWidth, stroke: '#facc15', fill: 'none' } : false,
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Signups with a focus ring' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    checkbox(stage.bar, 'focus ring', on, (v) => { on = v; refresh(); });
    slider(stage.bar, 'radius', 4, 16, 1, radius, (v) => { radius = v; refresh(); });
    slider(stage.bar, 'stroke width', 1, 6, 1, strokeWidth, (v) => { strokeWidth = v; refresh(); });
  } else stage.ghost();
  return () => stage.dispose();
};

export default mount;
