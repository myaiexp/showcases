// Interaction: nodePointerAreaPaint paints a bigger, invisible hit area, so a node can be hovered from beside it
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

const R = 4;
const EXTRA = 10;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dashed circles are the hit areas. Hover just outside a dot: only the wide area still finds the node.' });
  const data = clusters(2, stage.preview ? 6 : 9);
  let wide = true;
  let show = true;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .nodeVal(1)
    .nodeLabel('name')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .autoPauseRedraw(false)
    // The dashed ring is for show; the paint callback below is what the pointer actually uses.
    .nodeCanvasObjectMode(() => 'after')
    .nodeCanvasObject((n, c, scale) => {
      if (!show || !wide) return;
      c.beginPath();
      c.arc(n.x ?? 0, n.y ?? 0, R + EXTRA, 0, 2 * Math.PI);
      c.setLineDash([3 / scale, 3 / scale]);
      c.strokeStyle = 'rgba(0,0,0,0.35)';
      c.lineWidth = 1 / scale;
      c.stroke();
      c.setLineDash([]);
    })
    .onNodeHover((n) => {
      hovered = n;
      report();
    })
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 30));
  let hovered: GNode | null = null;
  const say = status(stage);
  const report = (): void => say(`hit area ${wide ? 'wide' : 'default'}: ${hovered ? `hovering ${hovered.name}` : 'nothing hovered'}`);

  const setWide = (on: boolean): void => {
    wide = on;
    // The paint callback is read when the prop is set: set it again for the new size.
    graph.nodePointerAreaPaint((n, color, c) => {
      c.fillStyle = color;
      c.beginPath();
      c.arc(n.x ?? 0, n.y ?? 0, R + (wide ? EXTRA : 0), 0, 2 * Math.PI);
      c.fill();
    });
    report();
  };
  setWide(!stage.preview);

  if (stage.bar) {
    checkbox(stage.bar, 'wide hit area', true, setWide);
    checkbox(stage.bar, 'show it', true, (v) => (show = v));
  } else {
    const ghost = stage.ghost(graph);
    const target = data.nodes[3] as GNode;
    script(stage, async (wait) => {
      setWide(!wide);
      const p = graph.graph2ScreenCoords(target.x ?? 0, target.y ?? 0);
      // A few pixels beyond the edge of the visible dot.
      ghost.px(p.x + R * graph.zoom() + 5, p.y);
      await wait(2600);
    });
  }

  return stage.dispose;
};

export default mount;
