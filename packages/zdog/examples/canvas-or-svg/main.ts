// Canvas or SVG: the same dot globe on both renderers, with the cost of each frame
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage, type Stage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';

// dots spread evenly over a sphere, coloured from pole to pole
function globe(addTo: Zdog.Anchor, count: number): Zdog.Anchor {
  const group = new Zdog.Anchor({ addTo });
  const golden = Zdog.TAU * (1 - 1 / 1.618034);
  for (let i = 0; i < count; i++) {
    const y = 1 - (2 * (i + 0.5)) / count;
    const r = Math.sqrt(1 - y * y);
    const a = golden * i;
    new Zdog.Shape({
      addTo: group,
      translate: { x: Math.cos(a) * r * 90, y: y * 90, z: Math.sin(a) * r * 90 },
      stroke: Math.max(4, 14 - count / 120),
      color: `hsl(${Math.round(200 + y * 80)} 80% 62%)`,
    });
  }
  return group;
}

const mount: Mount = (el, ctx) => {
  // two columns: the canvas on the left, the svg on the right
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;width:100%;justify-content:center';
  el.append(row);
  const column = (): HTMLDivElement => {
    const c = document.createElement('div');
    c.style.cssText = 'flex:1;min-width:0;display:flex;flex-direction:column;align-items:center';
    row.append(c);
    return c;
  };
  const left = column();
  const right = column();
  const stages: [Stage<HTMLCanvasElement>, Stage<SVGSVGElement>] = [
    createStage(left, ctx, { aspect: 1, fit: 220 }),
    createStage(right, ctx, { kind: 'svg', aspect: 1, fit: 220 }),
  ];

  const illos = stages.map(
    (stage) => new Zdog.Illustration({ element: stage.element, zoom: stage.zoom, rotate: { x: -0.3 } }),
  );
  let count = stages[0].preview ? 160 : 400;
  let globes = illos.map((illo) => globe(illo, count));
  const cost = [0, 0]; // smoothed ms per frame
  const lines = stages.map((s) => (s.bar ? readout(s.bar) : null));

  const bar = stages[0].bar;
  if (bar) {
    slider(bar, 'dots', 50, 2000, 50, count, (v) => {
      count = v;
      globes.forEach((g) => g.remove());
      globes = illos.map((illo) => globe(illo, count));
    });
  }

  stages[0].loop(() => {
    illos.forEach((illo, i) => {
      illo.rotate.y += 0.01;
      const start = performance.now();
      illo.updateRenderGraph();
      cost[i] = cost[i]! * 0.9 + (performance.now() - start) * 0.1;
      const line = lines[i];
      if (line) line.textContent = `${i === 0 ? '<canvas>' : '<svg>'}: ${cost[i]!.toFixed(2)} ms per frame`;
    });
  });

  return () => {
    stages.forEach((s) => s.dispose());
    row.remove();
  };
};

export default mount;
