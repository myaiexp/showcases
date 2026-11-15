// Vizzu example: feature.coordSystem.toCanvas converts plot-relative points to canvas pixels
import Vizzu, { Events } from 'vizzu';
import type { EventOf } from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';
import { overlay } from '../../shared/overlay.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Move the pointer over the chart: toRelative reads it in plot coordinates.' });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const coords = chart.feature.coordSystem;

  // A marker's draw event carries its box in plot-relative units, and its target already has the
  // centre in canvas pixels. toCanvas turns the first into the second: the dot is drawn at the
  // converted point, and the corner label shows how far it lands from the reported centre.
  const centers: { rel: { x: number; y: number }; px: { x: number; y: number } }[] = [];
  const markerHandler = (event: EventOf<'plot-marker-draw'>): void => {
    if (!event.target || !event.detail.relative) return;
    const { pos, size } = event.detail.rect;
    centers.push({ rel: { x: pos.x + size.x / 2, y: pos.y + size.y / 2 }, px: event.target.position.center });
  };
  const show = overlay(stage.element);
  const completeHandler = (event: EventOf<'draw-complete'>): void => {
    const g = event.renderingContext;
    g.fillStyle = '#facc15';
    let gap = 0;
    for (const c of centers) {
      const p = coords.toCanvas(c.rel);
      gap = Math.max(gap, Math.hypot(p.x - c.px.x, p.y - c.px.y));
      g.beginPath();
      g.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
      g.fill();
    }
    if (centers.length) show(`toCanvas(relative centre) vs marker.position.center\nlargest gap: ${gap.toFixed(2)} px`);
    centers.length = 0;
  };
  chart.on('plot-marker-draw', markerHandler);
  chart.on('draw-complete', completeHandler);

  const pre = stage.side();
  if (pre) {
    chart.on('pointermove', (event: Events.PointerEvent) => {
      const px = event.detail.position;
      const rel = coords.toRelative(px);
      pre.textContent = [
        'pointermove',
        `  canvas pixels   ${px.x.toFixed(0)}, ${px.y.toFixed(0)}`,
        'coordSystem.toRelative',
        `  plot-relative   ${rel.x.toFixed(3)}, ${rel.y.toFixed(3)}`,
        'coordSystem.toCanvas(that)',
        `  canvas pixels   ${coords.toCanvas(rel).x.toFixed(0)}, ${coords.toCanvas(rel).y.toFixed(0)}`,
      ].join('\n');
    });
  }

  await chart.animate({
    data: musicData,
    config: {
      title: 'Yellow dots: relative marker centres through toCanvas',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] } },
    },
  });
  chart.feature.rendering.update();

  stage.story(chart, [
    {
      say: 'Each marker centre, converted by toCanvas, gets a dot at the marker centre',
      run: (c) => c.animate({ config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } }),
    },
    {
      say: 'The dots follow the markers into the new layout',
      run: (c) => c.animate({ config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
