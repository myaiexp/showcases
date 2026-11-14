// A pinch inspector: onPinch and onComplete info (point, offset, scale, rotate), and the origin option
import { animate, pinch, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="lab${preview ? '' : ' big'}">
      <div class="card"><b>PINCH</b><i class="cross"></i></div>
      <i class="focal"></i>
      <pre class="read"></pre>
    </div>`;
  const lab = el.querySelector<HTMLElement>('.lab')!;
  const card = el.querySelector<HTMLElement>('.card')!;
  const focal = el.querySelector<HTMLElement>('.focal')!;
  const read = el.querySelector<HTMLElement>('.read')!;

  const f = (n: number, d = 0): string => n.toFixed(d).padStart(7);
  let state = 'idle';
  const show = (i?: { point: { x: number; y: number }; offset: { x: number; y: number }; scale: number; rotate: number }): void => {
    read.textContent = [
      `state   ${state}`,
      ...(i ? [`point  ${f(i.point.x)}${f(i.point.y)}`, `offset ${f(i.offset.x)}${f(i.offset.y)}`, `scale  ${f(i.scale, 2)}`, `rotate ${f(i.rotate, 1)}`] : []),
    ].join('\n');
  };
  show();

  let centred = false;
  let stop: VoidFunction = () => undefined;
  const scope = scopeMotion(el, () => undefined);
  const arm = (): void => {
    stop();
    stop = pinch(
      card,
      () => {
        state = 'pinching';
        return {
          onPinch: (_e, info) => {
            const r = lab.getBoundingClientRect();
            focal.style.opacity = '1';
            focal.style.left = `${info.point.x - r.left}px`;
            focal.style.top = `${info.point.y - r.top}px`;
            show(info);
          },
          onComplete: (_e, info) => {
            state = 'done';
            focal.style.opacity = '0';
            show(info);
            animate(card, { scale: 1, rotate: 0, x: 0, y: 0 }, { type: 'spring', bounce: 0.2, visualDuration: 0.5, delay: 0.6 });
          },
        };
      },
      // origin "pointer" (default) pivots under the fingers; {x:.5,y:.5} pivots on the card's centre.
      { origin: centred ? { x: 0.5, y: 0.5 } : 'pointer', pan: !centred },
    );
  };
  scope.run(arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Pinch or twist the card (desktop: Ctrl + scroll zooms). The white dot is info.point; the numbers update every frame and freeze when you let go.');
    p = panel(el);
    p.toggle('pivot on the card centre', false, (v) => {
      centred = v;
      scope.run(arm);
    });
  } else {
    loopGesture(el, signal, async (g) => {
      const r = card.getBoundingClientRect();
      const fr = el.getBoundingClientRect();
      const c = { x: r.left - fr.left + r.width * 0.6, y: r.top - fr.top + r.height * 0.5 };
      await g.pinch(card, c, { fromGap: 40, toGap: 90, fromAngle: 0, toAngle: 30 }, 0.9);
      await g.wait(1.4);
    }, 0.2);
  }

  return () => {
    stop();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;
