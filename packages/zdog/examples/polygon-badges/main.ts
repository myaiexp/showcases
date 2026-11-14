// Polygon badges: a medal whose Polygon gains a side at a time, from triangle to octagon
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const NAMES = ['', '', '', 'triangle', 'square', 'pentagon', 'hexagon', 'heptagon', 'octagon'];
const COLORS = ['', '', '', '#E62', '#EA0', '#C25', '#a35ac9', '#5ad', '#6c6'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn the medal.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.15,
    rotate: { y: -0.4 },
    dragRotate: true,
  });
  const medal = new Zdog.Anchor({ addTo: illo, translate: { y: -14 } });

  // ribbon tails sit behind the badge
  for (const s of [-1, 1]) {
    new Zdog.Rect({
      addTo: medal, width: 22, height: 80, stroke: 2, fill: true, color: s < 0 ? '#C25' : '#E62',
      translate: { x: 22 * s, y: 62, z: -8 }, rotate: { z: 0.22 * s },
    });
  }

  let sides = 5;
  let badge: Zdog.Anchor | null = null;
  const build = (): void => {
    badge?.remove();
    badge = new Zdog.Anchor({ addTo: medal });
    // a Polygon is set by its radius and its number of sides
    new Zdog.Polygon({
      addTo: badge, radius: 62, sides, stroke: 10, fill: true, color: COLORS[sides]!,
      rotate: { z: sides % 2 ? TAU / 4 : 0 },
    });
    new Zdog.Polygon({
      addTo: badge, radius: 40, sides, stroke: 3, color: '#fff',
      rotate: { z: sides % 2 ? TAU / 4 : 0 }, translate: { z: 8 },
    });
    new Zdog.Shape({ addTo: badge, stroke: 14, color: '#fff', translate: { z: 10 } });
    if (readout) readout.textContent = `${sides} sides: ${NAMES[sides]}`;
  };
  let readout: HTMLElement | null = null;
  if (stage.bar) {
    readout = document.createElement('span');
    readout.style.cssText = 'font-size:13px;min-width:140px';
    slider(stage.bar, 'sides', 3, 8, 1, sides, (v) => { sides = v; build(); }, String);
    stage.bar.append(readout);
  }
  build();

  if (!stage.bar) {
    stage.every(900, () => {
      sides = sides >= 8 ? 3 : sides + 1;
      build();
    });
  }

  stage.loop((_dt, t) => {
    if (stage.preview) medal.rotate.y = Math.sin(t * 0.9) * 0.6;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
