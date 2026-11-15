// Initialisation: controlType is a constructor option, so switching it builds a new graph on the same data
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { spin } from '../../shared/camera.ts';
import { createStage } from '../../shared/stage.ts';

const TYPES = ['trackball', 'orbit', 'fly'] as const;
type ControlType = (typeof TYPES)[number];
const HINTS: Record<ControlType, string> = {
  trackball: 'Trackball: left-drag rotates freely (it can roll), wheel zooms, right-drag pans.',
  orbit: 'Orbit: left-drag turns around the centre and keeps up upright, wheel zooms, right-drag pans.',
  fly: 'Fly: W A S D move, R and F up and down, Q and E roll, arrow keys look; drag to look.',
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: [TYPES[0]], hint: 'Pick a control type: the graph is rebuilt with it.' });
  const data = randomTree(stage.preview ? 40 : 90, 21);

  let graph: ForceGraph3DInstance | null = null;
  const cam = stage.preview ? spin(stage, () => graph) : null;
  const build = (controlType: ControlType): void => {
    if (graph) stage.release(graph);
    // The constructor empties the container, so the same pane serves every rebuild.
    graph = stage.own(new ForceGraph3D(stage.container, { controlType })).graphData(data);
    graph.cooldownTime(1500).onEngineStop(() => cam?.fit(10));
    if (stage.caption) stage.caption.textContent = stage.preview ? controlType : HINTS[controlType];
  };
  build(TYPES[0]);

  if (stage.preview) {
    let i = 0;
    stage.every(3500, () => build(TYPES[++i % TYPES.length]!));
  }

  if (stage.bar) select(stage.bar, 'controlType', TYPES, build);

  return stage.dispose;
};

export default mount;
