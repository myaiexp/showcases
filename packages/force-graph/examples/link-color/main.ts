// Link styling: linkColor as an attribute holding a colour, and as a function computing one
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['attribute', 'function: value'] as const;
const KIND = { road: '#8d6e63', rail: '#3d5a80', ferry: '#2a9d8f' } as const;
const RAMP = ['#d9d9d9', '#b8c4d6', '#7f9cc4', '#3d6fb0', '#e4572e'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every link has a color attribute; the function ignores it and colours by the link\'s value instead.' });
  const data = network(3, stage.preview ? 6 : 10);
  // The attribute: a colour written on each link.
  for (const l of data.links) (l as NetworkLink & { color?: string }).color = KIND[l.type];

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(data)
    .nodeColor(() => '#9aa3ad')
    .linkWidth(3);

  const use = (mode: (typeof MODES)[number]): void => {
    if (mode === 'attribute') graph.linkColor('color');
    else graph.linkColor((l) => RAMP[l.value - 1]!);
  };
  use('attribute');

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    let i = 0;
    stage.after(2800, () => stage.every(2000, () => use(MODES[++i % 2]!)));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    select(stage.bar, 'linkColor', MODES, use);
  }

  return stage.dispose;
};

export default mount;
