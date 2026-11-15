// Interaction: onZoom and onZoomEnd report the view transform {k, x, y} for the wheel, drags and zoom() or centerAt()
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { script } from '../../shared/tour.ts';
import { createStage } from '../../shared/stage.ts';

type T = { k: number; x: number; y: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll, drag the background, or wait for the card to call zoom() and centerAt(): onZoom fires for all of them.' });
  const data = clusters(3, stage.preview ? 7 : 11);
  const fmt = (t: T): string => `k ${t.k.toFixed(2)}  x ${t.x.toFixed(0)}  y ${t.y.toFixed(0)}`;
  let live = '';
  let end = '';

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(2500)
    .onZoom((t) => {
      live = fmt(t);
      say(`onZoom     ${live}\nonZoomEnd  ${end}`);
    })
    .onZoomEnd((t) => {
      end = fmt(t);
      say(`onZoom     ${live}\nonZoomEnd  ${end}`);
    })
    .onEngineStop(() => graph.zoomToFit(300, 20));
  const say = status(stage, 'onZoom\nonZoomEnd');

  if (stage.preview) {
    const nodes = data.nodes as GNode[];
    let i = 0;
    script(stage, async (wait) => {
      const n = nodes[(i++ * 6) % nodes.length]!;
      graph.centerAt(n.x, n.y, 900);
      graph.zoom(2.5, 900);
      await wait(1900);
      graph.zoomToFit(900, 20);
      await wait(1900);
    });
  }

  return stage.dispose;
};

export default mount;
