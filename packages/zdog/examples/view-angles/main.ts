// View angles: Illustration rotate eased between front, top, side and isometric
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const VIEWS = {
  front: { x: 0, y: 0 },
  top: { x: -TAU / 4, y: 0 },
  side: { x: 0, y: -TAU / 4 },
  isometric: { x: -0.615, y: TAU / 8 },
} as const;
type View = keyof typeof VIEWS;
const NAMES = Object.keys(VIEWS) as View[];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  // rotate on the Illustration is the camera
  const illo = new Zdog.Illustration({ element: stage.element, zoom: stage.zoom * 0.9, rotate: VIEWS.isometric });

  new Zdog.Rect({ addTo: illo, width: 260, height: 220, translate: { y: 45 }, rotate: { x: TAU / 4 }, stroke: 4, fill: true, color: '#2a6a3a' }); // lawn
  const house = new Zdog.Anchor({ addTo: illo });
  new Zdog.Box({
    addTo: house, width: 120, height: 80, depth: 100, stroke: 6, color: '#FDB',
    leftFace: '#e9c79a', rightFace: '#e9c79a', topFace: false, bottomFace: false,
  });
  // two roof panels hinged on the ridge, closed at each end by a triangular gable
  const ridgeY = -99;
  for (const z of [-50, 50]) {
    new Zdog.Shape({
      addTo: house, path: [{ x: -60, y: -40 }, { y: ridgeY }, { x: 60, y: -40 }],
      translate: { z }, stroke: 6, fill: true, color: '#FDB',
    });
  }
  for (const side of [-1, 1]) {
    const pivot = new Zdog.Anchor({ addTo: house, translate: { y: ridgeY }, rotate: { z: side * 0.7 } });
    new Zdog.Rect({
      addTo: pivot, width: 92, height: 108, translate: { x: side * 46 }, rotate: { x: TAU / 4 },
      stroke: 6, fill: true, color: side < 0 ? '#C25' : '#a81f44',
    });
  }
  new Zdog.Rect({ addTo: house, width: 22, height: 40, translate: { x: -20, y: 20, z: 51 }, stroke: 4, fill: true, color: '#E62' }); // door
  new Zdog.Rect({ addTo: house, width: 26, height: 26, translate: { x: 28, y: -2, z: 51 }, stroke: 4, fill: true, color: '#8fd3ff' }); // window
  new Zdog.Box({ addTo: house, width: 16, height: 40, depth: 16, translate: { x: 34, y: -88, z: -20 }, stroke: 4, color: '#a0622d' }); // chimney

  let target: View = 'isometric';
  const pick = (v: View): void => {
    target = v;
  };
  if (stage.bar) select(stage.bar, 'camera', NAMES, pick, target);
  else {
    let i = NAMES.indexOf(target);
    stage.every(1700, () => pick(NAMES[(i = (i + 1) % NAMES.length)]!));
  }

  stage.loop(() => {
    // Vector.lerp walks the camera rotation towards the preset
    illo.rotate.lerp(VIEWS[target], 0.1);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
