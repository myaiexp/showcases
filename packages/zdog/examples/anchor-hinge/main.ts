// Anchor as a hinge: a treasure chest lid that swings on an invisible pivot
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, select, slider } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const HINGES = ['back edge', 'middle'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look around. The lid turns around the white dot.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { x: -0.45, y: -0.55 },
    dragRotate: true,
  });

  // chest body, with gold showing on top
  new Zdog.Box({
    addTo: illo,
    width: 120,
    height: 60,
    depth: 70,
    translate: { y: 15 },
    stroke: 2,
    color: '#a5622a',
    topFace: '#EA0',
    leftFace: '#8a4f1f',
    rightFace: '#8a4f1f',
    bottomFace: '#5a3212',
  });
  for (const x of [-30, -6, 20, 40]) {
    new Zdog.Ellipse({ addTo: illo, diameter: 18, translate: { x, y: -14, z: x / 4 }, rotate: { x: TAU / 4 }, stroke: 3, color: '#ED0', fill: true });
  }
  new Zdog.Shape({ addTo: illo, translate: { x: -45, y: -16, z: 14 }, stroke: 14, color: '#C25' });

  // the hinge: an Anchor sitting on the chest's top edge. The lid is added to it, so
  // turning the anchor swings the lid around that edge.
  const hinge = new Zdog.Anchor({ addTo: illo, translate: { y: -15, z: -35 } });
  const lid = new Zdog.Box({
    addTo: hinge,
    width: 124,
    height: 18,
    depth: 74,
    translate: { y: -9, z: 35 },
    stroke: 2,
    color: '#c47a35',
    topFace: '#c47a35',
    leftFace: '#8a4f1f',
    rightFace: '#8a4f1f',
    bottomFace: '#7a4a2b',
  });
  const pin = new Zdog.Shape({ addTo: hinge, stroke: 8, color: '#fff' });

  const place = (where: (typeof HINGES)[number]): void => {
    const z = where === 'middle' ? 0 : -35;
    hinge.translate.z = z;
    lid.translate.z = -z;
  };

  let angle = 0.7;
  if (stage.bar) {
    slider(stage.bar, 'lid angle', 0, 2.2, 0.01, angle, (v) => { angle = v; }, (v) => v.toFixed(2));
    select(stage.bar, 'hinge at', HINGES, place);
    checkbox(stage.bar, 'show hinge', true, (v) => { pin.visible = v; });
  } else {
    pin.visible = false;
  }

  stage.loop((_dt, t) => {
    if (stage.preview) {
      angle = 0.9 + 0.9 * Math.sin(t * 1.6);
      illo.rotate.y = -0.55 + 0.35 * Math.sin(t * 0.5);
    }
    hinge.rotate.x = angle;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
