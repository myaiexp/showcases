// Zoom and pan: fit an object or the whole content in view by animating the viewportTransform
import { Canvas, util, type FabricObject, type TMat2D } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, WORLD_H, WORLD_W } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Click a shape and press "Fit selection": zoom and pan are animated so that its bounding box fills the view. "Fit all" frames every shape.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const world = buildWorld();
  canvas.add(...world);
  const shapes = world.filter((o) => o.selectable);
  const say = status(stage);

  const w = stage.width;
  const h = stage.height;
  const overview: TMat2D = [Math.min(w / WORLD_W, h / WORLD_H), 0, 0, Math.min(w / WORLD_W, h / WORLD_H), 0, 0];
  canvas.setViewportTransform(overview);

  const show = (what: string): void => say(`${what} · zoom ${canvas.getZoom().toFixed(2)}`);
  show('overview');

  // The viewportTransform that frames `objects` with a margin around them.
  const frame = (objects: FabricObject[], margin = 0.12): TMat2D => {
    const box = util.makeBoundingBoxFromPoints(objects.flatMap((o) => o.getCoords()));
    const z = Math.min(w / (box.width * (1 + margin * 2)), h / (box.height * (1 + margin * 2)));
    return [z, 0, 0, z, w / 2 - (box.left + box.width / 2) * z, h / 2 - (box.top + box.height / 2) * z];
  };
  // util.animate tweens the six numbers together; `target` lets canvas.dispose() abort it.
  const goTo = (end: TMat2D, what: string): void => {
    util.animate({
      startValue: [...canvas.viewportTransform],
      endValue: [...end],
      duration: 700,
      easing: util.ease.easeInOutCubic,
      target: canvas,
      onChange: (v) => {
        canvas.setViewportTransform(v as TMat2D);
        show(what);
      },
    });
  };

  if (stage.bar) {
    button(stage.bar, 'Fit selection', () => {
      const picked = canvas.getActiveObjects();
      if (picked.length) goTo(frame(picked), 'fit selection');
      else show('select a shape first');
    });
    button(stage.bar, 'Fit all shapes', () => goTo(frame(shapes), 'fit all'));
    button(stage.bar, 'Overview', () => goTo(overview, 'overview'));
  } else {
    const steps: [string, () => TMat2D][] = [
      ['fit shape 3', () => frame([shapes[3]!])],
      ['fit shape 9', () => frame([shapes[9]!])],
      ['fit 2 shapes', () => frame([shapes[1]!, shapes[5]!])],
      ['overview', () => overview],
    ];
    let n = 0;
    stage.every(1500, () => {
      const [what, end] = steps[n++ % steps.length]!;
      goTo(end(), what);
    });
  }

  return stage.dispose;
};

export default mount;
