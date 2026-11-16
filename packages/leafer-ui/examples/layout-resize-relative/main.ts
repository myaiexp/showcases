// Layout: the coordinate system argument of resizeWidth
import { Group, Leafer, Rect } from 'leafer-ui';
import '@leafer-in/resize'; // the resize plugin
import type { ILocationType } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, pick, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "resizeWidth(w, relative): 'inner' (the default) is the rect's own units, 'world' the screen's. The group around it is scaled 2." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.35;
  const group = new Group({ x: 20, y: 20, scale: 2 });
  const rect = new Rect({ width: S, height: S, fill: '#32cd79' });
  group.add(rect);
  leafer.add(group);
  const guide = new Rect({ x: 20, y: 20, height: 3, fill: '#FF4B4B', hittable: false });
  leafer.add(guide);
  const show = label(stage, '', true);
  let relative: ILocationType = 'inner';
  let w = S * 1.5;
  const redo = (): void => {
    rect.set({ width: S, height: S });
    rect.resizeWidth(w, relative);
    guide.width = w;
    show(`rect.resizeWidth(${Math.round(w)}, '${relative}')\nrect.width ${Math.round(rect.width!)}   on screen ${Math.round(rect.worldBoxBounds.width)} px   (red line: ${Math.round(w)})`);
  };
  pick(stage, 'relative', ['inner', 'local', 'world', 'page'] as const, (v) => ((relative = v), redo()), 2600);
  drive(stage, 'width', [S * 0.6, S * 2.2, 1], w, (v) => ((w = v), redo()), 5);

  return stage.dispose;
};

export default mount;
