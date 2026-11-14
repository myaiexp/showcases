// A floating video window you throw: momentum off, then animate() glides it to the nearest corner
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="page${preview ? '' : ' big'}">
      <div class="lines"><i></i><i></i><i></i><i></i><i></i></div>
      <b class="ghost tl"></b><b class="ghost tr"></b><b class="ghost bl"></b><b class="ghost br"></b>
      <div class="pip"><span>LIVE</span></div>
    </div>`;
  const page = el.querySelector<HTMLElement>('.page')!;
  const pip = el.querySelector<HTMLElement>('.pip')!;
  const M = 8;
  let throwIt = true;

  const corner = (cx: number, cy: number): { x: number; y: number } => ({
    x: cx < page.clientWidth / 2 ? M : page.clientWidth - pip.offsetWidth - M,
    y: cy < page.clientHeight / 2 ? M : page.clientHeight - pip.offsetHeight - M,
  });
  const home = (x: number, y: number, instant = false): void => {
    animate(pip, { x, y }, instant ? { duration: 0 } : { type: 'spring', bounce: 0.25, visualDuration: 0.45 });
  };

  const scope = scopeMotion(el, ({ bind }) => {
    home(page.clientWidth - pip.offsetWidth - M, page.clientHeight - pip.offsetHeight - M, true);
    drag(pip, {
      constraints: page,
      elastic: 0.2,
      momentum: false, // animate() takes over on release, so no inertia fights it
      onEnd: bind((_e, info) => {
        const a = page.getBoundingClientRect();
        const b = pip.getBoundingClientRect();
        // Aim where the throw would land: the position plus a fraction of the release velocity.
        const k = throwIt ? 0.2 : 0;
        const c = corner(b.left - a.left + b.width / 2 + info.velocity.x * k, b.top - a.top + b.height / 2 + info.velocity.y * k);
        home(c.x, c.y);
      }),
    });
  });

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Drag or flick the video window. It glides to the nearest corner; with "use throw speed" on, a quick flick can carry it to a farther one.');
    p = panel(el);
    p.toggle('use throw speed', true, (v) => (throwIt = v));
  } else {
    let i = 0;
    const spots = [[0.2, 0.25], [0.75, 0.3], [0.7, 0.8], [0.25, 0.75]] as const;
    loopGesture(el, signal, async (g) => {
      const [fx, fy] = spots[i++ % spots.length]!;
      const from = at(el, pip);
      const box = page.getBoundingClientRect();
      const f = el.getBoundingClientRect();
      await g.drag(pip, from, { x: box.left - f.left + box.width * fx, y: box.top - f.top + box.height * fy }, 0.6);
      await g.wait(0.6);
    }, 0.4);
  }

  return () => {
    p?.dispose();
    scope.cancel();
  };
};

export default mount;
