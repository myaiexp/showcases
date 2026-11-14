// Global vs element animation: the graph option and node.animation decide together
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const GLOBAL = { 'true': true, 'false': false, '{ duration: 1500 }': { duration: 1500 } } as const;
type Local = false | undefined | { update: { fields: string[]; duration: number }[] };
const LOCAL: Record<'default (not set)' | 'false' | 'custom: update x, y in 300 ms', Local> = {
  'default (not set)': undefined,
  false: false,
  'custom: update x, y in 300 ms': { update: [{ fields: ['x', 'y'], duration: 300 }] },
};
type G = keyof typeof GLOBAL;
type L = keyof typeof LOCAL;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const state = { g: '{ duration: 1500 }' as G, l: 'default (not set)' as L };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        animation: GLOBAL[state.g],
        data: { nodes: [0, 1, 2].map((i) => ({ id: `n${i}`, style: { x: 40, y: 45 + i * 45 } })) },
        node: { style: { size: 26, fill: '#5B8FF9', labelText: (d) => d.id, labelPlacement: 'right' } },
      }),
    );
    await graph.render();

    const out = stage.bar ? readout(el) : null;
    let right = false;
    const move = async (): Promise<void> => {
      right = !right;
      graph.setOptions({ animation: GLOBAL[state.g] });
      graph.setNode({ style: { size: 26, fill: '#5B8FF9', labelText: (d) => d.id, labelPlacement: 'right' }, animation: LOCAL[state.l] });
      graph.updateNodeData(graph.getNodeData().map((n, i) => ({ id: n.id, style: { x: right ? 240 : 40, y: 45 + i * 45 } })));
      const t = performance.now();
      await graph.draw();
      if (out) out.textContent = `global ${state.g}, element ${state.l}: draw() took ${Math.round(performance.now() - t)} ms`;
    };
    if (stage.bar) {
      select(stage.bar, 'graph animation', Object.keys(GLOBAL) as G[], state.g, (v) => (state.g = v));
      select(stage.bar, 'node.animation', Object.keys(LOCAL) as L[], state.l, (v) => (state.l = v));
      button(stage.bar, 'move nodes', () => void move());
    } else {
      const combos: [G, L][] = [['{ duration: 1500 }', 'default (not set)'], ['true', 'false'], ['false', 'custom: update x, y in 300 ms'], ['{ duration: 1500 }', 'custom: update x, y in 300 ms']];
      stage.every(1700, (i) => {
        [state.g, state.l] = combos[i % combos.length]!;
        return move();
      });
    }
  });

export default mount;
