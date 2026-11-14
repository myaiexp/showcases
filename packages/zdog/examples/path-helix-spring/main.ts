// Helix spring: a path of many points with z makes a coil that stretches under a weight
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const TOP = -90;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn it. Pull the sliders, or let it bounce.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { x: -0.2, y: -0.5 },
    dragRotate: true,
  });

  let turns = 7;
  let length = 110;
  let radius = 26;
  let spring: Zdog.Shape | null = null;
  const weight = new Zdog.Shape({ addTo: illo, stroke: 46, color: '#C25' });
  // ceiling bar
  new Zdog.Shape({ addTo: illo, path: [{ x: -50, y: TOP }, { x: 50, y: TOP }], stroke: 12, color: '#a35ac9' });

  const build = (): void => {
    spring?.remove();
    const points: { x: number; y: number; z: number }[] = [];
    const steps = turns * 14;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * turns * Zdog.TAU;
      // go round in x and z while y marches down: a helix
      points.push({ x: Math.cos(a) * radius, y: TOP + (i / steps) * length, z: Math.sin(a) * radius });
    }
    spring = new Zdog.Shape({ addTo: illo, path: points, closed: false, stroke: 5, color: '#EA0' });
    weight.translate.y = TOP + length + 20;
  };
  build();

  if (stage.bar) {
    slider(stage.bar, 'length', 40, 180, 1, length, (v) => { length = v; build(); });
    slider(stage.bar, 'coils', 3, 12, 1, turns, (v) => { turns = v; build(); });
    slider(stage.bar, 'radius', 10, 50, 1, radius, (v) => { radius = v; build(); });
  }

  stage.loop((_dt, t) => {
    if (stage.preview) {
      length = 110 + Math.sin(t * 3) * 40 * Math.exp(-0.15 * (t % 12));
      build();
    }
    illo.rotate.y += 0.008;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
