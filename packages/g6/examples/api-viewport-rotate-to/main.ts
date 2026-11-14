// graph.rotateTo: absolute rotation in radians, about the center or the top-left corner
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select, slider } from '../../shared/controls.ts';
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
        node: { style: { size: 18, labelText: (d) => String(d.id).replace('n-', '') } },
        edge: { style: { stroke: '#4a5a78' } },
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    let origin: 'viewport center' | 'top-left' = 'viewport center';
    const to = async (deg: number) => {
      const o = origin === 'top-left' ? ([0, 0] as [number, number]) : graph.getCanvasCenter();
      await graph.rotateTo((deg * Math.PI) / 180, { duration: 600 }, o);
      show(`rotateTo(${deg} deg)  getRotation ${graph.getRotation().toFixed(3)} rad`);
    };
    show('rotation 0 rad');

    if (stage.bar) {
      let deg = 45;
      slider(stage.bar, 'degrees', [-180, 180, 5], deg, (v) => (deg = v));
      select(stage.bar, 'origin', ['viewport center', 'top-left'] as const, origin, (v) => (origin = v));
      button(stage.bar, 'rotateTo', () => void to(deg));
    } else {
      const angles = [45, -30, 90, 0];
      stage.every(1500, (i) => to(angles[i % angles.length]!));
    }
  });

export default mount;
