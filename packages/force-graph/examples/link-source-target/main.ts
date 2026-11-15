// Data input: linkSource and linkTarget name the attributes that hold a link's two ends
import ForceGraph, { type LinkObject, type NodeObject } from 'force-graph';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { team } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = NodeObject & { name: string; group: number };
type Link = LinkObject<Node> & { from: string; to: string; name: string };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Links are { from, to }, drawn from the source end with arrows and particles.' });
  const log = stage.bar && readout(stage.bar, 'Hover a link');

  const base = team();
  const data = {
    nodes: base.nodes as Node[],
    links: base.links.map((l) => ({ from: String(l.source), to: String(l.target), name: String(l.name) })) as Link[],
  };

  const graph = stage
    .own(new ForceGraph<Node, Link>(stage.container))
    .linkSource('from')
    .linkTarget('to')
    .graphData(data)
    .nodeAutoColorBy('group')
    // Once resolved, the attributes hold the node objects.
    .linkLabel((l) => `${(l.from as unknown as Node).name} ${l.name} ${(l.to as unknown as Node).name}`)
    .linkDirectionalArrowLength(5)
    .linkDirectionalArrowRelPos(1)
    .linkDirectionalParticles(1)
    .linkDirectionalParticleSpeed(0.006)
    .linkWidth(1.5)
    .onLinkHover((l) => {
      if (log) log.textContent = l ? `${(l.from as unknown as Node).name} -> ${(l.to as unknown as Node).name}: ${l.name}` : 'Hover a link';
    });

  if (stage.preview) graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 14));

  return stage.dispose;
};

export default mount;
