// Floor tiles: checkerboard tiles that vanish when you look up from below
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, slider } from '../../shared/controls.ts';

const N = 6; // tiles per side
const T = 28; // tile size

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag up and down to look from above or below the floor.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.05,
    rotate: { x: -0.6, y: 0.4 },
    dragRotate: !stage.preview,
  });

  // each tile is drawn straight into the xz plane; `front` says which way it faces (up is -y)
  const tiles: Zdog.Shape[] = [];
  const h = T / 2;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      tiles.push(new Zdog.Shape({
        addTo: illo,
        path: [{ x: -h, z: -h }, { x: h, z: -h }, { x: h, z: h }, { x: -h, z: h }],
        translate: { x: (i - (N - 1) / 2) * T, y: 40, z: (j - (N - 1) / 2) * T },
        fill: true, stroke: 1, color: (i + j) % 2 ? '#a35ac9' : '#FDB',
        front: { y: -1 },
        backface: false,
      }));
    }
  }
  // a little snowman standing on the floor, so there is something to look at
  new Zdog.Shape({ addTo: illo, translate: { y: 20 }, stroke: 42, color: '#fff' });
  new Zdog.Shape({ addTo: illo, translate: { y: -14 }, stroke: 28, color: '#fff' });
  new Zdog.Shape({ addTo: illo, translate: { y: -14, z: 14 }, path: [{}, { z: 14 }], stroke: 5, color: '#E62' });

  const setBackface = (hidden: boolean): void => {
    for (const t of tiles) t.backface = hidden ? false : '#444';
  };
  if (stage.bar) {
    checkbox(stage.bar, 'backface: false', true, setBackface);
    slider(stage.bar, 'camera angle', -90, 90, 1, -34, (v) => { illo.rotate.x = (v * Math.PI) / 180; }, (v) => (v < 0 ? `${-v} above` : `${v} below`));
  }

  stage.loop((_dt, t) => {
    if (stage.preview) {
      illo.rotate.x = -0.9 * Math.sin(t * 0.8);
      illo.rotate.y = t * 0.3;
    }
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
