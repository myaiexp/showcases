// Basics: changing an object-valued style
import { Leafer, Rect } from 'leafer-ui';
import { arrows, photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click "rect.fill.url = ..." (nothing changes) and "rect.fill = { ... }" (the picture swaps).' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(60),
    y: u(30),
    width: u(160),
    height: u(120),
    fill: { type: 'image', url: photo() },
  });
  leafer.add(rect);

  // Elements only detect first-level setters: assign a new object to fill.
  let flip = false;
  const swap = (): void => {
    flip = !flip;
    rect.fill = { type: 'image', url: flip ? arrows() : photo() };
  };
  if (stage.preview) stage.every(1500, swap);
  else {
    button(stage.bar!, 'rect.fill.url = ... (no redraw)', () => {
      flip = !flip;
      (rect.fill as { url: string }).url = flip ? arrows() : photo(); // single nested change is not detected
    });
    button(stage.bar!, 'rect.fill = { ... } (redraws)', swap);
  }

  return stage.dispose;
};

export default mount;
