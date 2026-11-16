// Basics: hiding an element with visible
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle the rect with the checkbox.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({ x: u(100), y: u(50), width: u(120), height: u(120), fill: GREEN });
  leafer.add(rect);

  if (stage.preview) stage.every(900, () => (rect.visible = !rect.visible));
  else checkbox(stage.bar!, 'visible', true, (on) => (rect.visible = on));

  return stage.dispose;
};

export default mount;
