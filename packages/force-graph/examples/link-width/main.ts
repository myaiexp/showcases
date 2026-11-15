// Link styling: linkWidth from a link attribute; widths stay constant on screen while node sizes scale with zoom
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Width follows each link\'s value. Zoom in: nodes grow, link widths do not.' });
  const data = network(3, stage.preview ? 6 : 10);
  let k = 1;

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(data)
    .nodeAutoColorBy('group')
    .nodeRelSize(5)
    .linkColor(() => 'rgba(0,0,0,0.3)')
    .linkWidth((l) => l.value * k)
    .linkLabel((l) => `value ${l.value}`);

  if (stage.preview) {
    let fit = 1;
    graph.cooldownTime(2500).onEngineStop(() => {
      graph.zoomToFit(300, 22);
      stage.after(400, () => {
        fit = graph.zoom();
      });
    });
    let zoomedIn = false;
    stage.after(3400, () => {
      stage.every(2200, () => {
        zoomedIn = !zoomedIn;
        graph.zoom(zoomedIn ? fit * 2.2 : fit, 1200);
      });
    });
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    slider(stage.bar, 'width x', 0.5, 4, 0.25, k, (v) => {
      k = v;
      graph.linkWidth((l) => l.value * k);
    }, (v) => `${v}`);
  }

  return stage.dispose;
};

export default mount;
