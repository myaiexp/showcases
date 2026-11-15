// Vizzu example: feature.htmlCanvas gives the canvas element and converts client to canvas coordinates
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';
import { musicData } from '../../shared/music.ts';
import { overlay } from '../../shared/overlay.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Move the pointer over the chart: a cross follows it, placed with clientToCanvas.' });
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;
  const canvas = chart.feature.htmlCanvas;
  const show = overlay(stage.element);
  const pre = stage.side();

  const describe = (): string => {
    const c = canvas.element;
    const css = c.getBoundingClientRect();
    return `canvas element  ${c.width} x ${c.height} px\non the page      ${css.width.toFixed(0)} x ${css.height.toFixed(0)} px\ndevicePixelRatio ${window.devicePixelRatio}`;
  };

  // The pointer, in client coordinates, converted with clientToCanvas; draw-complete paints a cross there.
  let cross: { x: number; y: number } | null = null;
  chart.on('draw-complete', (event) => {
    if (!cross) return;
    const g = event.renderingContext;
    g.strokeStyle = '#facc15';
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(cross.x - 10, cross.y);
    g.lineTo(cross.x + 10, cross.y);
    g.moveTo(cross.x, cross.y - 10);
    g.lineTo(cross.x, cross.y + 10);
    g.stroke();
  });
  if (!stage.preview) {
    canvas.element.addEventListener(
      'pointermove',
      (e: PointerEvent) => {
        cross = canvas.clientToCanvas({ x: e.clientX, y: e.clientY });
        const back = canvas.canvasToClient(cross);
        if (pre) {
          pre.textContent = `${describe()}\n\nclientToCanvas\n  client  ${e.clientX.toFixed(0)}, ${e.clientY.toFixed(0)}\n  canvas  ${cross.x.toFixed(0)}, ${cross.y.toFixed(0)}\ncanvasToClient\n  client  ${back.x.toFixed(0)}, ${back.y.toFixed(0)}`;
        }
        chart.feature.rendering.update();
      },
      { signal: stage.signal },
    );
  }

  await chart.animate({
    data: musicData,
    config: {
      title: 'The canvas behind the chart',
      channels: { y: { set: ['Popularity', 'Kinds'] }, x: { set: ['Genres'] }, color: { set: ['Kinds'] }, label: { set: ['Popularity'] } },
    },
  });
  if (pre) pre.textContent = describe();
  if (stage.preview) show(describe());

  stage.story(chart, [
    {
      say: 'feature.htmlCanvas.element is the canvas the chart draws on',
      run: (c) => c.animate({ config: { channels: { x: { attach: ['Kinds'] }, y: { detach: ['Kinds'] } } } }),
    },
    {
      say: 'Its width and height are in device pixels, the page size in CSS pixels',
      run: (c) => c.animate({ config: { channels: { x: { detach: ['Kinds'] }, y: { attach: ['Kinds'] } } } }),
    },
  ]);
  return () => stage.dispose();
};

export default mount;
