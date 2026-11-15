// Node styling: nodeRelSize scales every node circle; the area is nodeRelSize per unit of val
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { clusters, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Node radius is sqrt(val) x nodeRelSize; the layout and the links do not change.' });

  const graph = stage
    .own(new ForceGraph<SampleNode>(stage.container))
    .graphData(clusters(3, stage.preview ? 9 : 14))
    .nodeAutoColorBy('group')
    .nodeLabel((n) => `val ${n.val}`)
    .nodeRelSize(4);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    // Sweep 1..10 and back; the canvas repaints when the prop changes.
    let step = 0;
    stage.every(350, () => {
      const phase = step++ % 18;
      graph.nodeRelSize(1 + (phase < 10 ? phase : 18 - phase));
    });
  } else if (stage.bar) {
    slider(stage.bar, 'nodeRelSize', 1, 12, 0.5, 4, (v) => graph.nodeRelSize(v));
  }

  return stage.dispose;
};

export default mount;
