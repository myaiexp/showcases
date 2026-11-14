// Group eye: a Group draws eye white, iris, pupil and highlight in the order added
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';

const MODES = ['Group', 'Anchor'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The eye sways side to side. Switch the container to Anchor to see the layers pop.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.15,
  });
  // brow, outside the eye
  new Zdog.Shape({
    addTo: illo,
    path: [{ x: -62, y: -62 }, { x: 0, y: -78 }, { x: 62, y: -62 }],
    translate: { z: 20 },
    closed: false,
    stroke: 9,
    color: '#FDB',
  });

  let mode: Mode = 'Group';
  let container: Zdog.Anchor;
  let iris: Zdog.Ellipse[] = [];

  const build = (): void => {
    container?.remove();
    const opts = { addTo: illo, translate: { z: 20 } };
    // Group: children render in the order they are added. Anchor: sorted by depth.
    container = mode === 'Group' ? new Zdog.Group(opts) : new Zdog.Anchor(opts);
    // eye white first
    new Zdog.Ellipse({ addTo: container, width: 160, height: 80, stroke: 8, fill: true, color: '#fff' });
    // then iris
    const irisShape = new Zdog.Ellipse({ addTo: container, diameter: 66, stroke: 6, fill: true, color: '#2b9' });
    // then pupil and highlight: copies of the iris with a few options replaced
    const pupil = irisShape.copy({ diameter: 28, color: '#111' }) as Zdog.Ellipse;
    const shine = irisShape.copy({ diameter: 14, color: '#fff' }) as Zdog.Ellipse;
    iris = [irisShape, pupil, shine];
  };
  build();

  if (stage.bar) select(stage.bar, 'container', MODES, (v) => { mode = v; build(); }, mode);
  else
    stage.every(2600, () => {
      mode = mode === 'Group' ? 'Anchor' : 'Group';
      build();
    });

  stage.loop((_dt, t) => {
    const gx = 30 * Math.sin(t * 1.1);
    const gy = 4 * Math.sin(t * 1.7);
    iris[0]!.translate.set({ x: gx, y: gy });
    iris[1]!.translate.set({ x: gx, y: gy });
    iris[2]!.translate.set({ x: gx + 12, y: gy - 12 });
    illo.rotate.y = 0.9 * Math.sin(t * 0.8);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
