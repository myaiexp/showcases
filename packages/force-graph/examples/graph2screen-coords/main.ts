// Utility: graph2ScreenCoords gives the pixel of a node: HTML chips follow the nodes, repositioned every frame
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { team, type GLink, type GNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The names are HTML elements above the canvas. Each frame they are moved to graph2ScreenCoords(node.x, node.y), so they follow pans, zooms and drags.' });
  const data = team() as { nodes: GNode[]; links: GLink[] };

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .nodeLabel(() => '')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .autoPauseRedraw(false)
    .cooldownTime(3000)
    .onEngineStop(() => graph.zoomToFit(300, 30));

  // The constructor emptied the pane, so the overlay goes in afterwards.
  const layer = document.createElement('div');
  layer.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none';
  stage.container.append(layer);
  const chips = new Map<GNode, HTMLDivElement>();
  // Cards are small: chips for the three leads only.
  for (const n of data.nodes.filter((x) => !stage.preview || (x.val ?? 1) > 1)) {
    const chip = document.createElement('div');
    chip.textContent = String(n.name);
    chip.style.cssText =
      'position:absolute;left:0;top:0;padding:1px 5px;border-radius:8px;background:rgba(255,255,255,0.85);color:#222;font:10px/1.3 sans-serif;white-space:nowrap;will-change:transform';
    layer.append(chip);
    chips.set(n, chip);
  }
  graph.onRenderFramePost(() => {
    for (const [n, chip] of chips) {
      const p = graph.graph2ScreenCoords(n.x ?? 0, n.y ?? 0);
      // Centred above the node.
      chip.style.transform = `translate(${(p.x - chip.offsetWidth / 2).toFixed(1)}px, ${(p.y - 22).toFixed(1)}px)`;
    }
  });

  if (stage.bar) {
    button(stage.bar, 'zoomToFit(500)', () => graph.zoomToFit(500, 30));
  } else {
    let near = false;
    stage.after(3500, () => {
      stage.every(2400, () => {
        near = !near;
        if (near) graph.centerAt(0, 0, 1000).zoom(2.2, 1000);
        else graph.zoomToFit(1000, 30);
      });
    });
  }

  return stage.dispose;
};

export default mount;
