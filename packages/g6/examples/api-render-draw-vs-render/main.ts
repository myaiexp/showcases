// draw() redraws without layout; render() adds layout and fit
import { Graph } from '@antv/g6';
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
        data: ringData(stage.preview ? 8 : 12),
        node: { style: { size: 16 } },
        edge: { style: { stroke: '#4a5a78' } },
        layout: { type: 'circular' },
        autoFit: 'view',
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const types = ['grid', 'concentric', 'circular'] as const;
    let n = 0;
    const next = () => {
      const type = types[n++ % types.length]!;
      graph.setLayout({ type });
      show(`setLayout({ type: '${type}' }) is set, nothing has run yet`);
    };
    const draw = async () => {
      await graph.draw();
      show('draw(): redrawn, positions unchanged');
    };
    const render = async () => {
      await graph.render();
      show('render(): layout ran, view fitted');
    };

    if (stage.bar) {
      button(stage.bar, 'setLayout (next type)', next);
      button(stage.bar, 'draw()', () => void draw());
      button(stage.bar, 'render()', () => void render());
    } else {
      stage.every(1500, (i) => {
        const step = i % 3;
        if (step === 1) next();
        else if (step === 2) return draw();
        else return render();
      });
    }
  });

export default mount;
