// createLinearGradientControls: edit a linear gradient with handles
import { Canvas, Gradient, Rect } from 'fabric';
import { createLinearGradientControls } from 'fabric/extensions';
import type { Mount } from '@/types.ts';
import { codePanel, pretty } from '../../shared/code-panel.ts';
import { button, select } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['drag the handles', 'gradient.toObject()'],
    scene: [240, 200],
    hint: "The rectangle's controls are replaced by the extension's: the two end handles move the gradient's coords (x1,y1 and x2,y2), the dots between them move each colour stop's offset along that line. The gradient object is edited in place.",
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const canvas = stage.own(new Canvas(pa.el), pa);
  const dump = codePanel(pb, stage.preview);

  const stopsets = {
    '3 stops': [
      { offset: 0, color: '#e94b3c' },
      { offset: 0.5, color: '#ffe9a8' },
      { offset: 1, color: '#3b7dd8' },
    ],
    '2 stops': [
      { offset: 0, color: '#2e9e5b' },
      { offset: 1, color: '#7b3fe4' },
    ],
    '4 stops': [
      { offset: 0, color: '#e94b3c' },
      { offset: 0.33, color: '#d99a1c' },
      { offset: 0.66, color: '#2e9e5b' },
      { offset: 1, color: '#3b7dd8' },
    ],
  } as const;
  type Name = keyof typeof stopsets;

  const rect = new Rect({ left: 120, top: 100, width: 180, height: 110, stroke: '#2b2a33', strokeWidth: 1 });
  canvas.add(rect);

  let gradient: Gradient<'linear'>;
  const show = (): void => {
    const { coords, colorStops } = gradient;
    dump(`coords\n${pretty(coords, stage.preview)}\ncolorStops\n${pretty(colorStops, stage.preview)}`);
  };
  const use = (name: Name): void => {
    // coords are in the rectangle's own pixels, from its top-left corner
    gradient = new Gradient({
      type: 'linear',
      gradientUnits: 'pixels',
      coords: { x1: 20, y1: 20, x2: 160, y2: 90 },
      colorStops: stopsets[name].map((s) => ({ ...s })),
    });
    rect.set('fill', gradient);
    // one handle per end and per stop, so the set is rebuilt when the stops change
    rect.controls = createLinearGradientControls(gradient);
    rect.setCoords();
    canvas.setActiveObject(rect);
    canvas.requestRenderAll();
    show();
  };
  use('3 stops');
  canvas.on('after:render', show);

  if (stage.bar) {
    select(stage.bar, 'colour stops', Object.keys(stopsets) as Name[], use);
    button(stage.bar, 'reset coords', () => {
      gradient.coords = { x1: 20, y1: 20, x2: 160, y2: 90 };
      rect.dirty = true;
      canvas.requestRenderAll();
    });
  } else {
    const g = stage.ghost(canvas);
    stage.repeat(async () => {
      use('3 stops');
      await stage.wait(500);
      const end = controlPoint(rect, 'lgp_2');
      await g.drag(end, { x: end.x - 70, y: end.y + 35 }, 1000);
      await stage.wait(300);
      const mid = controlPoint(rect, 'lgo_1');
      const to = controlPoint(rect, 'lgp_1');
      await g.drag(mid, { x: to.x + 12, y: to.y + 8 }, 900);
      await stage.wait(1000);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
