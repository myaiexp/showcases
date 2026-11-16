// Editor: a Frame as a transparent-grid canvas
import { App, Frame, Platform } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { fakeWheel } from '../../shared/basics.ts';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Zoom with Ctrl and the wheel: the grid squares keep their screen size; click a rect to edit it." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, fill: '#333', editor: {} }));
  // tiled transparent squares
  const svg = Platform.toURL(
    '<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="0" y="0" width="5" height="5" fill="#FFF"/><rect x="5" y="0" width="5" height="5" fill="#CCC"/>' +
      '<rect x="0" y="5" width="5" height="5" fill="#CCC"/><rect x="5" y="5" width="5" height="5" fill="#FFF"/></svg>',
    'svg',
  );
  const k = stage.preview ? 0.5 : 1;
  const [rect1, rect2] = pair(g);
  rect1.set({ x: 20 * k + 10, y: 40 * k + 10 });
  rect2.set({ x: 20 * k + 10 + 40, y: 40 * k + 10 + 30 });
  const frame = Frame.one(
    {
      fill: { type: 'image', url: svg, mode: 'repeat', scaleFixed: 'zoom-in' }, // keep the tile size when zooming in
      shadow: { x: 0, y: 3, blur: 15, color: '#0009', scaleFixed: 'zoom-in' }, // and the shadow size
      children: [rect1, rect2],
    },
    Math.round((stage.width - (stage.preview ? 160 : 400)) / 2),
    stage.preview ? 22 : 30,
    stage.preview ? 160 : 400,
    stage.preview ? 150 : 340,
  );
  app.tree.add(frame);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await stage.wait(700);
      await ghost.tap(spot(rect1).x, spot(rect1).y);
      await stage.wait(900);
      for (let i = 0; i < 2; i++) {
        fakeWheel(app, { x: 130, y: 100, deltaY: -15, ctrlKey: true });
        await stage.wait(110);
      }
      await stage.wait(1100);
      for (let i = 0; i < 2; i++) {
        fakeWheel(app, { x: 130, y: 100, deltaY: 15, ctrlKey: true });
        await stage.wait(110);
      }
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
