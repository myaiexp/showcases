// Two playheads animated by animate(): seeking one with set() and the other with jump()
import { animate, cancelFrame, delay, frame, mapValue, motionValue, scopeMotion, styleEffect } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const MODES = ['set', 'jump'] as const;

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `<div class="rows${preview ? '' : ' big'}">${MODES.map((m) => `
    <div data-mode="${m}"><div class="name">${m}()</div><div class="track"><div class="head"></div></div><div class="read"></div></div>`).join('')}</div>`;
  const values = { set: motionValue(0), jump: motionValue(0) };
  const cancels: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, ({ bind }) => {
    const play = (): void => {
      for (const m of MODES) {
        values[m].jump(0); // animating to the value it already holds would be skipped
        animate(values[m], 1, { duration: 8, ease: 'linear' });
      }
    };
    for (const m of MODES) {
      const row = el.querySelector<HTMLElement>(`[data-mode="${m}"]`)!;
      // A complex string output: percentages for the playhead's left edge.
      cancels.push(styleEffect(row.querySelector('.head')!, { left: mapValue(values[m], [0, 1], ['0%', '100%']) }));
    }
    const readout = (): void => {
      for (const m of MODES) {
        const v = values[m];
        el.querySelector(`[data-mode="${m}"] .read`)!.textContent = `isAnimating ${String(v.isAnimating()).padEnd(5)}  velocity ${v.getVelocity().toFixed(2)}`;
      }
    };
    frame.update(readout, true);
    cancels.push(() => cancelFrame(readout));

    const seek = bind((to: number): void => {
      values.set.set(to);
      values.jump.jump(to);
    });
    play();
    if (preview) {
      const targets = [0.8, 0.2];
      let n = 0;
      const loop = (): void => {
        seek(targets[n++ % 2]!);
        delay(loop, 2.5);
      };
      delay(loop, 1.5);
    } else {
      hint(el, 'Play, then seek. the running animation outranks set(), so the seek gets overwritten on the next frame and playback carries on; jump() cancels the animation, so the playhead stays where you put it with zero velocity.');
      p = panel(el);
      p.button('Play both', bind(play));
      p.button('Seek to 80%', () => seek(0.8));
      p.button('Seek to 20%', () => seek(0.2));
    }
  });
  return () => { scope.cancel(); cancels.forEach((c) => c()); p?.dispose(); };
};

export default mount;
