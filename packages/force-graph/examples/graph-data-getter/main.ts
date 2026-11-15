// Data input: graphData() hands back the same objects, now with layout fields and linked nodes
import ForceGraph, { type LinkObject, type NodeObject } from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = NodeObject & { name: string };
type Link = LinkObject<Node>;

/** One object on a line: numbers rounded, linked nodes shown as `node <id>`. */
function show(label: string, o: object): string {
  const parts = Object.entries(o).filter(([k]) => !k.startsWith('__')).map(([k, v]) => {
    if (typeof v === 'number') return `${k}: ${Math.round(v * 10) / 10}`;
    if (typeof v === 'string') return `${k}: '${v}'`;
    if (v && typeof v === 'object') return `${k}: node ${(v as Node).id}`;
    return `${k}: ${String(v)}`;
  });
  return `${label} { ${parts.join(', ')} }`;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: what goes in. Right after the layout runs: what graphData() returns.' });
  const sample = (seed: number): { nodes: Node[]; links: Link[] } => randomTree(stage.preview ? 24 : 40, seed) as { nodes: Node[]; links: Link[] };

  const note = document.createElement('div');
  note.style.cssText = `font:${stage.preview ? 9 : 12}px/1.4 ui-monospace,monospace;color:#2b2b2b;white-space:pre-wrap;
    background:rgba(246,243,236,0.88);padding:4px 6px;border-radius:4px;`;
  if (stage.preview) note.style.cssText += 'position:absolute;left:0;top:0;right:0;z-index:2;pointer-events:none;';

  const graph = stage.own(new ForceGraph<Node, Link>(stage.container)).nodeLabel('name');
  const readNow = (): string => {
    const { nodes, links } = graph.graphData();
    return `${show('nodes[2]', nodes[2]!)}\n${show('links[1]', links[1]!)}`;
  };
  const load = (seed: number): void => {
    const data = sample(seed);
    // Taken before graphData(): the layout then adds fields to these very objects.
    note.textContent = `you pass in:\n${show('nodes[2]', { ...data.nodes[2]! })}\n${show('links[1]', { ...data.links[1]! })}`;
    graph.graphData(data);
  };

  let seed = 2;
  graph.cooldownTime(2500).onEngineStop(() => {
    note.textContent = `graphData() returns:\n${readNow()}`;
    graph.zoomToFit(400, stage.preview ? 40 : 20);
  });
  load(seed);

  if (stage.preview) stage.container.append(note);
  else if (stage.bar) {
    stage.box.insertBefore(note, stage.bar);
    button(stage.bar, 'Read graphData() now', () => {
      note.textContent = `graphData() returns:\n${readNow()}`;
    });
    button(stage.bar, 'Load fresh data', () => load(++seed));
    readout(stage.bar, 'Positions keep changing until the engine stops, so read again to see x and y move.');
  }
  if (stage.preview) stage.every(7000, () => load(++seed));

  return stage.dispose;
};

export default mount;
