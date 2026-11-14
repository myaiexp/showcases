// autoplay off, the clock pinned with setTime and drawn with render()
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the time slider: each position is one exact frame.' });
  const title = headline('Scrub');
  stage.root.append(title);
  // No animation loop: nothing is drawn until render() is called.
  const vfx = stage.own(new VFX({ ...stage.vfxOpts, autoplay: false }));
  await vfx.add(title, { shader: 'rainbow' });

  const frameAt = (t: number): void => {
    vfx.setTime(t); // pin the clock: the `time` uniform is exactly t
    vfx.render(); // draw one frame
    stage.say(`vfx.setTime(${t.toFixed(2)}); vfx.render()`);
  };
  if (stage.bar) {
    slider(stage.bar, 'time', 0, 3, 0.01, 0, frameAt, (v) => `${v.toFixed(2)} s`);
  } else {
    // A card steps through four fixed times, one still frame each.
    stage.cycle([0, 0.25, 0.5, 0.75], 900, frameAt);
  }
  frameAt(0);
  // The stage's canvas moves with the page; draw again after a scroll so the frame follows.
  const redraw = (): void => vfx.render();
  window.addEventListener('scroll', redraw, { passive: true });
  stage.onDispose(() => window.removeEventListener('scroll', redraw));
  return () => stage.dispose();
};

export default mount;
