// Group visible: hiding a lamp head as a Group vs as a lone Shape
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';

const SHADE = [{ x: -22, y: -26 }, { x: 22, y: -26 }, { x: 40, y: 18 }, { x: -40, y: 18 }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: the head is a Group, so everything in it goes. Right: only the shade shape goes.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { x: -0.2, y: -0.3 },
    dragRotate: !stage.preview,
  });

  const stand = (x: number): Zdog.Anchor => {
    const lamp = new Zdog.Anchor({ addTo: illo, translate: { x, y: 10 } });
    new Zdog.Ellipse({ addTo: lamp, diameter: 60, translate: { y: 60 }, rotate: { x: Math.PI / 2 }, stroke: 8, fill: true, color: '#666' });
    new Zdog.Shape({ addTo: lamp, path: [{ y: 60 }, { y: -10 }], stroke: 6, color: '#999' });
    return lamp;
  };
  const shadeOpts = { path: SHADE, closed: true, fill: true, stroke: 6, color: '#E62', translate: { y: -20 } };
  const bulbOpts = { stroke: 22, color: '#ffe680' };

  // left lamp: shade and bulb are siblings in a Group
  const head = new Zdog.Group({ addTo: stand(-80), translate: { y: -20 } });
  new Zdog.Shape({ ...shadeOpts, addTo: head, translate: { y: 0 } });
  new Zdog.Shape({ ...bulbOpts, addTo: head, translate: { y: 14, z: 6 } });

  // right lamp: the bulb is a child of the shade Shape
  const shade = new Zdog.Shape({ ...shadeOpts, addTo: stand(80) });
  new Zdog.Shape({ ...bulbOpts, addTo: shade, translate: { y: 14, z: 6 } });

  let hidden = false;
  const setHidden = (v: boolean): void => {
    hidden = v;
    head.visible = !v; // Group.visible: the shade and the bulb both go
    shade.visible = !v; // Shape.visible: only the shade goes, its child stays
  };
  if (stage.bar) button(stage.bar, 'Toggle visible', () => setHidden(!hidden));
  else stage.every(1800, () => setHidden(!hidden));

  stage.loop((_dt, t) => {
    if (stage.preview) illo.rotate.y = -0.3 + 0.4 * Math.sin(t * 0.6);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
