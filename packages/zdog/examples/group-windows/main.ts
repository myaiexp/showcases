// Group windows: a house front whose windows and door stay on top of the wall
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';

const MODES = ['Group', 'Anchor'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The house sways. Switch to Anchor and the windows fight the wall.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.05,
  });
  const house = new Zdog.Anchor({ addTo: illo, translate: { y: 12 } });

  let mode: Mode = 'Group';
  let front: Zdog.Anchor;
  const build = (): void => {
    front?.remove();
    // Group draws its children in the order added: wall, then everything on the wall
    const opts = { addTo: house };
    front = mode === 'Group' ? new Zdog.Group(opts) : new Zdog.Anchor(opts);
    new Zdog.Rect({ addTo: front, width: 170, height: 110, stroke: 8, fill: true, color: '#C25' });
    // roof: a closed triangle path sitting on top of the wall
    new Zdog.Shape({
      addTo: front,
      path: [{ x: -95, y: 0 }, { x: 0, y: -58 }, { x: 95, y: 0 }],
      translate: { y: -55 },
      closed: true,
      stroke: 8,
      fill: true,
      color: '#a35ac9',
    });
    const window = new Zdog.Rect({
      addTo: front,
      width: 34,
      height: 30,
      translate: { x: -48, y: -14 },
      stroke: 4,
      fill: true,
      color: '#9fd7ff',
    });
    window.copy({ translate: { x: 48, y: -14 } });
    new Zdog.Rect({ addTo: front, width: 30, height: 52, translate: { y: 15 }, stroke: 4, fill: true, color: '#EA0' });
    new Zdog.Shape({ addTo: front, translate: { x: 8, y: 17 }, stroke: 5, color: '#fff' });
  };
  build();

  if (stage.bar) select(stage.bar, 'container', MODES, (v) => { mode = v; build(); }, mode);
  else
    stage.every(2600, () => {
      mode = mode === 'Group' ? 'Anchor' : 'Group';
      build();
    });

  stage.loop((_dt, t) => {
    illo.rotate.y = 0.9 * Math.sin(t * 0.8);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
