// Treemap roam: drag and zoom a large tree
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';
import { asSpec, treemapBase } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) => {
  const { container, release } = createChart(el, ctx, asSpec({
    ...treemapBase(ctx.preview),
    roam: true,
    nonLeaf: { visible: true },
    nonLeafLabel: { visible: true, position: 'top', padding: 20, style: { fontSize: 11, fill: '#fff' } },
    title: { visible: !ctx.preview, text: 'Drag and wheel-zoom the chart' },
  }));

  // A card has no pointer, so it plays wheel events at the canvas: zoom in for a while, then out.
  let tick = 0;
  const stop = ctx.preview
    ? every(120, () => {
        const canvas = container.querySelector('canvas');
        if (!canvas) return;
        const r = canvas.getBoundingClientRect();
        const zoomIn = Math.floor(tick++ / 14) % 2 === 0;
        canvas.dispatchEvent(new WheelEvent('wheel', {
          deltaY: zoomIn ? -120 : 120,
          clientX: r.left + r.width * 0.35,
          clientY: r.top + r.height * 0.4,
          bubbles: true,
          cancelable: true,
        }));
      })
    : () => {};

  return () => {
    stop();
    release();
  };
};

export default mount;
