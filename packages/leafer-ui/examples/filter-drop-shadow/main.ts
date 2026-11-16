// Filter: CSS drop-shadow() as a custom filter with a matching spread
import { Leafer, Star, Filter } from 'leafer-ui';
import '@leafer-in/filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

Filter.register('dropShadowFx', {
  apply(filter, _ui, worldBounds, currentCanvas) {
    currentCanvas.filter = `drop-shadow(${filter.dx}px ${filter.dx}px ${filter.blur}px ${filter.color})`;
    currentCanvas.resetTransform();
    currentCanvas.copyWorld(currentCanvas, worldBounds, worldBounds, 'copy');
    currentCanvas.filter = 'none';
  },
  getSpread: (filter) => Math.abs(filter.dx) + filter.blur,
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the offset and the blur of the shadow.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const star = new Star({ ...mid(stage, S), width: S, height: S, corners: 5, innerRadius: 0.45, fill: '#ffcd00' });
  leafer.add(star);

  let dx = 14;
  let blur = 6;
  const apply = (): void => void (star.filter = { type: 'dropShadowFx', dx, blur, color: 'rgba(0,0,0,0.55)' });
  apply();
  if (stage.bar) {
    slider(stage.bar, 'offset', 0, 40, 1, dx, (v) => ((dx = v), apply()));
    slider(stage.bar, 'blur', 0, 30, 1, blur, (v) => ((blur = v), apply()));
  } else {
    stage.loop((_dt, t) => {
      dx = 6 + 12 * (0.5 + 0.5 * Math.sin(t * 1.6));
      blur = 4 + 6 * (0.5 + 0.5 * Math.cos(t * 1.1));
      apply();
    });
  }

  return stage.dispose;
};

export default mount;
