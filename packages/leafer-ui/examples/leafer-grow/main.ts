// Basics: grow: true makes the canvas fit its content
import { Leafer, Rect, ResizeEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro, GREEN, label, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the square out: the dark canvas grows to hug its content (the pane clips it).' });
  const u = sizer(stage);
  const show = label(stage, '', true);

  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      grow: true, // the canvas size follows the content
      fill: '#333',
    }),
  );
  const rect = Rect.one({ fill: GREEN, draggable: true }, u(100), u(60), u(100), u(100));
  leafer.add(rect);
  const report = (): void => show(`canvas ${Math.round(leafer.width ?? 0)} × ${Math.round(leafer.height ?? 0)}`);
  leafer.on(ResizeEvent.RESIZE, report);
  report();

  // Dragging the rect out makes the canvas grow to fit it.
  if (stage.preview) dragToAndFro(stage, leafer, { x: u(150), y: u(110) }, { x: u(250), y: u(150) });
  return stage.dispose;
};

export default mount;
