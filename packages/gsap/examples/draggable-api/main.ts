// Draggable instance methods: startDrag/endDrag from a pad, update, applyBounds, enable/disable/enabled, Draggable.get, addEventListener
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { btn, h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Draggable);

const SMALL = { minX: 70, maxX: 190, minY: 30, maxY: 90 };

const mount: Mount = (el, { preview }) => {
  const arena = h('div', preview ? 'arena small' : 'arena', '', el);
  const zone = h('div', 'zone', '', arena); // draws the bounds currently applied
  const box = h('div', 'box', preview ? '' : 'box', arena);
  box.id = 'draggable-api-box';
  const state = h('p', 'state', '', el);

  const drag = Draggable.create(box, { type: 'x,y', bounds: arena })[0]!;
  let small = false;
  let timer = 0;
  const cleanups: Array<() => void> = [];

  const showState = (): void => {
    state.textContent = `enabled() ${drag.enabled()}   Draggable x ${Math.round(drag.x)}, y ${Math.round(drag.y)}`;
  };

  const ctx = gsap.context(() => {
    if (preview) {
      // the box travels by tween; update() keeps the Draggable's x and y in step
      gsap.to(box, { x: () => arena.clientWidth - 40, y: () => arena.clientHeight - 40, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate: () => { drag.update(); showState(); } });
      // flip enabled() on a timer: a disabled Draggable cannot be dragged
      timer = window.setInterval(() => {
        drag.enabled(!drag.enabled());
        box.classList.toggle('off', !drag.enabled());
      }, 1500);
    }
  }, el);

  if (!preview) {
    const log = h('pre', 'log', '', el);
    const lines: string[] = [];
    const say = (msg: string): void => {
      lines.push(msg);
      if (lines.length > 8) lines.shift();
      log.textContent = lines.join('\n');
    };
    // addEventListener: one callback per event type; `this` is the dragged element
    const events = ['press', 'dragstart', 'dragend', 'release', 'click'] as const;
    for (const type of events) {
      const fn = (): void => say(`event: ${type}`);
      drag.addEventListener(type, fn);
      cleanups.push(() => drag.removeEventListener(type, fn));
    }

    // startDrag / endDrag: press the pad and the box begins dragging as if it had been pressed.
    const pad = h('div', 'pad', 'press and drag here to grab the box (startDrag)', el);
    let up: ((ev: PointerEvent) => void) | undefined;
    const onDown = (e: PointerEvent): void => {
      drag.startDrag(e, true); // true: move the box under the pointer first
      up = (ev: PointerEvent): void => {
        drag.endDrag(ev);
        window.removeEventListener('pointerup', up!);
        up = undefined;
      };
      window.addEventListener('pointerup', up);
      say('startDrag(event, true) from the pad');
    };
    cleanups.push(() => up && window.removeEventListener('pointerup', up));
    pad.addEventListener('pointerdown', onDown);
    cleanups.push(() => pad.removeEventListener('pointerdown', onDown));

    const bar = h('div', 'controls', '', el);
    btn('enable() / disable()', () => {
      if (drag.enabled()) drag.disable();
      else drag.enable();
      box.classList.toggle('off', !drag.enabled());
      say(`enabled() is now ${drag.enabled()}`);
    }, bar);
    btn('applyBounds: small / arena', () => {
      small = !small;
      drag.applyBounds(small ? SMALL : arena);
      zone.style.cssText = small ? `left:${SMALL.minX}px;top:${SMALL.minY}px;width:${SMALL.maxX - SMALL.minX + 40}px;height:${SMALL.maxY - SMALL.minY + 40}px` : '';
      zone.classList.toggle('on', small);
      say(small ? 'applyBounds({ minX, maxX, minY, maxY })' : 'applyBounds(arena)');
    }, bar);
    btn('Tween to corner (no update)', () => ctx.add(() => {
      gsap.to(box, { x: 260, y: 100, duration: 0.8 });
      say('tweened without update(): Draggable x is stale');
    }), bar);
    btn('Tween to corner + update()', () => ctx.add(() => {
      gsap.to(box, { x: 20, y: 20, duration: 0.8, onUpdate: () => drag.update() });
      say('tweened with onUpdate: drag.update()');
    }), bar);
    btn('Draggable.get(box)', () => say(`Draggable.get(box) === instance: ${Draggable.get(box) === drag}`), bar);
    gsap.ticker.add(showState);
    cleanups.push(() => gsap.ticker.remove(showState));
  }
  showState();

  return () => {
    window.clearInterval(timer);
    for (const fn of cleanups) fn();
    drag.kill();
    ctx.revert();
  };
};

export default mount;
