// Vizzu example: a plot-marker-draw handler draws its own shape for every marker and cancels the default
import Vizzu from 'vizzu';
import type { EventOf } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  // The palette is set on the chart too, so the legend matches what the handler paints.
  const colors: Record<string, string> = { Hard: '#f97316', Smooth: '#38bdf8', Experimental: '#a3e635' };
  await chart.animate({
    data: musicData,
    config: {
      title: 'Markers as drawn by default',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] } },
    },
    style: { plot: { marker: { colorPalette: Object.values(colors).join(' ') } } },
  });

  // detail.rect is the marker's bounding box. While markers are laid out on the plot, detail.relative
  // is true and the box is in plot-relative units (y up), so coordSystem.toCanvas makes pixels of it.
  const markerDrawHandler = (event: EventOf<'plot-marker-draw'>): void => {
    const g = event.renderingContext;
    const { pos, size } = event.detail.rect;
    const toPixels = (p: { x: number; y: number }): { x: number; y: number } =>
      event.detail.relative ? chart.feature.coordSystem.toCanvas(p) : p;
    const a = toPixels(pos);
    const b = toPixels({ x: pos.x + size.x, y: pos.y + size.y });
    const x = Math.min(a.x, b.x);
    const y = Math.min(a.y, b.y);
    const w = Math.abs(b.x - a.x);
    const h = Math.abs(b.y - a.y);
    g.fillStyle = colors[String(event.target?.categories['Kinds'])] ?? '#999999';
    g.strokeStyle = '#131316';
    g.lineWidth = 2;
    g.beginPath();
    g.roundRect(x + 2, y + 2, Math.max(w - 4, 0), Math.max(h - 4, 0), Math.min(w, h) / 2);
    g.fill();
    g.stroke();
    event.preventDefault();
  };

  stage.story(chart, [
    {
      say: 'plot-marker-draw: each column is a capsule the handler draws',
      run: (c) => {
        c.on('plot-marker-draw', markerDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Markers drawn by a handler' } });
      },
    },
    {
      say: 'Regrouping animates the markers; the handler draws every frame',
      run: (c) => c.animate({ config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } }),
    },
    {
      say: 'chart.off: the default markers return',
      run: (c) => {
        c.off('plot-marker-draw', markerDrawHandler);
        c.feature.rendering.update();
        return c.animate({ config: { title: 'Default markers again' } });
      },
    },
  ]);
  return () => stage.dispose();
};

export default mount;
