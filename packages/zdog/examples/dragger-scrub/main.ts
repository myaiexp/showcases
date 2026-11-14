// Dragger as a scrub control: drag sideways to lift a treasure chest lid
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const OPEN = 1.9; // radians the lid can open

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag left and right to open or close the chest.' });
  const illo = new Zdog.Illustration({
    element: stage.element, zoom: stage.zoom * 1.1, rotate: { x: -0.45, y: -0.6 },
  });

  // body, open on top
  new Zdog.Box({
    addTo: illo, width: 130, height: 60, depth: 80, translate: { y: 20 },
    topFace: false, stroke: 8, color: '#a0622d', leftFace: '#8a4f20', rightFace: '#8a4f20',
    frontFace: '#b8743a', rearFace: '#8a4f20', bottomFace: '#6b3a14',
  });
  // gold peeking over the rim
  const coins = ([[-35, -10], [-5, 10], [30, -15], [10, -22], [-30, 20], [38, 14]] as const).map(([x, z]) =>
    new Zdog.Shape({ addTo: illo, translate: { x, y: 0, z }, stroke: 24, color: '#EA0' }));
  const hinge = new Zdog.Anchor({ addTo: illo, translate: { y: -10, z: -40 } });
  const lid = hinge;
  new Zdog.Box({
    addTo: lid, width: 130, height: 16, depth: 80, translate: { y: -8, z: 40 },
    stroke: 8, color: '#b8743a', topFace: '#c98a4b', leftFace: '#8a4f20', rightFace: '#8a4f20',
    frontFace: '#b8743a', rearFace: '#8a4f20', bottomFace: '#6b3a14',
  });
  new Zdog.Rect({ addTo: lid, width: 18, height: 16, translate: { y: -2, z: 82 }, stroke: 5, color: '#EA0', fill: true });

  // ----- scrub: the drag distance becomes the lid angle ----- //
  let open = 0;
  let startOpen = 0;
  new Zdog.Dragger({
    startElement: stage.element,
    onDragStart: () => {
      startOpen = open;
    },
    onDragMove: (_pointer, moveX) => {
      open = Math.max(0, Math.min(1, startOpen + moveX / (stage.width * 0.6)));
    },
  });

  const info = stage.bar ? readout(stage.bar) : null;
  stage.loop((_, t) => {
    if (stage.preview) open = (1 - Math.cos(t * 1.1)) / 2;
    hinge.rotate.x = open * OPEN;
    coins.forEach((c) => (c.visible = open > 0.08)); // hidden while the lid is shut
    if (info) info.textContent = `lid ${Math.round((open * OPEN * 360) / TAU)} degrees`;
    illo.updateRenderGraph();
  });

  return stage.dispose;
};

export default mount;
