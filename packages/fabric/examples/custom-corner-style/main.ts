// Customization: transparentCorners, cornerColor, cornerStrokeColor, cornerSize, cornerStyle on one object
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, color, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

type Style = 'rect' | 'circle';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The red rectangle is selected with custom corners. Click the blue circle to compare with fabric\'s defaults.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 120, top: 120, width: 120, height: 90, fill: '#e94b3c' });
  const circle = new Circle({ left: 270, top: 120, radius: 38, fill: '#3b7dd8' });
  canvas.add(rect, circle);

  // The guide's example: filled blue circle corners with a red outline, 12 px.
  rect.set({
    transparentCorners: false,
    cornerColor: 'blue',
    cornerStrokeColor: 'red',
    cornerSize: 12,
    cornerStyle: 'circle',
  });
  canvas.setActiveObject(rect);

  const show = (): void => {
    if (stage.preview) say(`transparent ${rect.transparentCorners} · size ${rect.cornerSize} · '${rect.cornerStyle}'`);
    else say(
      `transparentCorners ${rect.transparentCorners} · cornerColor ${rect.cornerColor} · cornerStrokeColor ${rect.cornerStrokeColor}\ncornerSize ${rect.cornerSize} · cornerStyle '${rect.cornerStyle}'`,
    );
    canvas.requestRenderAll();
  };
  show();

  if (stage.bar) {
    checkbox(stage.bar, 'transparentCorners', false, (v) => (rect.set('transparentCorners', v), show()));
    color(stage.bar, 'cornerColor', '#0000ff', (v) => (rect.set('cornerColor', v), show()));
    color(stage.bar, 'cornerStrokeColor', '#ff0000', (v) => (rect.set('cornerStrokeColor', v), show()));
    slider(stage.bar, 'cornerSize', 4, 30, 1, 12, (v) => (rect.set('cornerSize', v), show()));
    select(stage.bar, 'cornerStyle', ['circle', 'rect'] as const, (v: Style) => (rect.set('cornerStyle', v), show()), 'circle');
  } else {
    const looks = [
      { transparentCorners: false, cornerColor: '#0000ff', cornerStrokeColor: '#ff0000', cornerSize: 12, cornerStyle: 'circle' as Style },
      { transparentCorners: true, cornerColor: '#2e9e5b', cornerStrokeColor: '#ff0000', cornerSize: 18, cornerStyle: 'rect' as Style },
      { transparentCorners: false, cornerColor: '#f2b134', cornerStrokeColor: '#222222', cornerSize: 8, cornerStyle: 'rect' as Style },
    ];
    let n = 0;
    stage.every(1500, () => {
      rect.set(looks[++n % looks.length]!);
      show();
    });
  }

  return stage.dispose;
};

export default mount;
