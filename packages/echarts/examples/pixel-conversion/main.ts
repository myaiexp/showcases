// convertFromPixel, convertToPixel and containPixel driving a crosshair readout
import type { Mount } from '@/types.ts';
import { createChart, every } from '../../shared/chart.ts';

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx);
  const points = Array.from({ length: 30 }, (_, i) => [i * 3.4, Math.round(40 + 30 * Math.sin(i / 4))]);

  chart.setOption({
    grid: ctx.preview ? { top: 12, bottom: 22, left: 34, right: 12 } : { top: 30, right: 30 },
    xAxis: { type: 'value', min: 0, max: 100 },
    yAxis: { type: 'value', min: 0, max: 100 },
    series: [{ id: 'pts', type: 'scatter', symbolSize: 6, data: points }],
  });

  /** Draws the crosshair and readout for a pixel position on the canvas. */
  const probe = (px: number, py: number): void => {
    // containPixel: is this pixel inside the first grid?
    const inside = chart.containPixel('grid', [px, py]);
    // convertFromPixel: canvas pixels to data values on that grid.
    const [x, y] = chart.convertFromPixel('grid', [px, py]) as number[];
    // convertToPixel: the nearest point's data back to pixels, to ring it.
    const nearest = points.reduce((a, b) => (Math.hypot(b[0]! - x!, b[1]! - y!) < Math.hypot(a[0]! - x!, a[1]! - y!) ? b : a));
    const [nx, ny] = chart.convertToPixel('grid', nearest) as number[];
    chart.setOption({
      graphic: [
        { id: 'h', type: 'line', shape: { x1: 0, y1: py, x2: chart.getWidth(), y2: py }, style: { stroke: '#5b8ff9', lineDash: [4, 4] }, silent: true },
        { id: 'v', type: 'line', shape: { x1: px, y1: 0, x2: px, y2: chart.getHeight() }, style: { stroke: '#5b8ff9', lineDash: [4, 4] }, silent: true },
        { id: 'ring', type: 'circle', x: nx, y: ny, shape: { r: 9 }, style: { fill: 'none', stroke: '#ffd166', lineWidth: 2 }, silent: true },
        {
          id: 'readout',
          type: 'text',
          // Flip to the left of the cursor on the right half so the text stays on canvas.
          x: px > chart.getWidth() / 2 ? px - 8 : px + 8,
          y: py - 22,
          silent: true,
          style: {
            align: px > chart.getWidth() / 2 ? 'right' : 'left',
            text: inside ? `x ${x!.toFixed(1)}  y ${y!.toFixed(1)}` : 'outside the grid',
            fill: inside ? '#e8edf5' : '#ff7875',
            font: ctx.preview ? '11px sans-serif' : '13px sans-serif',
          },
        },
      ],
    });
  };

  if (ctx.preview) {
    // No pointer in a card: sweep a virtual cursor across, out past the grid edge.
    let t = 0;
    const stop = every(60, () => {
      t += 0.03;
      const w = chart.getWidth();
      const h = chart.getHeight();
      probe(w / 2 + (w / 2) * 0.95 * Math.sin(t), h / 2 + (h / 2) * 0.7 * Math.sin(t * 1.7));
    });
    return () => {
      stop();
      dispose();
    };
  }

  // getZr() events fire anywhere on the canvas, not only on chart elements.
  chart.getZr().on('mousemove', (e) => probe(e.offsetX, e.offsetY));
  probe(chart.getWidth() / 2, chart.getHeight() / 2);
  return dispose;
};

export default mount;
