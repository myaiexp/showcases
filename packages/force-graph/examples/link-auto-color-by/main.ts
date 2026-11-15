// Link styling: linkAutoColorBy colours links by an attribute, here their type, unless they already have a colour
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Link = NetworkLink & { color?: string };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One colour per link type, chosen by the library. The first ferry has its own colour and keeps it.' });
  const data = network(3, stage.preview ? 6 : 10);
  const own = data.links.find((l) => l.type === 'ferry') as Link;
  own.color = '#111111';

  const graph = stage
    .own(new ForceGraph<SampleNode, Link>(stage.container))
    .graphData(data)
    .linkAutoColorBy('type')
    .linkWidth(3)
    .nodeColor(() => '#9aa3ad')
    .linkLabel((l) => `${l.name} (${l.type})`);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    stage.after(4000, () => {
      let seed = 9;
      stage.every(4000, () => {
        const d = network(3, 6, ++seed);
        (d.links.find((l) => l.type === 'ferry') as Link).color = '#111111';
        graph.graphData(d);
      });
    });
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    // The colours exist once graphData has been set: list one swatch per type.
    for (const type of ['road', 'rail', 'ferry']) {
      const sample = data.links.find((l) => l.type === type && l !== own) as Link;
      const chip = document.createElement('span');
      chip.style.cssText = `display:inline-flex;gap:6px;align-items:center;font-size:13px`;
      const sw = document.createElement('span');
      sw.style.cssText = `width:22px;height:4px;border-radius:2px;background:${sample.color}`;
      chip.append(sw, type);
      stage.bar.append(chip);
    }
  }

  return stage.dispose;
};

export default mount;
