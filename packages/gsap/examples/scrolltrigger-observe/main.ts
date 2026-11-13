// ScrollTrigger.observe: wheel, touch and pointer gestures steer a puck, with no Observer import
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Mount } from '@/types.ts';
import { h } from '../../shared/ui.ts';
import './style.css';

// Only ScrollTrigger is registered: observe() is how it exposes Observer.create().
gsap.registerPlugin(ScrollTrigger);

const ARROWS = { up: '▲', down: '▼', left: '◀', right: '▶' } as const;
type Dir = keyof typeof ARROWS;

const mount: Mount = (el, { preview }) => {
  const wrap = h('div', preview ? 'wrap pv' : 'wrap', '', el);
  const arena = h('div', 'arena', '', wrap);
  const puck = h('div', 'puck', '', arena);
  const pad = h('div', 'pad', '', arena);
  const arrows = Object.fromEntries(
    (Object.keys(ARROWS) as Dir[]).map((d) => [d, h('span', `arrow ${d}`, ARROWS[d], pad)]),
  ) as Record<Dir, HTMLElement>;
  const readout = h('p', 'readout', 'wheel, swipe or drag inside the box', wrap);

  const pos = { x: 0, y: 0 };
  const timers: number[] = [];
  let home: gsap.core.Tween | undefined;
  let observer: ReturnType<typeof ScrollTrigger.observe> | undefined;

  const flash = (d: Dir): void => {
    const a = arrows[d];
    a.classList.add('on');
    window.setTimeout(() => a.classList.remove('on'), 160);
  };

  const ctx = gsap.context(() => {
    const setX = gsap.quickSetter(puck, 'x', 'px');
    const setY = gsap.quickSetter(puck, 'y', 'px');
    const lim = (): { x: number; y: number } => ({
      x: (arena.clientWidth - puck.offsetWidth) / 2,
      y: (arena.clientHeight - puck.offsetHeight) / 2,
    });
    const place = (): void => {
      setX(pos.x);
      setY(pos.y);
    };

    observer = ScrollTrigger.observe({
      target: arena,
      type: 'wheel,touch,pointer',
      onUp: () => flash('up'),
      onDown: () => flash('down'),
      onLeft: () => flash('left'),
      onRight: () => flash('right'),
      onChange: (self) => {
        home?.kill();
        const l = lim();
        pos.x = Math.max(-l.x, Math.min(l.x, pos.x + self.deltaX));
        pos.y = Math.max(-l.y, Math.min(l.y, pos.y + self.deltaY));
        place();
        readout.textContent = `onChange  deltaX ${Math.round(self.deltaX)}  deltaY ${Math.round(self.deltaY)}  velocityY ${Math.round(self.velocityY)} px/s`;
      },
      // Quiet for 0.25s: glide the puck home. A fresh tween per stop, so keep it out of the context.
      onStop: () => {
        ctx.ignore(() => {
          home?.kill();
          home = gsap.to(pos, { x: 0, y: 0, duration: 0.6, ease: 'power2.out', onUpdate: place });
        });
        readout.textContent = 'onStop: changes ceased, puck returns';
      },
      onHover: () => arena.classList.add('hover'),
      onHoverEnd: () => arena.classList.remove('hover'),
    });

    if (preview) {
      // No pointer on a card, so dispatch wheel events at the arena on a timer, as a mouse wheel would.
      const moves: Array<[number, number]> = [[0, 60], [70, 0], [0, -60], [-70, 0]];
      let i = 0;
      timers.push(window.setInterval(() => {
        const [dx, dy] = moves[i++ % moves.length] ?? [0, 0];
        for (let k = 0; k < 4; k++) {
          window.setTimeout(() => arena.dispatchEvent(new WheelEvent('wheel', { deltaX: dx / 4, deltaY: dy / 4, bubbles: true })), k * 40);
        }
      }, 1100));
    }
  }, el);

  return () => {
    for (const t of timers) clearInterval(t);
    observer?.kill();
    home?.kill();
    ctx.revert();
  };
};

export default mount;
