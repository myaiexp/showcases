// combo.animation stages: a custom enter, exit and update, or all animation switched off
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const MODES = ['custom fields', 'fade', 'off'] as const;
type Mode = (typeof MODES)[number];
const animationOf = (m: Mode) =>
  m === 'off'
    ? (false as const)
    : m === 'fade'
      ? { enter: 'fade', update: 'translate', exit: 'fade' }
      : {
          // Enter grows opacity from 0 over a second, exit shrinks it in half a second, update tweens x and y.
          enter: [{ fields: ['opacity'], from: 0, to: 1, duration: 1000, easing: 'ease-out' }],
          update: [{ fields: ['x', 'y'], duration: 1000, easing: 'linear' }],
          exit: [{ fields: ['opacity'], to: 0, duration: 500, easing: 'ease-in' }],
        };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let mode: Mode = 'custom fields';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { combos: [{ id: 'c1', style: { x: 70, y: 90, collapsedSize: 70 } }] },
        combo: { style: { labelText: (d) => d.id, fill: '#1783FF', fillOpacity: 0.3 }, animation: animationOf(mode) },
      }),
    );
    await graph.render();

    let present = false;
    let flipped = false;
    const run = async (): Promise<void> => {
      // First step adds a combo (enter), second moves c1 (update), third removes it (exit).
      if (!present) {
        graph.addComboData([{ id: 'c2', style: { x: 210, y: 90, collapsedSize: 70 } }]);
        present = true;
      } else if (!flipped) {
        await graph.translateElementTo('c1', [70, 140], mode !== 'off');
        flipped = true;
        return;
      } else {
        graph.removeComboData(['c2']);
        await graph.translateElementTo('c1', [70, 90], false);
        present = false;
        flipped = false;
      }
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'animation', MODES, mode, (v) => {
        mode = v;
        graph.setCombo({ style: { labelText: (d: { id: string }) => d.id, fill: '#1783FF', fillOpacity: 0.3 }, animation: animationOf(v) });
      });
      button(stage.bar, 'next step: add c2, move c1, remove c2', () => void run());
    } else {
      stage.every(1400, run);
    }
  });

export default mount;
