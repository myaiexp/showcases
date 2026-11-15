// Interaction: linkPointerAreaPaint paints the band that counts as hovering a link: here a wide stroke
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { KIND_COLOR, network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The pale bands are the hit areas. The pointer rests beside a link: only the wide band reaches it.' });
  const data = network(2, stage.preview ? 6 : 9) as { nodes: Node[]; links: NetworkLink[] };
  let wide = true;
  let show = true;
  let hovered: NetworkLink | null = null;
  const ends = (l: NetworkLink): [Node, Node] => [l.source as unknown as Node, l.target as unknown as Node];

  const graph = stage.own(new ForceGraph<Node, NetworkLink>(stage.container))
    .graphData(data)
    .nodeColor(() => '#9aa3ad')
    .linkLabel('name')
    .linkColor((l) => (l === hovered ? KIND_COLOR[l.type] : 'rgba(0,0,0,0.3)'))
    .linkWidth((l) => (l === hovered ? 3 : 1))
    .autoPauseRedraw(false)
    .linkCanvasObjectMode(() => 'before')
    .linkCanvasObject((l, c) => {
      if (!show || !wide) return;
      const [a, b] = ends(l);
      c.beginPath();
      c.moveTo(a.x ?? 0, a.y ?? 0);
      c.lineTo(b.x ?? 0, b.y ?? 0);
      c.lineWidth = 14;
      c.lineCap = 'round';
      c.strokeStyle = 'rgba(61,90,128,0.12)';
      c.stroke();
    })
    .onLinkHover((l) => {
      hovered = l;
      report();
    })
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 30));
  const say = status(stage);
  const report = (): void => say(`hit band ${wide ? 'wide' : 'default'}: ${hovered ? `hovering ${hovered.name}` : 'nothing hovered'}`);

  const setWide = (on: boolean): void => {
    wide = on;
    graph.linkPointerAreaPaint((l, color, c) => {
      const [a, b] = ends(l);
      c.beginPath();
      c.moveTo(a.x ?? 0, a.y ?? 0);
      c.lineTo(b.x ?? 0, b.y ?? 0);
      c.strokeStyle = color;
      // Graph units here: 14 is a band about 14 px wide at zoom 1.
      c.lineWidth = wide ? 14 : 1;
      c.stroke();
    });
    report();
  };
  setWide(!stage.preview);

  if (stage.bar) {
    checkbox(stage.bar, 'wide hit band', true, setWide);
    checkbox(stage.bar, 'show it', true, (v) => (show = v));
  } else {
    const ghost = stage.ghost(graph);
    const link = data.links[4]!;
    script(stage, async (wait) => {
      setWide(!wide);
      const [s, t] = ends(link);
      const a = graph.graph2ScreenCoords(s.x ?? 0, s.y ?? 0);
      const b = graph.graph2ScreenCoords(t.x ?? 0, t.y ?? 0);
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      // Four pixels beside the middle of the link.
      ghost.px((a.x + b.x) / 2 - ((b.y - a.y) / len) * 4, (a.y + b.y) / 2 + ((b.x - a.x) / len) * 4);
      await wait(2600);
    });
  }

  return stage.dispose;
};

export default mount;
