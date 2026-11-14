// A drag inspector: every number the onStart / onMove / onEnd info object carries, live
import { drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

interface Info {
  point: { x: number; y: number };
  delta: { x: number; y: number };
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="lab${preview ? '' : ' big'}">
      <svg><line class="off" /><line class="vel" /></svg>
      <div class="ball"></div>
      <pre class="table"></pre>
    </div>`;
  const lab = el.querySelector<HTMLElement>('.lab')!;
  const ball = el.querySelector<HTMLElement>('.ball')!;
  const table = el.querySelector<HTMLElement>('.table')!;
  const off = el.querySelector<SVGLineElement>('.off')!;
  const vel = el.querySelector<SVGLineElement>('.vel')!;
  if (!preview) hint(el, 'Drag and flick the ball. The white line is info.offset from where you grabbed it; the orange one is info.velocity.');

  const f = (n: number): string => String(Math.round(n)).padStart(5);
  const row = (name: string, p: { x: number; y: number }): string => `${name.padEnd(9)}x ${f(p.x)}  y ${f(p.y)}`;
  let state = 'idle';
  const show = (info?: Info): void => {
    table.textContent = [
      `state    ${state}`,
      ...(info ? [row('point', info.point), row('delta', info.delta), row('offset', info.offset), row('velocity', info.velocity)] : []),
    ].join('\n');
  };
  const line = (l: SVGLineElement, x1: number, y1: number, x2: number, y2: number): void => {
    l.setAttribute('x1', String(x1));
    l.setAttribute('y1', String(y1));
    l.setAttribute('x2', String(x2));
    l.setAttribute('y2', String(y2));
  };
  let start = { x: 0, y: 0 };
  const centre = (): { x: number; y: number } => {
    const a = lab.getBoundingClientRect();
    const b = ball.getBoundingClientRect();
    return { x: b.left - a.left + b.width / 2, y: b.top - a.top + b.height / 2 };
  };
  const draw = (info: Info): void => {
    const c = centre();
    line(off, start.x, start.y, c.x, c.y);
    line(vel, c.x, c.y, c.x + info.velocity.x / 8, c.y + info.velocity.y / 8);
  };

  show();
  const scope = scopeMotion(el, () => {
    drag(ball, {
      constraints: lab,
      elastic: 0.2,
      onStart: (_e, info) => {
        state = 'dragging';
        start = centre();
        show(info);
      },
      onMove: (_e, info) => {
        show(info);
        draw(info);
      },
      onEnd: (_e, info) => {
        state = 'released';
        show(info);
      },
      onTransitionEnd: () => {
        state = 'at rest';
        show();
        line(off, 0, 0, 0, 0);
        line(vel, 0, 0, 0, 0);
      },
    });
  });

  if (preview) {
    loopGesture(el, signal, async (g) => {
      const a = at(el, ball);
      await g.drag(ball, a, { x: a.x + 70, y: a.y - 20 }, 0.7);
      await g.wait(1.4);
    }, 0.2);
  }

  return () => scope.cancel();
};

export default mount;
