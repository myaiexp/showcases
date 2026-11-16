// Basics: rotating around origin: "center"
import { Leafer, Rect, Frame } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';
import { slider, select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick another origin and the rect pivots about it.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(25),
    y: u(25),
    width: u(50),
    height: u(50),
    origin: 'center',
    rotation: 45,
    draggable: true,
    fill: '#4DCB71',
  });
  leafer.add(new Frame({ x: u(100), y: u(50), width: u(100), height: u(100), fill: '#FF4A2C', children: [rect] }));

  if (stage.preview) stage.loop((_dt, t) => (rect.rotation = 45 + Math.sin(t * 2) * 45));
  else {
    select(stage.bar!, 'origin', ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'], (v) => (rect.origin = v), 'center');
    slider(stage.bar!, 'rotation', -180, 180, 1, 45, (v) => (rect.rotation = v));
  }

  return stage.dispose;
};

export default mount;
