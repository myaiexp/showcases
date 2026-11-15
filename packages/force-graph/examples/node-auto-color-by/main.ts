// Node styling: nodeAutoColorBy gives nodes of the same group the same colour, unless they already have one
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { clusters, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { color?: string };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One colour per group, picked by the library. The first node of group 2 has its own colour and keeps it.' });

  const data = clusters(4, stage.preview ? 7 : 12);
  // A node that already has a colour is left alone.
  (data.nodes[0 + (stage.preview ? 7 : 12)] as Node).color = '#e4572e';

  const graph = stage
    .own(new ForceGraph<Node>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .nodeRelSize(5)
    .nodeLabel((n) => `${n.name}`);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 14));
    // Regroup: new groups get colours the next time data is set.
    stage.after(4000, () => {
      stage.every(4000, () => {
        const d = clusters(4, 7, Math.floor(Math.random() * 1000));
        (d.nodes[7] as Node).color = '#e4572e';
        graph.graphData(d);
      });
    });
  } else {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
  }

  return stage.dispose;
};

export default mount;
