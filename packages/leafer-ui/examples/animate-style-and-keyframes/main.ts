// Animate: reading style, fromStyle, toStyle, endingStyle, frames and keyframes
import { Leafer } from 'leafer-ui';
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { readout, track } from '../../shared/animate-kit.ts';

/** { x: 120.4, fill: '#fc0' } as x 120, fill #fc0 */
const show = (style: object | undefined): string =>
  Object.entries(style ?? {}).map(([k, v]) => `${k} ${typeof v === 'number' ? Math.round(v) : v}`).join(', ');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Two keyframes slide and recolour the square. The readout prints the Animate properties each frame.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const t = track(stage, leafer, stage.height * 0.72);
  let animate: Animate | undefined;
  stage.onDispose(() => animate?.destroy());
  const make = (): void => {
    animate?.destroy();
    t.rect.x = t.from;
    animate = new Animate(t.rect, [{ x: (t.from + t.to) / 2, fill: '#ffcd00' }, { x: t.to, fill: '#ff4b4b' }], { duration: 3, join: true });
  };
  make();
  if (stage.bar) button(stage.bar, 'new Animate', make);
  else stage.every(4200, make);

  readout(stage, () => {
    const a = animate;
    if (!a) return '';
    return [
      `style      ${show(a.style)}`,
      `fromStyle  ${show(a.fromStyle)}`,
      `toStyle    ${show(a.toStyle)}`,
      `endingStyle ${show(a.endingStyle)}`,
      `frames ${a.frames.length}   keyframes ${a.keyframes.length}`,
    ].join('\n');
  }, true);
  return stage.dispose;
};

export default mount;
