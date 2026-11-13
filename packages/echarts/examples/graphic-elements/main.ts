// Graphic component: text, rect and group elements, draggable shapes and a keyframe loop
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 380 });
  let paused = false;

  chart.setOption({
    // Graphic elements are positioned in pixels (left/top/right/bottom or x/y) on the chart canvas.
    graphic: {
      elements: [
        // A plain text element.
        {
          type: 'text',
          left: 'center',
          top: 14,
          style: { text: 'graphic component', fill: '#eee', font: 'bold 20px sans-serif' },
        },
        { type: 'text', id: 'readout', left: 'center', top: 44, style: { text: ctx.preview ? '' : 'drag the card or the dot', fill: '#999', font: '13px sans-serif' } },
        // A group: children are positioned relative to the group's origin and move together.
        {
          type: 'group',
          id: 'card',
          left: '12%',
          top: '34%',
          draggable: !ctx.preview, // pointer drag moves the whole group
          // Event handlers like ondrag are plain properties on the element.
          ondrag: function (this: { x: number; y: number }) {
            chart.setOption({ graphic: { elements: [{ id: 'readout', style: { text: `card at ${Math.round(this.x)}, ${Math.round(this.y)}` } }] } });
          },
          children: [
            { type: 'rect', shape: { width: 150, height: 70, r: 10 }, style: { fill: '#2f4b7c', stroke: '#8fb4ff', lineWidth: 2 } },
            { type: 'text', left: 'center', top: 'middle', style: { text: 'drag me', fill: '#fff', font: '16px sans-serif' } },
          ],
        },
        // A circle with an id: later setOption calls merge new x/y into it by that id.
        { type: 'circle', id: 'dot', shape: { r: 22 }, x: 200, y: 200, style: { fill: '#ffb74d' }, draggable: !ctx.preview },
        // Polygon, with its own z so it layers over the rest.
        {
          type: 'polygon',
          right: '12%',
          top: '40%',
          shape: { points: [[0, 60], [40, 0], [80, 60]] },
          style: { fill: 'rgba(76,175,80,.5)', stroke: '#4caf50', lineWidth: 2 },
          z: 5,
        },
      ],
    },
  });

  // Elements are matched by id on later setOption calls; changed x/y animate via `transition`.
  const w = (): number => chart.getWidth();
  const frames = [0.2, 0.5, 0.8, 0.5].map((f) => ({ x: Math.max(40, f * w() - 22), y: 160 + f * 60 }));
  let i = 0;
  const move = (): void => {
    if (paused) return;
    const f = frames[i++ % frames.length]!;
    chart.setOption({ graphic: { elements: [{ id: 'dot', x: f.x, y: f.y }] } });
  };
  const timer = window.setInterval(move, ctx.preview ? 1000 : 1400);
  if (bar) {
    button(bar, 'Pause motion', () => { paused = !paused; });
    button(bar, 'Remove polygon', () => chart.setOption({ graphic: { elements: [{ type: 'polygon', $action: 'remove' }] } }));
  }

  return () => {
    window.clearInterval(timer);
    dispose();
  };
};

export default mount;
