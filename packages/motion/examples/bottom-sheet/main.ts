// A bottom sheet you drag down to dismiss: constraints at rest, then an offset-or-velocity test on release
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="scene${preview ? '' : ' big'}">
      <div class="map"></div>
      <button class="reopen" type="button">Show sheet</button>
      <div class="sheet"><i class="grab"></i><b>Coffee Lab</b><span>Open until 18:00 · 4 min walk</span><div class="row"><u>Directions</u><u>Call</u></div></div>
    </div>`;
  const scene = el.querySelector<HTMLElement>('.scene')!;
  const sheet = el.querySelector<HTMLElement>('.sheet')!;
  const reopen = el.querySelector<HTMLElement>('.reopen')!;
  let distance = 60;
  let hidden = false;

  const scope = scopeMotion(el, ({ bind }) => {
    animate(reopen, { opacity: 0 }, { duration: 0 });
    // Sliding down is only allowed: top and bottom are both 0 at rest, elastic.top keeps the pull-up tiny.
    drag(sheet, {
      axis: 'y',
      constraints: { top: 0, bottom: 0 },
      elastic: { top: 0.1, bottom: 0.9 },
      onEnd: bind((_e, info) => {
        if (info.offset.y > distance || info.velocity.y > 800) close();
        else animate(sheet, { y: 0 }, { type: 'spring', bounce: 0.3, visualDuration: 0.35 });
      }),
    });
  });
  const close = (): void => {
    hidden = true;
    scope.run(() => {
      animate(sheet, { y: scene.clientHeight }, { duration: 0.3, ease: 'easeIn' });
      animate(reopen, { opacity: 1 }, { duration: 0.2, delay: 0.2 });
    });
  };
  const open = (): void => {
    hidden = false;
    scope.run(() => {
      animate(reopen, { opacity: 0 }, { duration: 0.1 });
      animate(sheet, { y: 0 }, { type: 'spring', bounce: 0.25, visualDuration: 0.45 });
    });
  };
  reopen.addEventListener('click', open);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Drag the sheet down. Past the distance, or flicked fast, it closes; a short pull springs back. The button brings it back.');
    p = panel(el);
    p.slider('dismiss distance (px)', { min: 20, max: 160, step: 5, value: 60 }, (v) => (distance = v));
  } else {
    // Short pull: springs back. Long pull: closes. Then it reopens by itself.
    let long = false;
    loopGesture(el, signal, async (g) => {
      const from = at(el, sheet, 0.5, 0.1);
      await g.drag(sheet, from, { x: from.x, y: from.y + (long ? 90 : 25) }, 0.5);
      await g.wait(long ? 1.1 : 0.4);
      if (hidden) open();
      long = !long;
    }, 0.6);
  }

  return () => {
    reopen.removeEventListener('click', open);
    p?.dispose();
    scope.cancel();
  };
};

export default mount;
