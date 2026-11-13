// Draggable: "x,y" inside a container, "x" on one axis, and "rotation" limited to 0-270 degrees
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Draggable);

const mount: Mount = (el, { preview }) => {
  const row = document.createElement('div');
  row.className = 'row';

  const panel = (label: string, cls: string): { area: HTMLElement; knob: HTMLElement; out: HTMLElement } => {
    const wrap = document.createElement('div');
    wrap.className = 'panel';
    const area = document.createElement('div');
    area.className = `area ${cls}`;
    const knob = document.createElement('div');
    knob.className = 'knob';
    area.append(knob);
    const out = document.createElement('p');
    out.className = 'out';
    out.textContent = label;
    wrap.append(area, out);
    if (preview) out.hidden = true;
    row.append(wrap);
    return { area, knob, out };
  };

  const free = panel('type "x,y" + bounds element', 'free');
  const axis = panel('type "x"', 'axis');
  const dial = panel('type "rotation", 0 to 270', 'dial');
  dial.knob.textContent = '▲';
  el.append(row);

  const drags: Draggable[] = [];
  const ctx = gsap.context(() => {
    if (preview) {
      // No pointer in a card: tween the same properties a drag would change
      const maxX = (a: HTMLElement): number => a.clientWidth - 36;
      gsap.to(free.knob, { x: maxX(free.area), y: free.area.clientHeight - 36, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(axis.knob, { x: maxX(axis.area), duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(dial.knob, { rotation: 270, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      return;
    }
    drags.push(
      ...Draggable.create(free.knob, {
        type: 'x,y',
        bounds: free.area,
        onDrag() {
          free.out.textContent = `x ${Math.round(this.x)}, y ${Math.round(this.y)} (bounds: the box)`;
        },
      }),
      ...Draggable.create(axis.knob, {
        type: 'x',
        bounds: axis.area,
        onDrag() {
          axis.out.textContent = `x ${Math.round(this.x)} (y never changes)`;
        },
      }),
      ...Draggable.create(dial.knob, {
        type: 'rotation',
        bounds: { minRotation: 0, maxRotation: 270 },
        onDrag() {
          dial.out.textContent = `rotation ${Math.round(this.rotation)} deg (stops at 0 and 270)`;
        },
      }),
    );
  }, el);

  return () => {
    // Draggables are not documented as reverted by a context, so kill them explicitly
    for (const d of drags) d.kill();
    ctx.revert();
  };
};

export default mount;
