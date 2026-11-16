// UI: rotateOf turns around a point
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick an origin and press rotate 30.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.6;
  const home = { x: stage.width / 2 - S / 2, y: stage.height / 2 - S / 2 - 8, rotation: 0 };
  const rect = new Rect({ ...home, width: S, height: S, fill: '#FEB027', cornerRadius: 10 });
  leafer.add(rect);
  const note = caption(stage, leafer);
  const origins = ['top-left', 'center', 'bottom-right', 'left'] as const;
  let origin: (typeof origins)[number] = 'top-left';
  let n = 0;
  const go = (): void => {
    if (n++ % 6 === 5) rect.set(home); // start over: a corner origin swings the rect off the pane
    rect.rotateOf(origin, 30);
    note.text = `rotateOf('${origin}', 30): rotation ${Math.round(rect.rotation!)}`;
  };
  pick(stage, 'origin', origins, (o) => ((origin = o), rect.set(home)), 5600);
  if (stage.bar) button(stage.bar, 'rotate 30', go);
  else stage.every(900, go);

  return stage.dispose;
};

export default mount;
