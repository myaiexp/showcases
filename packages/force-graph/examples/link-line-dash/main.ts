// Link styling: linkLineDash takes a dash pattern per link, as in canvas setLineDash
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const SETS: Record<string, Record<NetworkLink['type'], number[] | null>> = {
  'by type': { road: null, rail: [6, 3], ferry: [1, 3] },
  'long dashes': { road: [10, 4], rail: [10, 4], ferry: [10, 4] },
  'dash and dot': { road: [8, 3, 1, 3], rail: [8, 3, 1, 3], ferry: [8, 3, 1, 3] },
  'none': { road: null, rail: null, ferry: null },
};
const NAMES = Object.keys(SETS);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Road is solid, rail dashed, ferry dotted: each link returns its own array (or null for a solid line).' });
  const data = network(3, stage.preview ? 6 : 10);
  let set = SETS['by type']!;

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(data)
    .nodeColor(() => '#9aa3ad')
    .linkAutoColorBy('type')
    .linkWidth(2)
    .linkLineDash((l) => set[l.type]!);
  const use = (name: string): void => {
    set = SETS[name]!;
    graph.linkLineDash((l) => set[l.type]!);
  };

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    let i = 0;
    stage.after(2800, () => stage.every(1500, () => use(NAMES[++i % NAMES.length]!)));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    select(stage.bar, 'pattern set', NAMES, use);
  }

  return stage.dispose;
};

export default mount;
