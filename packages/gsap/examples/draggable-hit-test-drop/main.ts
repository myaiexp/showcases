// Draggable.hitTest: highlight a drop zone while a chip overlaps it by 50%, flash it on drop
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import type { Mount } from '@/types.ts';
import './style.css';

gsap.registerPlugin(Draggable);

const THRESHOLD = '50%'; // or a number of pixels; 0 means any overlap

const mount: Mount = (el, { preview }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const zones = ['Zone A', 'Zone B'].map((label) => {
    const z = document.createElement('div');
    z.className = 'zone';
    z.textContent = label;
    stage.append(z);
    return z;
  });
  const chips = ['one', 'two', 'three'].map((label) => {
    const c = document.createElement('div');
    c.className = 'chip';
    c.textContent = label;
    return c;
  });
  const tray = document.createElement('div');
  tray.className = 'tray';
  tray.append(...chips);
  stage.append(tray);
  el.append(stage);

  const readout = document.createElement('p');
  readout.className = 'readout';
  readout.textContent = 'Drag a chip over a zone: it lights up at 50% overlap.';

  const light = (chip: Element): void => {
    for (const zone of zones) zone.classList.toggle('hit', Draggable.hitTest(chip, zone, THRESHOLD));
  };

  let drags: Draggable[] = [];
  const ctx = gsap.context((self) => {
    if (preview) {
      // Slide one chip back and forth across the zones, testing overlap every frame
      const chip = chips[0] as HTMLElement;
      const mid = (r: DOMRect): { x: number; y: number } => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      const from = mid(chip.getBoundingClientRect());
      const a = mid((zones[0] as HTMLElement).getBoundingClientRect());
      const b = mid((zones[1] as HTMLElement).getBoundingClientRect());
      gsap.fromTo(
        chip,
        { x: a.x - from.x, y: a.y - from.y },
        {
          x: b.x - from.x,
          duration: 2,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.4,
          ease: 'sine.inOut',
          onUpdate: () => light(chip),
        },
      );
      return;
    }
    drags = Draggable.create(chips, {
      bounds: stage,
      onDrag() {
        light(this.target);
      },
      onDragEnd() {
        light(this.target);
        zones.forEach((zone, i) => {
          if (!this.hitTest(zone, THRESHOLD)) return;
          readout.textContent = `"${this.target.textContent}" dropped on Zone ${'AB'[i]}`;
          // Draggable callbacks run outside the context, so route the flash through it.
          self.add(() => gsap.fromTo(zone, { opacity: 1 }, { duration: 0.1, opacity: 0.2, repeat: 3, yoyo: true }));
        });
      },
    });
  }, el);

  if (!preview) {
    const reset = document.createElement('button');
    reset.className = 'btn';
    reset.textContent = 'Reset chips';
    reset.addEventListener('click', () => {
      ctx.add(() => gsap.to(chips, { x: 0, y: 0, duration: 0.4 }));
      for (const zone of zones) zone.classList.remove('hit');
    });
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.append(reset, readout);
    el.append(controls);
  }

  return () => {
    for (const d of drags) d.kill();
    ctx.revert();
  };
};

export default mount;
