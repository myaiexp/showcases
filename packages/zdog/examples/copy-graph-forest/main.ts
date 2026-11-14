// copyGraph forest: copy() leaves a tree's leaves behind, copyGraph() brings them
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const MODES = ['copyGraph()', 'copy()'] as const;
type Mode = (typeof MODES)[number];
const SPOTS = [
  { x: -70, z: -35 }, { x: 65, z: -50 }, { x: -25, z: 55 }, { x: 55, z: 40 },
  { x: -80, z: 50 }, { x: 5, z: -70 },
];
const TRUNKS = ['#b5651d', '#a5622a', '#C25', '#b5651d', '#a5622a', '#C25'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look around. Pick how the trees are copied.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom,
    rotate: { x: -0.45, y: 0.3 },
    dragRotate: true,
  });
  const world = new Zdog.Anchor({ addTo: illo, translate: { y: 50 } });
  // ground is an outline only: a filled disc would sort over trees behind its centre
  new Zdog.Ellipse({ addTo: world, diameter: 220, rotate: { x: TAU / 4 }, stroke: 2, color: '#2f6d44' });

  // the original tree: a trunk with two children, a crown and an apple
  const tree = new Zdog.Shape({
    addTo: world,
    path: [{ y: 0 }, { y: -36 }],
    stroke: 9,
    color: '#b5651d',
  });
  new Zdog.Shape({ addTo: tree, translate: { y: -46 }, stroke: 40, color: '#2a9d4a' });
  new Zdog.Shape({ addTo: tree, translate: { x: 14, y: -40, z: 16 }, stroke: 7, color: '#C25' });

  let mode: Mode = 'copyGraph()';
  let others: Zdog.Anchor[] = [];
  const plant = (): void => {
    for (const o of others) o.remove();
    others = SPOTS.map((s, i) => {
      const opts = { translate: { x: s.x, z: s.z }, color: TRUNKS[i]! };
      return mode === 'copyGraph()' ? tree.copyGraph(opts) : tree.copy(opts);
    });
  };
  plant();

  if (stage.bar) {
    select(stage.bar, 'copy with', MODES, (v) => { mode = v; plant(); }, mode);
  } else {
    stage.every(2000, () => {
      mode = mode === 'copy()' ? 'copyGraph()' : 'copy()';
      plant();
    });
  }

  stage.loop((dt) => {
    illo.rotate.y += dt * 0.4;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
