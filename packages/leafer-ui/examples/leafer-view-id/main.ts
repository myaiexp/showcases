// Basics: view can be an id string, written without the # sign
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro, GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the green square. The engine found its div by id.' });
  const u = sizer(stage);

  // Several previews can be on the page: give the div a unique id.
  const id = `leafer-view-${Math.random().toString(36).slice(2, 8)}`;
  const div = document.createElement('div');
  div.setAttribute('id', id);
  stage.view.appendChild(div);

  const leafer = stage.own(
    new Leafer({
      view: id, // an id string, no # needed
      width: stage.preview ? 240 : 600,
      height: stage.preview ? 160 : 300,
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(100), u(60), u(100), u(100)));

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(150), y: u(110) }, { x: u(300), y: u(80) });
  return stage.dispose;
};

export default mount;
