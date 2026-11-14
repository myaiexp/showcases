// map-node-size transform: mapLabelSize scales the label font with the node
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { smallTree } from '../../shared/transform-data.ts';

const MODES = { off: false, 'true': true, '[10, 24]': [10, 24] } as const;
type Mode = keyof typeof MODES;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const options = (mode: Mode) => ({
      key: 'map-node-size',
      type: 'map-node-size',
      centrality: { type: 'degree' as const },
      minSize: 24,
      maxSize: 70,
      mapLabelSize: MODES[mode] as boolean | [number, number],
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: smallTree(),
        node: { style: { fill: '#9270CA', labelText: (d) => d.id, labelPlacement: 'center' } },
        edge: { style: { stroke: '#4a5a7a' } },
        layout: { type: 'antv-dagre', rankdir: 'LR', nodesep: 20, ranksep: 60 },
        transforms: [options('true')],
      }),
    );
    await graph.render();

    const setMode = async (mode: Mode): Promise<void> => {
      graph.setTransforms([options(mode)]);
      await graph.render();
    };
    const names = Object.keys(MODES) as Mode[];
    if (stage.bar) select(stage.bar, 'mapLabelSize', names, 'true', (v) => void setMode(v));
    else stage.every(1500, (i) => setMode(names[i % names.length]!));
  });

export default mount;
