// Fluid resize: a browser-window model whose zoom follows canvas width
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout, slider } from '../../shared/controls.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const note = stage.bar ? readout(stage.bar) : null;
  // the canvas gets a CSS width of 100% first, then resize measures it
  stage.fluid();

  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom,
    rotate: { x: -0.2 },
    resize: true,
    onResize(width, height) {
      // the 320 x 240 design scales to whatever box the canvas is now
      this.zoom = Math.min(width / 320, height / 240);
      if (note) note.textContent = `canvas ${width} x ${height}, zoom ${this.zoom.toFixed(2)}`;
    },
  });
  // resize: true adds a window listener that must go
  const resizer = illo as unknown as { setResize(on: boolean): void };
  stage.onDispose(() => resizer.setResize(false));

  // a Group draws in the order added, so the window's parts stay layered while it turns
  const win = new Zdog.Group({ addTo: illo });
  new Zdog.RoundedRect({ addTo: win, width: 220, height: 160, cornerRadius: 10, stroke: 6, fill: true, color: '#26263a' });
  new Zdog.RoundedRect({ addTo: win, width: 220, height: 160, cornerRadius: 10, stroke: 6, color: '#a35ac9' });
  new Zdog.Rect({ addTo: win, width: 208, height: 22, translate: { y: -64 }, stroke: 4, fill: true, color: '#a35ac9' });
  ['#C25', '#EA0', '#2a8a4a'].forEach((color, i) =>
    new Zdog.Shape({ addTo: win, translate: { x: -92 + i * 14, y: -64 }, stroke: 7, color }));
  new Zdog.Shape({ addTo: win, translate: { x: 100, y: -64 }, stroke: 9, color: '#fff' });
  ['#E62', '#EA0', '#2b6cb0'].forEach((color, i) => {
    new Zdog.Rect({ addTo: win, width: 54, height: 64, translate: { x: -64 + i * 64, y: 14 }, stroke: 4, fill: true, color });
    new Zdog.Rect({ addTo: win, width: 36, height: 6, translate: { x: -64 + i * 64, y: 34 }, stroke: 2, fill: true, color: '#fff' });
  });

  // a slider (or, in a card, a timer) squeezes the canvas box, as dragging a window edge would
  const widths = [1, 0.55, 0.8, 0.4];
  const setBox = (f: number): void => {
    stage.element.style.maxWidth = `${Math.round(stage.width * f)}px`;
    resizer.setResize(true); // measure again now, without waiting for a window event
  };
  if (stage.bar) slider(stage.bar, 'box width', 25, 100, 1, 100, (v) => setBox(v / 100), (v) => `${v}%`);
  else {
    let i = 0;
    stage.every(1500, () => setBox(widths[(i = (i + 1) % widths.length)]!));
  }

  stage.loop((_, t) => {
    illo.rotate.y = Math.sin(t * 0.8) * 0.5;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
