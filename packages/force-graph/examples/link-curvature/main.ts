// Link styling: linkCurvature bends links into curves; the sign sets the side
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { clusters, type SampleLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: '0 is straight; 1 bends a link to roughly a half circle; negative bends the other way.' });

  const graph = stage
    .own(new ForceGraph<SampleNode, SampleLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 7 : 10))
    .nodeAutoColorBy('group')
    .linkDirectionalArrowLength(4)
    .linkDirectionalArrowRelPos(0.5)
    .linkWidth(1.5)
    .linkCurvature(0.3);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 22));
    // Sweep from -0.5 to 0.5 and back: sine of time.
    stage.loop((_dt, t) => {
      graph.linkCurvature(0.5 * Math.sin(t * 0.8));
    });
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    slider(stage.bar, 'linkCurvature', -1, 1, 0.05, 0.3, (v) => graph.linkCurvature(v), (v) => v.toFixed(2));
  }

  return stage.dispose;
};

export default mount;
