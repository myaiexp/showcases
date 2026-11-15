// Render control: nodes are recoloured in place, and refresh() redraws every node and link
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { clusters, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { fitOnce, spin } from '../../shared/camera.ts';
import { overlay } from '../../shared/overlay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The data changes at once, but the spheres keep their old colour until refresh() redraws them.' });

  const data = clusters(3, stage.preview ? 8 : 14) as TData;
  for (const n of data.nodes) n.color = '#7aa2f7';

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(data)
    .nodeLabel('name')
    .nodeColor('color') // read from each node's `color` attribute when the nodes are built
    .nodeOpacity(1)
    .cooldownTime(stage.preview ? 2500 : 4000);

  const note = overlay(stage, 'node.color is blue');
  let hue = 215;
  const recolour = (): void => {
    hue = (hue + 70) % 360;
    for (const n of data.nodes) n.color = `hsl(${(hue + (n.group ?? 0) * 30) % 360} 85% 62%)`;
    note.textContent = `node.color mutated in ${data.nodes.length} nodes\nstill showing the old colours`;
  };
  const refresh = (): void => {
    graph.refresh();
    note.textContent = 'refresh(): objects rebuilt from the data';
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    // refresh() rebuilds the objects at the origin until the next tick, so fit only once.
    let fitted = false;
    graph.onEngineStop(() => {
      if (!fitted) cam.fit(10);
      fitted = true;
    });
    stage.every(3200, () => {
      recolour();
      stage.after(1500, refresh);
    });
  } else {
    fitOnce(graph);
    if (stage.bar) {
      button(stage.bar, 'Mutate node.color', recolour);
      button(stage.bar, 'refresh()', refresh);
    }
  }

  return stage.dispose;
};

export default mount;
