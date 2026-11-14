// Event log for draw() and render()
import { Graph, GraphEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { hud, ringData } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ringData(stage.preview ? 6 : 10),
        node: { style: { size: 16 } },
        edge: { style: { stroke: '#4a5a78' } },
        layout: { type: 'circular' },
        autoFit: 'view',
      }),
    );
    const show = hud(stage, el);
    const lines: string[] = [];
    const t0 = performance.now();
    const log = (name: string) => {
      lines.push(`${String(Math.round(performance.now() - t0)).padStart(6)} ms  ${name}`);
      show(lines.slice(stage.preview ? -6 : -12).join('\n'));
    };
    for (const e of [GraphEvent.BEFORE_RENDER, GraphEvent.AFTER_RENDER, GraphEvent.BEFORE_DRAW, GraphEvent.AFTER_DRAW]) {
      graph.on(e, () => log(e));
    }
    await graph.render();

    if (stage.bar) {
      button(stage.bar, 'draw()', () => void graph.draw());
      button(stage.bar, 'render()', () => void graph.render());
      button(stage.bar, 'clear log', () => {
        lines.length = 0;
        show('');
      });
    } else {
      stage.every(1800, (i) => (i % 2 ? graph.draw() : graph.render()));
    }
  });

export default mount;
