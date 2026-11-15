// scene.camera: eye, center and up decide the view; the docs' five viewpoints
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { randoms } from '../../shared/fund-util.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';

// Each view is one scene in the docs; here one scene moves between them.
const VIEWS = {
  'lower the view point': { x: 2, y: 2, z: 0.1 },
  'x-z plane': { x: 0.1, y: 2.5, z: 0.1 },
  'y-z plane': { x: 2.5, y: 0.1, z: 0.1 },
  'view from above': { x: 0.1, y: 0.1, z: 2.5 },
  'zooming in': { x: 0.1, y: 0.1, z: 1 },
} as const;
type View = keyof typeof VIEWS;
const NAMES = Object.keys(VIEWS) as View[];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const r = rng(34);
  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter3d', mode: 'markers', opacity: 0.6, marker: { size: 4, color: '#a78bfa' }, x: randoms(r, 20, 4), y: randoms(r, 20, 3), z: randoms(r, 20, 5) }],
    {
      template: stage.template,
      margin: { l: 0, r: 0, t: 0, b: 0 },
      scene: { camera: { center: { x: 0, y: 0, z: 0 }, eye: VIEWS['lower the view point'], up: { x: 0, y: 0, z: 1 } } },
    },
    stage.config,
  );

  const go = (v: View): void => void Plotly.relayout(stage.div, { 'scene.camera.eye': VIEWS[v] });
  if (stage.bar) {
    select(stage.bar, 'scene.camera.eye', NAMES, NAMES[0]!, go);
    toggle(stage.bar, 'orthographic projection', false, (o) => void Plotly.relayout(stage.div, { 'scene.camera.projection.type': o ? 'orthographic' : 'perspective' }));
  } else {
    stage.every(1300, (i) => go(NAMES[i % NAMES.length]!));
  }
  return () => stage.dispose();
};

export default mount;
