// Shape style options: one star as an outline, a fill, or both
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';

const MODES = ['outline (stroke)', 'fill only', 'stroke + fill'] as const;
type Mode = (typeof MODES)[number];
const COLORS = { gold: '#EA0', orange: '#E62', garnet: '#C25', violet: '#a35ac9' } as const;

// a five-pointed star: ten points alternating between the tips and the notches
const star = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Zdog.TAU;
  const r = i % 2 === 0 ? 80 : 34;
  return { x: Math.sin(a) * r, y: -Math.cos(a) * r };
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to rotate the star.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { y: 0.5 },
    dragRotate: !stage.preview,
  });
  let mode: Mode = 'outline (stroke)';
  let width = 12;
  let color: keyof typeof COLORS = 'gold';

  const shape = new Zdog.Shape({ addTo: illo, path: star, closed: true, stroke: width, fill: false, color: COLORS[color] });
  const apply = (): void => {
    // the three options this example is about
    shape.color = COLORS[color];
    shape.stroke = mode === 'fill only' ? false : width;
    shape.fill = mode !== 'outline (stroke)';
  };
  apply();

  if (stage.bar) {
    select(stage.bar, 'render', MODES, (v) => { mode = v; apply(); }, mode);
    slider(stage.bar, 'stroke', 1, 30, 1, width, (v) => { width = v; apply(); });
    select(stage.bar, 'color', Object.keys(COLORS) as (keyof typeof COLORS)[], (v) => { color = v; apply(); }, color);
  } else {
    let i = 0;
    stage.every(1500, () => {
      mode = MODES[++i % MODES.length]!;
      apply();
    });
  }

  stage.loop((dt) => {
    illo.rotate.y += dt * 0.8;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
