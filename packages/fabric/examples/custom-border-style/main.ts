// borderColor, borderScaleFactor and borderDashArray change the selection frame
import { Canvas, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { color, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const DASHES: Record<string, number[] | null> = { solid: null, '3 3': [3, 3], '8 4': [8, 4], '2 6 12': [2, 6, 12] };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Select either shape (click, or drag a box around it) and change the frame. Only the selected rectangle carries the options.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 120, top: 120, width: 120, height: 90, fill: '#f2b134', hasControls: false });
  const tri = new Triangle({ left: 270, top: 120, width: 80, height: 80, fill: '#2e9e5b', hasControls: false });
  canvas.add(rect, tri);
  canvas.setActiveObject(rect);
  rect.set({ borderColor: '#c0392b', borderScaleFactor: 3, borderDashArray: [8, 4] });

  const show = (): void => {
    if (stage.preview) say(`factor ${rect.borderScaleFactor} · dash ${JSON.stringify(rect.borderDashArray)}`);
    else say(`borderColor ${rect.borderColor} · borderScaleFactor ${rect.borderScaleFactor} · borderDashArray ${JSON.stringify(rect.borderDashArray)}`);
    canvas.requestRenderAll();
  };
  show();

  if (stage.bar) {
    color(stage.bar, 'borderColor', '#c0392b', (v) => (rect.set('borderColor', v), show()));
    slider(stage.bar, 'borderScaleFactor', 1, 8, 0.5, 3, (v) => (rect.set('borderScaleFactor', v), show()));
    select(stage.bar, 'borderDashArray', Object.keys(DASHES), (v) => (rect.set('borderDashArray', DASHES[v] ?? null), show()), '8 4');
  } else {
    const looks = [
      { borderColor: '#c0392b', borderScaleFactor: 3, borderDashArray: [8, 4] },
      { borderColor: '#2980b9', borderScaleFactor: 1, borderDashArray: null },
      { borderColor: '#8e44ad', borderScaleFactor: 5, borderDashArray: [2, 6, 12] },
    ];
    let n = 0;
    stage.every(1400, () => {
      rect.set(looks[++n % looks.length]!);
      show();
    });
  }

  return stage.dispose;
};

export default mount;
