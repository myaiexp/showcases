// Observer properties read live: x, y, startX, startY, deltaX, deltaY, velocity, isPressed, isDragging, event and more
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import './style.css';

gsap.registerPlugin(Observer);

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const arena = h('div', 'arena', preview ? 'wheel' : 'wheel, drag or move the pointer here', wrap);
  const dot = h('div', 'dot', '', arena);
  const readout = h('pre', 'readout', '', wrap);

  let last = 'none yet';
  let ended = 0; // times onDragEnd fired
  const timers: number[] = [];

  const cleanups: Array<() => void> = [];
  const ctx = gsap.context(() => {
    const setX = gsap.quickSetter(dot, 'x', 'px');
    const setY = gsap.quickSetter(dot, 'y', 'px');
    const acc = { x: 0, y: 0 };
    const called = (name: string) => (): void => { last = name; };
    const obs = Observer.create({
      target: arena,
      type: 'wheel,touch,pointer',
      dragMinimum: 6, // a press must travel 6px before it counts as a drag
      onChange: (self) => {
        last = 'onChange';
        // Wheel-only input has no pointer position, so nudge the dot by the deltas instead.
        acc.x = Math.max(-100, Math.min(100, acc.x + self.deltaX));
        acc.y = Math.max(-50, Math.min(50, acc.y + self.deltaY));
      },
      onMove: called('onMove'), // defining onMove makes deltas track while hovering, not only while pressed
      onPress: called('onPress'),
      onRelease: called('onRelease'),
      onDragStart: called('onDragStart'),
      onDragEnd: () => { ended++; last = 'onDragEnd'; },
    });

    const text = (v: number): string => String(Math.round(v)).padStart(4);
    const show = (): void => {
      const box = arena.getBoundingClientRect();
      // x, y, startX and startY are typed optional in the .d.ts, so default them to 0.
      const px = obs.x ?? 0;
      const py = obs.y ?? 0;
      const pointer = px !== 0 || py !== 0;
      setX(pointer ? px - box.left - box.width / 2 : acc.x);
      setY(pointer ? py - box.top - box.height / 2 : acc.y);
      const lines = [
        `x ${text(px)}  y ${text(py)}   deltaX ${text(obs.deltaX)}  deltaY ${text(obs.deltaY)}`,
        `velocityX ${text(obs.velocityX)}  velocityY ${text(obs.velocityY)} px/s`,
        `isPressed ${obs.isPressed}  isDragging ${obs.isDragging}  isEnabled ${obs.isEnabled}`,
      ];
      if (!preview) {
        lines.push(
          `startX ${text(obs.startX ?? 0)}  startY ${text(obs.startY ?? 0)}   drags ended ${ended}`,
          `event.type "${obs.event?.type ?? '-'}"   last callback ${last}`,
          `target.className "${obs.target.className}"   vars.type "${String(obs.vars.type)}"   Observer.isTouch ${Observer.isTouch}`,
        );
      }
      readout.textContent = lines.join('\n');
    };
    gsap.ticker.add(show);
    cleanups.push(() => gsap.ticker.remove(show), () => obs.kill());

    if (preview) {
      // Wheel events dispatched at the arena stand in for a hand on the wheel.
      const moves: Array<[number, number]> = [[0, 90], [100, 0], [0, -90], [-100, 0]];
      let i = 0;
      timers.push(window.setInterval(() => {
        const [dx, dy] = moves[i++ % moves.length] ?? [0, 0];
        for (let k = 0; k < 5; k++) {
          timers.push(window.setTimeout(() => arena.dispatchEvent(new WheelEvent('wheel', { deltaX: dx / 5, deltaY: dy / 5, clientX: 100, clientY: 60, bubbles: true })), k * 35));
        }
      }, 1200));
    }
  }, el);

  return () => {
    for (const t of timers) { clearInterval(t); clearTimeout(t); }
    for (const c of cleanups) c();
    ctx.revert();
  };
};

export default mount;
