// A motion value's events: change, animationStart, animationComplete and animationCancel, plus isAnimating, stop and destroy
import { animate, delay, motionValue, scopeMotion, styleEffect } from 'motion';
import type { MotionValue } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="rig${preview ? '' : ' big'}">
      <div class="track"><div class="ball"></div></div>
      <div class="state"></div>
      <ul class="log"></ul>
    </div>`;
  const rig = el.querySelector<HTMLElement>('.rig')!;
  const track = el.querySelector<HTMLElement>('.track')!;
  const state = el.querySelector<HTMLElement>('.state')!;
  const log = el.querySelector<HTMLElement>('.log')!;
  const lines = preview ? 5 : 8;
  let x: MotionValue<number>;
  let changes = 0;
  let changeLine: HTMLElement | undefined;
  let teardown: VoidFunction[] = [];
  let p: ReturnType<typeof panel> | undefined;
  let right = false;

  const write = (kind: string, text: string): void => {
    const li = document.createElement('li');
    li.className = kind;
    li.textContent = text;
    log.append(li);
    while (log.children.length > lines) log.firstElementChild!.remove();
    changeLine = undefined;
    changes = 0;
  };

  const scope = scopeMotion(el, ({ bind }) => {
    // isAnimating() is still true inside the complete/cancel handlers, so read it a tick later.
    const refresh = (): void => {
      delay(() => { state.textContent = `isAnimating() ${x.isAnimating()}`; }, 0.05);
    };
    const build = (): void => {
      teardown.forEach((t) => t());
      rig.classList.remove('dead');
      right = false;
      x = motionValue(0);
      teardown = [
        styleEffect(el.querySelector<HTMLElement>('.ball')!, { x }),
        x.on('change', (v) => {
          // change fires every frame, so one line counts them instead of flooding the log
          changes++;
          if (!changeLine || !changeLine.isConnected) {
            changeLine = document.createElement('li');
            changeLine.className = 'change';
            log.append(changeLine);
            while (log.children.length > lines) log.firstElementChild!.remove();
          }
          changeLine.textContent = `change x${changes}  latest ${v.toFixed(0)}`;
          state.textContent = `isAnimating() ${x.isAnimating()}`;
        }),
        x.on('animationStart', () => write('animationStart', 'animationStart')),
        x.on('animationComplete', () => { write('animationComplete', 'animationComplete'); refresh(); }),
        x.on('animationCancel', () => { write('animationCancel', 'animationCancel'); refresh(); }),
      ];
      state.textContent = 'isAnimating() false';
      log.replaceChildren();
    };
    build();
    const travel = (): number => track.clientWidth - 28;
    const move = bind((): void => {
      right = !right;
      animate(x, right ? travel() : 0, { duration: preview ? 1.1 : 1.8, ease: 'easeInOut' });
    });
    const destroy = (): void => {
      x.destroy();
      rig.classList.add('dead');
      write('note', 'destroy(): listeners gone');
    };
    if (preview) {
      let n = 0;
      const loop = (): void => {
        move();
        if (n++ % 3 === 1) delay(() => x.stop(), 0.4); // stop mid-way every third time: animationCancel
        delay(loop, 1.6);
      };
      delay(loop, 0.4);
    } else {
      hint(el, 'Move the ball, then press Move again mid-flight (the first animation is cancelled), or Stop. After Destroy, subscribers are removed: the ball no longer follows and nothing is logged until Rebuild.');
      p = panel(el);
      p.button('Move', move);
      p.button('Stop', () => x.stop());
      p.button('Destroy', destroy);
      p.button('Rebuild', () => scope.run(build));
    }
  });
  return () => { scope.cancel(); teardown.forEach((t) => t()); p?.dispose(); };
};

export default mount;
