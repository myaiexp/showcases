// Vector copy trail: a comet around a planet, its tail a history of positions
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';

const MAX = 80;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const illo = new Zdog.Illustration({ element: stage.element, zoom: stage.zoom * 0.95, rotate: { x: -0.35 } });

  new Zdog.Shape({ addTo: illo, stroke: 66, color: '#2b6cb0' }); // planet
  new Zdog.Ellipse({ addTo: illo, diameter: 110, stroke: 4, color: '#8fd3ff', rotate: { x: Math.PI / 2 - 0.2 } }); // ring
  // pooled tail dots, moved onto the stored positions each frame
  const tail = Array.from({ length: MAX }, () => new Zdog.Shape({ addTo: illo, stroke: 1, color: '#EA0', visible: false }));
  const head = new Zdog.Shape({ addTo: illo, stroke: 18, color: '#fff' });

  const pos = new Zdog.Vector();
  const history: Zdog.Vector[] = [];
  let length = 40;
  let useCopy = true;
  if (stage.bar) {
    slider(stage.bar, 'tail length', 5, MAX, 5, length, (v) => (length = v));
    select(stage.bar, 'push', ['pos.copy()', 'pos (same vector)'], (v) => {
      useCopy = v === 'pos.copy()';
      history.length = 0;
    });
  }

  stage.loop((_, t) => {
    const a = t * 1.6;
    // an orbit tilted in space: rotate puts it off the flat plane
    pos.set({ x: 120 * Math.cos(a), z: 78 * Math.sin(a), y: 0 }).rotate({ x: 0.5, z: 0.35 });
    // copy() snapshots the position; pushing `pos` itself would store one vector many times
    history.unshift(useCopy ? pos.copy() : pos);
    history.length = Math.min(history.length, length);
    head.translate.set(pos);
    tail.forEach((dot, i) => {
      const spot = history[i];
      dot.visible = !!spot;
      if (!spot) return;
      dot.translate.set(spot);
      const k = 1 - i / length;
      dot.stroke = 2 + 14 * k;
      dot.color = k > 0.5 ? '#ED0' : k > 0.25 ? '#E62' : '#a35ac9';
    });
    illo.rotate.y = t * 0.25;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
