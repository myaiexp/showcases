// InertiaPlugin: toss a box (Draggable inertia: true) and let it glide to rest on a grid cell
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Draggable, InertiaPlugin);

const CELL = 60;
const COLS = 4;
const ROWS = 3;

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  stage.style.width = `${CELL * COLS}px`;
  stage.style.height = `${CELL * ROWS}px`;
  stage.style.backgroundSize = `${CELL}px ${CELL}px`;
  const box = document.createElement('div');
  box.className = 'box';
  box.textContent = preview ? '' : 'throw';
  stage.append(box);
  el.append(stage);

  const maxX = CELL * (COLS - 1);
  const maxY = CELL * (ROWS - 1);
  const cell = (v: number): number => Math.round(v / CELL) * CELL;

  let snapOn = true;
  let drags: Draggable[] = [];
  const readout = document.createElement('p');
  readout.className = 'readout';
  readout.textContent = 'Flick the box. With snap on it always lands on a grid cell.';

  let timer = 0;
  let tossTween: gsap.core.Tween | undefined;
  const ctx = gsap.context((self) => {
    if (preview) {
      // Same kind of tween Draggable makes on release, fed a random velocity each time
      // Point the velocity inward when the box sits at an edge, so a toss never has zero length.
      const velocity = (pos: number, max: number): number => {
        const dir = pos <= 0 ? 1 : pos >= max ? -1 : Math.random() < 0.5 ? -1 : 1;
        return dir * (300 + Math.random() * 900);
      };
      // Each toss is a new tween, so it is kept out of the context (which would hold every
      // one until unmount) and tracked by handle instead.
      const toss = (): void => {
        const x = Number(gsap.getProperty(box, 'x'));
        const y = Number(gsap.getProperty(box, 'y'));
        tossTween = gsap.to(box, {
          overwrite: true, // a new toss replaces one still running
          inertia: {
            x: { velocity: velocity(x, maxX), min: 0, max: maxX, end: cell },
            y: { velocity: velocity(y, maxY), min: 0, max: maxY, end: cell },
          },
        });
      };
      self.ignore(toss);
      timer = window.setInterval(() => self.ignore(toss), 2200);
      return;
    }
    drags = Draggable.create(box, {
      type: 'x,y',
      bounds: stage,
      inertia: true,
      // Called when the pointer is released, with the natural landing value
      snap: {
        x: (v: number) => (snapOn ? cell(v) : v),
        y: (v: number) => (snapOn ? cell(v) : v),
      },
      onThrowComplete() {
        readout.textContent = `landed at x ${Math.round(this.x)}, y ${Math.round(this.y)}`;
      },
    });
  }, el);

  if (!preview) {
    const label = document.createElement('label');
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = true;
    check.addEventListener('change', () => (snapOn = check.checked));
    label.append(check, ' Snap end position to grid');
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.append(label, readout);
    el.append(controls);
  }

  return () => {
    window.clearInterval(timer);
    tossTween?.kill();
    for (const d of drags) d.kill();
    ctx.revert();
  };
};

export default mount;
