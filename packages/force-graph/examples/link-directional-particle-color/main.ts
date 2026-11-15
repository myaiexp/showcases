// Link styling: linkDirectionalParticleColor, or falling back to the link's own colour when it is not set
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { KIND_COLOR, network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['link colour', 'by type', 'one colour'] as const;
type Mode = (typeof MODES)[number];
const ACCENT: Record<NetworkLink['type'], string> = { road: '#e4572e', rail: '#f3a712', ferry: '#8e5572' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Lines stay in their own colour; the particles are coloured by their own accessor, or follow the line.' });

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(network(3, stage.preview ? 6 : 10))
    .nodeColor(() => '#9aa3ad')
    .linkColor((l) => KIND_COLOR[l.type])
    .linkWidth(2)
    .linkDirectionalParticles(2)
    .linkDirectionalParticleSpeed(0.006)
    .linkDirectionalParticleWidth(5);
  const use = (m: Mode): void => {
    // Set to undefined, the prop goes back to its default and particles take the link's colour.
    if (m === 'link colour') graph.linkDirectionalParticleColor(undefined as never);
    else if (m === 'by type') graph.linkDirectionalParticleColor((l) => ACCENT[l.type]);
    else graph.linkDirectionalParticleColor(() => '#111111');
  };
  use('by type');

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    let i = 0;
    stage.after(2800, () => stage.every(1800, () => use(MODES[++i % MODES.length]!)));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    select(stage.bar, 'particle colour', MODES, use, 'by type');
  }

  return stage.dispose;
};

export default mount;
