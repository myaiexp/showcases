// Custom edge lifecycle hooks: onCreate, onUpdate and onDestroy report to a log
import { BaseEdge, type BaseEdgeStyleProps, ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// The class is registered once per page, so the current example hands it a sink.
let sink: ((line: string) => void) | null = null;

class HookEdge extends BaseEdge {
  protected override getKeyStyle(attributes: Required<BaseEdgeStyleProps>) {
    return { ...super.getKeyStyle(attributes), lineWidth: 3, stroke: '#52C41A' };
  }

  protected override getKeyPath(attributes: Required<BaseEdgeStyleProps>) {
    const [s, t] = this.getEndpoints(attributes);
    return [['M', s[0], s[1]], ['L', t[0], t[1]]] as never;
  }

  onCreate(): void {
    sink?.(`onCreate ${this.id}`);
  }

  onUpdate(): void {
    sink?.(`onUpdate ${this.id}`);
  }

  onDestroy(): void {
    sink?.(`onDestroy ${this.id}`);
  }
}

register(ExtensionCategory.EDGE, 'showcase-edge-hooks', HookEdge);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = ctx.preview ? null : readout(el);
    const lines: string[] = [];
    sink = (line) => {
      lines.push(line);
      if (log) log.textContent = lines.slice(-8).join('\n');
    };
    stage.onCleanup(() => (sink = null));

    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'a', style: { x: 40, y: 50 } },
            { id: 'b', style: { x: 240, y: 50 } },
            { id: 'c', style: { x: 140, y: 150 } },
          ],
          edges: [{ id: 'ab', type: 'showcase-edge-hooks', source: 'a', target: 'b' }],
        },
        edge: { type: 'showcase-edge-hooks' },
      }),
    );
    await graph.render();

    let n = 0;
    const steps: (() => unknown)[] = [
      () => graph.addEdgeData([{ id: 'bc', source: 'b', target: 'c' }]),
      () => graph.updateEdgeData([{ id: 'bc', style: { lineDash: [6, 4] } }]),
      () => graph.removeEdgeData(['bc']),
    ];
    const next = async (): Promise<void> => {
      steps[n++ % steps.length]!();
      await graph.draw();
    };
    if (stage.bar) button(stage.bar, 'add, update, remove edge b-c (click in turn)', () => void next());
    else stage.every(1100, next);
  });

export default mount;
