// Scene coordinates: an HTML overlay aligned to scene.chart, and a pointer converted to plot coordinates
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dashed frame is an HTML element sized from scene.chart. Move the pointer over the plot.' });

  const definition = defineChart({
    focus: false,
    marks: [lineY(signups, { x: 'month', y: 'value', stroke: '#60a5fa', points: true })],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2), axis: { label: 'Month' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Signups' } },
    },
  });

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:absolute;pointer-events:none;border:1px dashed #facc15;box-sizing:border-box';
  stage.box.append(overlay);
  stage.onDispose(() => overlay.remove());

  const host = stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      ariaLabel: 'Signups with an aligned overlay',
      onRender: ({ scene }) => {
        const c = scene.chart;
        Object.assign(overlay.style, { left: `${c.x}px`, top: `${c.y}px`, width: `${c.width}px`, height: `${c.height}px` });
      },
    }),
  );
  const move = (event: PointerEvent): void => {
    const svg = stage.box.querySelector('svg');
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const c = host.getScene().chart;
    const x = event.clientX - r.left - c.x;
    const y = event.clientY - r.top - c.y;
    const inside = x >= 0 && y >= 0 && x <= c.width && y <= c.height;
    stage.say(inside ? `plot coordinates (${Math.round(x)}, ${Math.round(y)}) of ${Math.round(c.width)} x ${Math.round(c.height)}` : 'outside the plot rectangle');
  };
  stage.box.addEventListener('pointermove', move);
  stage.onDispose(() => stage.box.removeEventListener('pointermove', move));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
