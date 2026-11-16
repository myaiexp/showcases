// An inverted circle and a rectangle: nested, or util.mergeClipPaths
import { Canvas, Circle, FabricImage, Rect, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const MODES = ['inverted circle only', 'normal rect only', 'mergeClipPaths(circle, rect)', 'inverted circle, clipped by rect'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'mergeClipPaths turns an inverted and a normal clip into one: the rectangle with the circle cut out.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const img = new FabricImage(picture('portrait', 300, 200), { left: 150, top: 100, selectable: false });
  canvas.add(img);

  const apply = (mode: Mode): void => {
    // fresh shapes each time: merging moves them into each other's planes
    const hole = new Circle({ radius: 55, left: 20, top: 0, inverted: true });
    const frame = new Rect({ width: 150, height: 100, left: 0, top: 0 });
    let clip: FabricObject;
    if (mode === MODES[0]) clip = hole;
    else if (mode === MODES[1]) clip = frame;
    else if (mode === MODES[2]) clip = util.mergeClipPaths(hole, frame);
    else {
      // the circle is clipped by the rectangle first, then its inverted flag cuts that shape out
      hole.clipPath = frame;
      clip = hole;
    }
    img.clipPath = clip;
    img.set('dirty', true);
    say(mode);
    canvas.requestRenderAll();
  };
  apply(MODES[2]);

  if (stage.bar) select(stage.bar, 'clip', MODES, apply, MODES[2]);
  else {
    let i = 2;
    stage.every(1500, () => apply(MODES[++i % MODES.length]!));
  }
  return stage.dispose;
};

export default mount;
