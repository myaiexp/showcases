// Initialisation: new ForceGraph3D(el, { controlType: 'fly' }) flies the camera through the graph
import ForceGraph3D from '3d-force-graph';
import type { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Click the graph first. W A S D move, R and F go up and down, Q and E roll, arrow keys pitch and yaw; drag to look.',
  });

  const graph = stage
    .own(new ForceGraph3D(stage.container, { controlType: 'fly' }))
    .graphData(randomTree(stage.preview ? 50 : 120, 5));

  const controls = graph.controls() as FlyControls;

  if (stage.preview) {
    // Cards have no keyboard: swoop the camera through the graph on a loop.
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(0, 10));
    stage.loop((_dt, t) => {
      const r = 110 + 70 * Math.sin(t * 0.5);
      graph.cameraPosition(
        { x: r * Math.sin(t * 0.45), y: 30 * Math.sin(t * 0.7), z: r * Math.cos(t * 0.45) },
        { x: 0, y: 0, z: 0 },
      );
    });
  }

  if (stage.bar) {
    slider(stage.bar, 'movementSpeed', 50, 800, 25, controls.movementSpeed, (v) => {
      controls.movementSpeed = v;
    });
    slider(stage.bar, 'rollSpeed', 0.1, 2, 0.1, controls.rollSpeed, (v) => {
      controls.rollSpeed = v;
    }, (v) => v.toFixed(1));
    button(stage.bar, 'Fit to view', () => graph.zoomToFit(600, 10));
  }

  return stage.dispose;
};

export default mount;
