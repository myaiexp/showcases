// App & Engine: a live thumbnail drawn from leafer.canvas.view
import { Leafer, Rect, RenderEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, dragToAndFro, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the squares: the thumbnail redraws after each render.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(30), u(30), u(90), u(90)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(160), u(90), u(70), u(70)));

  // A small canvas in the corner of the pane
  const overview = document.createElement('canvas');
  overview.width = 96;
  overview.height = 72;
  overview.style.cssText = 'position:absolute;right:6px;bottom:6px;z-index:4;pointer-events:none;border:1px solid #888;background:#333';
  stage.view.append(overview);
  const context = overview.getContext('2d')!;

  leafer.on(RenderEvent.END, () => {
    const canvas = leafer.canvas.view as HTMLCanvasElement; // the real canvas
    context.clearRect(0, 0, overview.width, overview.height);
    context.drawImage(canvas, 0, 0, overview.width, overview.height);
  });

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(75), y: u(75) }, { x: u(120), y: u(130) });

  return stage.dispose;
};

export default mount;
