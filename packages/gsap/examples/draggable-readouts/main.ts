// Draggable instance readouts: position, delta, pointer, start, end, bounds, press/throw state, direction and tween
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// InertiaPlugin: inertia: true (isThrowing, endX, tween) and getDirection("velocity") need it
gsap.registerPlugin(Draggable, InertiaPlugin);

const mount: Mount = (el, { preview }) => {
  const arena = h('div', preview ? 'arena small' : 'arena', '', el);
  const box = h('div', 'box', '', arena);
  box.id = 'readouts-box';

  const cells = new Map<string, HTMLElement>();
  if (preview) {
    // two live values are enough for a card
    const strip = h('p', 'strip', '', el);
    cells.set('x', h('span', '', '', strip));
    cells.set('y', h('span', '', '', strip));
  } else {
    const grid = h('dl', 'grid', '', el);
    for (const key of [
      'x', 'y', 'deltaX', 'deltaY', 'pointerX', 'pointerY', 'startX', 'startY', 'endX', 'endY',
      'minX', 'maxX', 'minY', 'maxY', 'isPressed', 'isThrowing', 'getDirection("start")',
      'getDirection("velocity")', 'Draggable.timeSinceDrag()', 'pointerEvent.type', 'target.id', 'tween.duration()',
    ]) {
      h('dt', '', key, grid);
      cells.set(key, h('dd', '', '', grid));
    }
  }

  const drag = Draggable.create(box, {
    type: 'x,y',
    bounds: arena,
    inertia: true,
  })[0]!;

  const n = (v: number): string => String(Math.round(v * 10) / 10);
  const put = (key: string, text: string): void => {
    const c = cells.get(key);
    if (c && c.textContent !== text) c.textContent = text;
  };
  // Every frame, read the instance. A ticker listener is not a tween, so nothing accumulates.
  const read = (): void => {
    put('x', preview ? `x ${n(drag.x)}` : n(drag.x));
    put('y', preview ? `y ${n(drag.y)}` : n(drag.y));
    if (preview) return;
    put('deltaX', n(drag.deltaX));
    put('deltaY', n(drag.deltaY));
    put('pointerX', n(drag.pointerX));
    put('pointerY', n(drag.pointerY));
    put('startX', n(drag.startX));
    put('startY', n(drag.startY));
    put('endX', n(drag.endX));
    put('endY', n(drag.endY));
    put('minX', n(drag.minX));
    put('maxX', n(drag.maxX));
    put('minY', n(drag.minY));
    put('maxY', n(drag.maxY));
    put('isPressed', String(drag.isPressed));
    put('isThrowing', String(drag.isThrowing));
    put('getDirection("start")', drag.getDirection('start') ?? '');
    put('getDirection("velocity")', drag.getDirection('velocity') ?? '');
    put('Draggable.timeSinceDrag()', `${Draggable.timeSinceDrag().toFixed(1)} s`);
    put('pointerEvent.type', drag.pointerEvent?.type ?? 'none yet');
    put('target.id', drag.target.id);
    put('tween.duration()', drag.tween ? `${drag.tween.duration().toFixed(2)} s` : 'no throw yet');
  };
  gsap.ticker.add(read);

  const ctx = gsap.context(() => {
    if (preview) {
      // No pointer in a card: move the element with a tween and call update() so the Draggable re-reads x and y.
      gsap.to(box, {
        x: () => arena.clientWidth - 40,
        y: () => arena.clientHeight - 40,
        duration: 2.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        onUpdate: () => drag.update(),
      });
    }
  }, el);
  if (!preview) {
    h('p', 'note', 'Drag and flick the box. Everything on the right is read from the Draggable instance on every frame.', el);
  }

  return () => {
    gsap.ticker.remove(read);
    drag.kill();
    ctx.revert();
  };
};

export default mount;
