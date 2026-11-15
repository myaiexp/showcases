// Node styling: nodeResolution sets the segments of every sphere, from a faceted ball to a smooth one
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The default is 8 segments. Zoom in on a node to see the facets.' });

  const graph = stage
    .own(new ForceGraph3D(stage.container))
    .graphData(randomTree(6, 12))
    .nodeVal(60)
    .nodeOpacity(1)
    .nodeResolution(8);
  graph.cooldownTime(2000).onEngineStop(() => graph.zoomToFit(300, 10));

  if (stage.preview) {
    const steps = [3, 4, 6, 8, 16, 32];
    let i = 0;
    stage.every(1100, () => graph.nodeResolution(steps[++i % steps.length]!));
  }

  if (stage.bar) slider(stage.bar, 'nodeResolution', 3, 32, 1, 8, (v) => graph.nodeResolution(v));

  return stage.dispose;
};

export default mount;
