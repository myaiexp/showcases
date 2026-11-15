// Initialisation: new ForceGraph3D(el, { controlType: 'orbit' }) swaps trackball for upright orbit controls
import ForceGraph3D from '3d-force-graph';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left-drag orbits around the centre and never rolls; wheel zooms, right-drag pans.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container, { controlType: 'orbit' }))
    .graphData(randomTree(stage.preview ? 50 : 120, 11));

  // The controls object is three's OrbitControls: its own properties apply.
  const controls = graph.controls() as OrbitControls;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  controls.enableDamping = true;

  if (stage.preview) graph.cooldownTime(3000).onEngineStop(() => graph.zoomToFit(400, 10));

  if (stage.bar) {
    checkbox(stage.bar, 'autoRotate', controls.autoRotate, (v) => {
      controls.autoRotate = v;
    });
    checkbox(stage.bar, 'enableDamping', controls.enableDamping, (v) => {
      controls.enableDamping = v;
    });
    slider(stage.bar, 'autoRotateSpeed', -10, 10, 0.5, controls.autoRotateSpeed, (v) => {
      controls.autoRotateSpeed = v;
    });
  }

  return stage.dispose;
};

export default mount;
