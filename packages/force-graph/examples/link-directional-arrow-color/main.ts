// Link styling: linkDirectionalArrowColor colours the arrow heads separately from the lines
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { KIND_COLOR, network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['by type', 'by value', 'one colour'] as const;
const RAMP = ['#c9c9c9', '#9db4d0', '#5e8bc2', '#e8a33d', '#e4572e'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Grey lines, coloured arrows: the arrow colour is its own accessor.' });

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(network(3, stage.preview ? 6 : 10))
    .nodeColor(() => '#9aa3ad')
    .linkWidth(1.5)
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .linkDirectionalArrowLength(8);
  const use = (m: (typeof MODES)[number]): void => {
    if (m === 'by type') graph.linkDirectionalArrowColor((l) => KIND_COLOR[l.type]);
    else if (m === 'by value') graph.linkDirectionalArrowColor((l) => RAMP[l.value - 1]!);
    else graph.linkDirectionalArrowColor(() => '#e4572e');
  };
  use('by type');

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    let i = 0;
    stage.after(2800, () => stage.every(1700, () => use(MODES[++i % MODES.length]!)));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    select(stage.bar, 'arrow colour', MODES, use);
  }

  return stage.dispose;
};

export default mount;
