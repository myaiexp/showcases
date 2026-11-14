// A persistent animation: a node subclass pulses its halo lineWidth with direction 'alternate'
import { Circle, ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

let timing = { duration: 1000, direction: 'alternate' as PlaybackDirection };

class BreathingCircle extends Circle {
  onCreate(): void {
    this.shapeMap['halo']!.animate([{ lineWidth: 5 }, { lineWidth: 10 }], { ...timing, iterations: Infinity });
  }
}
register(ExtensionCategory.NODE, 'showcase-animation-breathing-circle', BreathingCircle);

const DIRECTIONS = ['alternate', 'normal', 'reverse'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    timing = { duration: 1000, direction: 'alternate' };
    const build = () =>
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node-1', style: { x: 150, y: 100 } }] },
        node: { type: 'showcase-animation-breathing-circle', style: { size: 50, fill: '#5B8FF9', halo: true, haloLineWidth: 5, haloStroke: '#5B8FF9' } },
      });
    let graph = stage.keep(build());
    await graph.render();

    // The timing is read in onCreate, so a change creates the node again.
    const rebuild = async (): Promise<void> => {
      graph.destroy();
      graph = stage.keep(build());
      await graph.render();
    };
    if (stage.bar) {
      slider(stage.bar, 'duration (ms)', [200, 3000, 100], timing.duration, (v) => ((timing = { ...timing, duration: v }), void rebuild()));
      select(stage.bar, 'direction', DIRECTIONS, 'alternate', (v) => ((timing = { ...timing, direction: v }), void rebuild()));
    }
  });

export default mount;
