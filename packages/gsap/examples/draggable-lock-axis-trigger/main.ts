// Draggable: windows dragged by a title-bar trigger, one with lockAxis and lockedAxis, one that never rises (zIndexBoost)
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Draggable);

interface Win {
  root: HTMLElement;
  bar: HTMLElement;
  body: HTMLElement;
}

const mount: Mount = (el, { preview }) => {
  const arena = h('div', preview ? 'arena small' : 'arena');
  const win = (cls: string, title: string, left: number, top: number, text: string): Win => {
    const root = h('div', `win ${cls}`, '', arena);
    root.style.left = `${left}px`;
    root.style.top = `${top}px`;
    const bar = h('div', 'bar', title, root);
    const body = h('div', 'body', preview ? '' : text, root);
    return { root, bar, body };
  };
  const free = win('a', 'free (trigger)', 10, 14, 'Only the title bar starts a drag.');
  const lock = win('b', 'lockAxis', preview ? 70 : 110, preview ? 40 : 60, 'lockedAxis: none yet');
  const still = win('c', 'zIndexBoost: false', preview ? 130 : 220, 18, 'Stays below the others when pressed.');
  el.append(arena);
  if (!preview) {
    h('p', 'note', 'Press a window by its title bar. The lockAxis window locks to the first direction you drag more than 2px, and onLockAxis reports the axis. Draggable.zIndex sets where stacking starts: newly pressed windows rise unless zIndexBoost is false.', el);
  }

  const drags: Draggable[] = [];
  // Draggable.zIndex is static and global: set it low for this arena and restore it on cleanup.
  const prevZ = Draggable.zIndex;
  Draggable.zIndex = 10;

  const ctx = gsap.context(() => {
    if (preview) {
      const w = arena.clientWidth;
      gsap.to(free.root, { x: w - 110, y: 30, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true });
      // the lockAxis window moves one axis at a time, like a locked drag would
      gsap.timeline({ repeat: -1 }).to(lock.root, { x: 70, duration: 1 }).to(lock.root, { y: 30, duration: 0.8 }).to(lock.root, { x: 0, duration: 1 }).to(lock.root, { y: 0, duration: 0.8 });
      return;
    }
    drags.push(
      ...Draggable.create(free.root, { type: 'x,y', trigger: free.bar, bounds: arena }),
      ...Draggable.create(lock.root, {
        type: 'x,y',
        trigger: lock.bar,
        lockAxis: true,
        bounds: arena,
        onLockAxis() {
          // lockedAxis is documented but missing from gsap's .d.ts, hence this narrow cast.
          // It is the axis that can NOT move: "y" means the drag went horizontal.
          const axis = (this as unknown as { lockedAxis: string }).lockedAxis;
          lock.body.textContent = `lockedAxis: "${axis}" (moves along ${axis === 'y' ? 'x' : 'y'})`;
        },
        onRelease() {
          lock.body.textContent = 'lockedAxis: reset on next press';
        },
      }),
      ...Draggable.create(still.root, { type: 'x,y', trigger: still.bar, bounds: arena, zIndexBoost: false }),
    );
  }, el);

  return () => {
    for (const d of drags) d.kill();
    Draggable.zIndex = prevZ;
    ctx.revert();
  };
};

export default mount;
