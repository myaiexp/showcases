// Link styling: linkDirectionalArrowRelPos moves the arrow along the link, 0 at the source to 1 at the target
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { clusters, type SampleLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: '0 puts the arrow at the source end, 1 at the target, 0.5 in the middle. It follows curved links too.' });
  let curved = true;

  const graph = stage
    .own(new ForceGraph<SampleNode, SampleLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 6 : 10))
    .nodeAutoColorBy('group')
    .linkWidth(1.5)
    .linkColor(() => 'rgba(0,0,0,0.3)')
    .linkDirectionalArrowLength(8)
    .linkDirectionalArrowColor(() => '#e4572e')
    .linkCurvature(0.25)
    .linkDirectionalArrowRelPos(0.5);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    stage.loop((_dt, t) => {
      graph.linkDirectionalArrowRelPos(0.5 + 0.5 * Math.sin(t * 1.1));
    });
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    slider(stage.bar, 'relative position', 0, 1, 0.05, 0.5, (v) => graph.linkDirectionalArrowRelPos(v), (v) => v.toFixed(2));
    checkbox(stage.bar, 'curved links', curved, (on) => {
      curved = on;
      graph.linkCurvature(on ? 0.25 : 0);
    });
  }

  return stage.dispose;
};

export default mount;
