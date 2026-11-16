// Advanced: drawing the different bounding boxes of an element
import { Leafer, Rect, Polygon } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, label, sizer } from '../../shared/basics.ts';
import { slider, checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Rotate the rect with the slider; show or hide each box.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  const rect = new Rect({
    x: u(110), y: u(100), width: u(100), height: u(70), around: 'center', rotation: 25, fill: GREEN, draggable: true,
    stroke: '#1a7a45', strokeWidth: 10, shadow: { x: 10, y: 10, blur: 12, color: '#000A' },
  });
  leafer.add(rect);

  // Overlays: dashed boxes, redrawn from the element's bounds every frame.
  const box = (color: string): Rect => {
    const r = new Rect({ stroke: color, strokeWidth: 2, dashPattern: [5, 4], hittable: false });
    leafer.add(r);
    return r;
  };
  const worldBox = box('#FF4B4B'); // worldBoxBounds
  const worldRender = box('#4B7BFF'); // worldRenderBounds
  const corners = new Polygon({ stroke: '#FEB027', strokeWidth: 2, closed: true, hittable: false });
  leafer.add(corners); // getLayoutPoints(): the rotated box's four corners
  const show = { world: true, render: true, corners: true };
  const say = label(stage, '', true);

  stage.loop(() => {
    const b = rect.worldBoxBounds;
    const r = rect.worldRenderBounds;
    worldBox.set({ x: b.x, y: b.y, width: b.width, height: b.height, visible: show.world });
    worldRender.set({ x: r.x, y: r.y, width: r.width, height: r.height, visible: show.render });
    corners.set({ points: rect.getLayoutPoints('box', 'world').flatMap((p) => [p.x, p.y]), visible: show.corners });
    say(`boxBounds ${Math.round(rect.boxBounds.width)} x ${Math.round(rect.boxBounds.height)}   renderBounds ${Math.round(rect.renderBounds.width)} x ${Math.round(rect.renderBounds.height)}`);
  });

  if (stage.preview) stage.loop((_dt, t) => (rect.rotation = 25 + Math.sin(t * 1.5) * 30));
  else {
    slider(stage.bar!, 'rotation', -180, 180, 1, 25, (v) => (rect.rotation = v));
    checkbox(stage.bar!, 'worldBoxBounds (red)', true, (on) => (show.world = on));
    checkbox(stage.bar!, 'worldRenderBounds (blue)', true, (on) => (show.render = on));
    checkbox(stage.bar!, 'getLayoutPoints (yellow)', true, (on) => (show.corners = on));
  }

  return stage.dispose;
};

export default mount;
