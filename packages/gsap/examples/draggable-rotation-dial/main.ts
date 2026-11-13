// Draggable type "rotation": a dial with minRotation/maxRotation bounds, inertia, a snap and the predicted endRotation
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { check, h } from '../../shared/ui.ts';
import type { Mount } from '@/types.ts';
import './style.css';

// inertia: true needs InertiaPlugin for the flick momentum
gsap.registerPlugin(Draggable, InertiaPlugin);

const LIMIT = 135;

const mount: Mount = (el, { preview }) => {
  const stage = h('div', preview ? 'stage small' : 'stage', '', el);
  const ring = h('div', 'ring', '', stage);
  const ghost = h('div', 'ghost', '', ring); // marks the predicted endRotation
  const dial = h('div', 'dial', '', stage);
  h('div', 'needle', '', dial);
  const out = h('p', 'readout', 'rotation 0', el);

  const cfg = { bounds: true, inertia: true, snap: true };
  let drag: Draggable | undefined;

  const make = (): void => {
    drag?.kill();
    ghost.style.opacity = '0';
    drag = Draggable.create(dial, {
      type: 'rotation',
      // minRotation and maxRotation: where the dial may go
      bounds: cfg.bounds ? { minRotation: -LIMIT, maxRotation: LIMIT } : undefined,
      inertia: cfg.inertia,
      // the landing value after a release: whole 30 degree steps
      snap: cfg.snap ? (v: number) => Math.round(v / 30) * 30 : undefined,
      onPress() {
        ghost.style.opacity = '0';
      },
      onDrag() {
        out.textContent = `rotation ${Math.round(this.rotation)}, change ${this.deltaX.toFixed(1)}, limits ${cfg.bounds ? `${this.minRotation} to ${this.maxRotation}` : 'none'}`;
      },
      onDragEnd() {
        // endRotation is known as soon as the pointer is released, before the throw finishes
        ghost.style.transform = `rotate(${this.endRotation}deg)`;
        ghost.style.opacity = '1';
        out.textContent = `released at ${Math.round(this.rotation)}, will land at endRotation ${Math.round(this.endRotation)}`;
      },
      onThrowUpdate() {
        out.textContent = `rotation ${Math.round(this.rotation)} (landing at ${Math.round(this.endRotation)})`;
      },
    })[0];
  };

  const ctx = gsap.context(() => {
    if (preview) {
      const d = { v: 0 };
      gsap.to(dial, { rotation: LIMIT, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true, onUpdate() {
        // read the angle back from the element's transform without creating tweens
        d.v = Number(gsap.getProperty(dial, 'rotation'));
        out.textContent = `rotation ${Math.round(d.v)}`;
      } });
      gsap.set(dial, { rotation: -LIMIT });
    }
  }, el);

  if (!preview) {
    const bar = h('div', 'controls', '', el);
    const opt = (label: string, key: keyof typeof cfg): void => {
      const c = check(label, (on) => { cfg[key] = on; make(); }, bar);
      c.checked = cfg[key];
    };
    opt('bounds: minRotation -135, maxRotation 135', 'bounds');
    opt('inertia: true', 'inertia');
    opt('snap to 30 degrees', 'snap');
    h('p', 'note', 'Spin the dial and let go. The dashed marker shows endRotation: where an inertia throw will come to rest, known at the moment of release.', el);
    make();
  }

  return () => {
    drag?.kill();
    ctx.revert();
  };
};

export default mount;
