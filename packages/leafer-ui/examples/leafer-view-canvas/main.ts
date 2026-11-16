// Basics: view can be a canvas element; the Leafer draws straight into it
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro, GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the green square. The Leafer owns the canvas element it was given.' });
  const u = sizer(stage);

  const canvas = document.createElement('canvas');
  stage.view.appendChild(canvas); // the docs append it to document.body

  const leafer = stage.own(
    new Leafer({
      view: canvas, // view parameter accepts a canvas element
      width: stage.preview ? 240 : 600, // not 0, or the Leafer switches to auto layout
      height: stage.preview ? 160 : 300,
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(100), u(60), u(100), u(100)));

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(150), y: u(110) }, { x: u(300), y: u(80) });
  return stage.dispose;
};

export default mount;
