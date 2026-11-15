// Link styling: linkLabel is the tooltip of the hovered link, as an attribute or an HTML string
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { endId, team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const FORMS = ['attribute: name', 'HTML string'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a link: the tooltip is whatever linkLabel returns for it.' });
  const data = team() as TData;
  const names = new Map(data.nodes.map((n) => [n.id, n.name]));

  const html = (l: TLink): string =>
    `<div style="padding:4px 8px;border-radius:6px;background:#1a1b2e;border:1px solid #bb9af7">
       <b>${names.get(endId(l.source))}</b> <span style="color:#bb9af7">${l.name}</span> <b>${names.get(endId(l.target))}</b></div>`;

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('')
    .linkWidth(1.5)
    .linkOpacity(0.5)
    .linkLabel(html);

  if (stage.preview) {
    const ghost = stage.ghost(graph);
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 20));
    let i = 0;
    stage.every(1800, () => {
      const link = data.links[(i += 3) % data.links.length]!;
      const a = link.source as TNode;
      const b = link.target as TNode;
      if (a.x === undefined || b.x === undefined) return;
      // The middle of the link.
      ghost.at((a.x + b.x!) / 2, ((a.y ?? 0) + (b.y ?? 0)) / 2, ((a.z ?? 0) + (b.z ?? 0)) / 2);
    });
  }

  if (stage.bar) {
    select(stage.bar, 'linkLabel', FORMS, (f) => graph.linkLabel(f === FORMS[0] ? 'name' : html), FORMS[1]);
  }

  return stage.dispose;
};

export default mount;
