// Interaction: linkHoverPrecision widens or narrows the band around a link that counts as hovering it
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { KIND_COLOR, network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { linkMid, script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hold the pointer a little way off a link. Low precision ignores it, high precision still finds it (label and widening).' });
  const data = network(3, stage.preview ? 6 : 9) as { nodes: Node[]; links: NetworkLink[] };
  let hovered: NetworkLink | null = null;
  let precision = 4;

  const graph = stage.own(new ForceGraph<Node, NetworkLink>(stage.container))
    .graphData(data)
    .nodeColor(() => '#9aa3ad')
    .linkLabel('name')
    .linkColor((l) => (l === hovered ? KIND_COLOR[l.type] : 'rgba(0,0,0,0.25)'))
    .linkWidth((l) => (l === hovered ? 3 : 1))
    .linkHoverPrecision(precision)
    .autoPauseRedraw(false)
    .onLinkHover((l) => {
      hovered = l;
      show();
    })
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 24));
  const say = status(stage);
  const show = (): void => say(`linkHoverPrecision(${precision}): ${hovered ? `hovering ${hovered.name}` : 'no link hovered'}`);
  show();

  if (stage.bar) {
    slider(stage.bar, 'linkHoverPrecision', 0, 30, 1, precision, (v) => {
      precision = v;
      graph.linkHoverPrecision(v);
      show();
    });
  } else {
    const ghost = stage.ghost(graph);
    const link = data.links[4]!;
    let wide = false;
    script(stage, async (wait) => {
      wide = !wide;
      precision = wide ? 16 : 1;
      graph.linkHoverPrecision(precision);
      const mid = linkMid(link);
      const s = link.source as unknown as Node;
      const t = link.target as unknown as Node;
      if (mid) {
        // Rest the pointer 8 screen pixels to the side of the middle of the link.
        const a = graph.graph2ScreenCoords(s.x ?? 0, s.y ?? 0);
        const b = graph.graph2ScreenCoords(t.x ?? 0, t.y ?? 0);
        const m = graph.graph2ScreenCoords(mid.x, mid.y);
        const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        ghost.px(m.x - ((b.y - a.y) / len) * 8, m.y + ((b.x - a.x) / len) * 8);
      }
      show();
      await wait(2400);
    });
  }

  return stage.dispose;
};

export default mount;
