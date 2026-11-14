// graph.rotateBy: relative rotation that accumulates
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 50] : [6, 4, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 80, 70),
        node: { style: { size: 18 } },
        edge: { style: { stroke: '#4a5a78' } },
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const by = async (deg: number) => {
      await graph.rotateBy((deg * Math.PI) / 180, { duration: 450, easing: 'ease-out' }, graph.getCanvasCenter());
      show(`rotateBy(${deg} deg)  total ${((graph.getRotation() * 180) / Math.PI).toFixed(0)} deg`);
    };
    show('total 0 deg');

    if (stage.bar) {
      button(stage.bar, '-30 deg', () => void by(-30));
      button(stage.bar, '+30 deg', () => void by(30));
      button(stage.bar, '+90 deg', () => void by(90));
    } else {
      stage.every(1000, () => by(30));
    }
  });

export default mount;
