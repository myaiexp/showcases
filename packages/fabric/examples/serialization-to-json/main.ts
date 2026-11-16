// canvas.toJSON() printed next to the canvas, updated as objects change
import { Canvas, Circle, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel, pretty } from '../../shared/code-panel.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'canvas.toJSON()'],
    scene: [160, 200],
    hint: 'Drag, scale or rotate an object: the JSON on the right is read from the canvas after every change.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  canvas.backgroundColor = '#fff7d6';

  const rect = new Rect({ left: 60, top: 60, width: 60, height: 40, fill: '#3b7dd8', angle: 15 });
  const dot = new Circle({ left: 100, top: 120, radius: 24, fill: '#e94b3c' });
  canvas.add(rect, dot);

  // toJSON() returns a plain object (JSON.stringify(canvas) calls it too); stringify it to show it.
  const refresh = (): void => {
    const data = canvas.toJSON();
    show(pretty(data, stage.preview));
    say(`${JSON.stringify(data).length} chars, ${canvas.getObjects().length} objects`);
  };
  canvas.on({
    'object:moving': refresh,
    'object:scaling': refresh,
    'object:rotating': refresh,
    'object:modified': refresh,
    'object:added': refresh,
    'object:removed': refresh,
  });
  refresh();

  if (stage.bar) {
    const colours = ['#2e9e5b', '#8e5bd6', '#d99a1c'];
    button(stage.bar, 'add a triangle', () => {
      const n = canvas.getObjects().length;
      canvas.add(new Triangle({ left: 40 + (n % 4) * 30, top: 160 - (n % 3) * 30, width: 36, height: 36, fill: colours[n % 3] }));
    });
    button(stage.bar, 'remove the last', () => {
      const last = canvas.getObjects().at(-1);
      if (last) canvas.remove(last);
    });
  } else {
    stage.loop((_dt, t) => {
      rect.set({ left: 60 + Math.sin(t * 1.5) * 20, angle: 15 + Math.sin(t) * 25 });
      dot.set({ top: 120 + Math.cos(t * 1.2) * 20 });
      rect.setCoords();
      canvas.requestRenderAll();
      refresh();
    });
  }

  return stage.dispose;
};

export default mount;
