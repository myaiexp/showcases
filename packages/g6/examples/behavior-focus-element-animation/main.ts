// focus-element animation: duration and easing of the move, or none
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { overlay, simClick } from '../../shared/behavior-sim.ts';
import { readout, select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const easings = ['ease-in', 'ease-out', 'ease-in-out', 'linear'] as const;
type Easing = (typeof easings)[number];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(8, 5, 70),
        node: { style: { size: 18 } },
        behaviors: [{ type: 'focus-element', key: 'focus', animation: { duration: 500, easing: 'ease-in' } }, 'drag-canvas'],
        autoFit: 'center',
      }),
    );
    await graph.render();
    const state: { duration: number; easing: Easing } = { duration: 500, easing: 'ease-in' };
    const apply = () => graph.updateBehavior({ key: 'focus', animation: { ...state } });
    if (stage.bar) {
      readout(el).textContent = 'Click far-away nodes and compare how the move feels.';
      slider(stage.bar, 'duration', [0, 2000, 100], 500, (v) => ((state.duration = v), apply()));
      select(stage.bar, 'easing', easings, 'ease-in', (v) => ((state.easing = v), apply()));
    } else {
      const say = overlay(stage);
      const targets: [number, number][] = [cell(0, 0, 70), cell(4, 7, 70), cell(0, 7, 70), cell(4, 0, 70)];
      stage.every(2200, async (i) => {
        state.duration = i % 2 ? 1500 : 250;
        state.easing = easings[i % easings.length]!;
        apply();
        say(`${state.duration}ms ${state.easing}`);
        await simClick(stage, graph, targets[i % targets.length]!);
      });
    }
  });

export default mount;
