// Basics: exporting the tree as JSON
import { Leafer, Rect, DragEvent } from 'leafer-ui';
import { exportPanel } from '../../shared/export-view.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, dragToAndFro, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the rect: the JSON follows its x and y.' });
  const u = sizer(stage);
  const half = stage.preview ? 120 : 300; // the canvas on the left, the exported result on the right
  const leafer = stage.own(new Leafer({ view: stage.view, width: half, height: stage.height, fill: '#333' }));
  const panel = exportPanel(stage, half + 4);
  const rect = Rect.one({ fill: GREEN, draggable: true }, (half - u(100)) / 2, u(60), u(100), u(100));
  leafer.add(rect);

  const run = (): void => panel.text(JSON.stringify(leafer.toJSON(), null, stage.preview ? 0 : 2)); // the tree as JSON
  run();
  leafer.on(DragEvent.DRAG, run);

  if (stage.preview) dragToAndFro(stage, leafer, { x: half / 2, y: u(110) }, { x: half / 2 + u(25), y: u(140) });

  return stage.dispose;
};

export default mount;
