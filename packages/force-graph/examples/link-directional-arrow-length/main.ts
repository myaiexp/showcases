// Link styling: linkDirectionalArrowLength draws an arrow head on each link, pointing source to target
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The arrow sits on the link and points from its source to its target. 0 hides it.' });

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(network(3, stage.preview ? 6 : 10))
    .nodeAutoColorBy('group')
    .linkWidth(1.5)
    .linkColor(() => 'rgba(0,0,0,0.3)')
    .linkDirectionalArrowLength(6);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    let i = 0;
    const lengths = [0, 3, 6, 10, 14, 10, 6, 3];
    stage.after(2800, () => stage.every(600, () => graph.linkDirectionalArrowLength(lengths[++i % lengths.length]!)));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    slider(stage.bar, 'arrow length', 0, 20, 1, 6, (v) => graph.linkDirectionalArrowLength(v), (v) => `${v}px`);
  }

  return stage.dispose;
};

export default mount;
