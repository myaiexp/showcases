// Group updateSort: moons orbiting a planet, fixed vs re-sorted draw order
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';

const MOONS = [
  { r: 80, size: 20, speed: 1.3, color: '#EA0', phase: 0 },
  { r: 105, size: 16, speed: 0.9, color: '#E62', phase: 2 },
  { r: 125, size: 22, speed: 0.6, color: '#2dd4a7', phase: 4 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Without updateSort, moons behind the planet are still drawn on top of it.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 0.95,
    rotate: { x: -0.5 },
    dragRotate: !stage.preview,
  });

  // inside a Group, children draw in the order they were added unless updateSort is on
  const system = new Zdog.Group({ addTo: illo, updateSort: false });
  new Zdog.Shape({ addTo: system, stroke: 70, color: '#a35ac9' });
  const moons = MOONS.map((m) => new Zdog.Shape({ addTo: system, stroke: m.size, color: m.color }));

  const setSort = (on: boolean): void => {
    system.updateSort = on;
  };
  if (stage.bar) checkbox(stage.bar, 'updateSort: true', false, setSort);
  else {
    let on = false;
    stage.every(3200, () => { on = !on; setSort(on); });
  }

  stage.loop((_dt, t) => {
    MOONS.forEach((m, i) => {
      const a = t * m.speed + m.phase;
      moons[i]!.translate.x = Math.cos(a) * m.r;
      moons[i]!.translate.z = Math.sin(a) * m.r;
    });
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
