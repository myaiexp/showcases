// Basics: an inner shadow on a rounded Rect
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the inner shadow with the sliders.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(100),
    y: u(50),
    width: u(100),
    height: u(100),
    cornerRadius: 30,
    fill: GREEN,
    innerShadow: { x: 10, y: 5, blur: 20, color: '#FF0000AA' },
  });
  leafer.add(rect);

  const shadow = { x: 10, y: 5, blur: 20, color: '#FF0000AA' };
  const apply = (): void => {
    rect.innerShadow = { ...shadow };
  };
  if (stage.preview) {
    stage.loop((_dt, t) => {
      shadow.x = Math.cos(t * 2) * 14;
      shadow.y = Math.sin(t * 2) * 14;
      apply();
    });
  } else {
    slider(stage.bar!, 'x', -40, 40, 1, shadow.x, (v) => ((shadow.x = v), apply()));
    slider(stage.bar!, 'y', -40, 40, 1, shadow.y, (v) => ((shadow.y = v), apply()));
    slider(stage.bar!, 'blur', 0, 60, 1, shadow.blur, (v) => ((shadow.blur = v), apply()));
  }

  return stage.dispose;
};

export default mount;
