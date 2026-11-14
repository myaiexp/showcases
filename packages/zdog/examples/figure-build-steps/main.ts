// Figure build steps: a character modelled one part at a time, head to arms
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
const GOLD = '#EA0';
const PURPLE = '#a35ac9';
const EYE = '#4a1f66';

const STEPS = [
  ['Head', 'new Zdog.Shape({ addTo: illo, stroke: 12 })  // no path: a dot, so a ball'],
  ['Face', 'new Zdog.Ellipse({ addTo: head, quarters: 2, backface: false })  // eyes and smile'],
  ['Hips, chest, head', 'chest.addTo = hips;  head.addTo = chest  // upper body hangs off the hips'],
  ['Legs and feet', 'leg.copyGraph({ translate: { x: hipX } })  // copy the leg with its foot'],
  ['Arms', 'upperArm > forearm > hand, then upperArm.copyGraph(...)'],
  ['Kicking legs', 'leg.rotate = { x: TAU/4 };  standLeg = leg.copy({ rotate: { x: -TAU/8 } })'],
  ['Spine', 'spine = new Zdog.Anchor({ addTo: hips, rotate: { x: TAU/8 } })  // chest goes on spine'],
  ['Arms swung', 'upperArm.rotate = { x: -TAU/4 };  forearm.rotate = { x: TAU/8 }'],
] as const;

function face(head: Zdog.Shape): void {
  const eye = new Zdog.Ellipse({
    addTo: head, diameter: 2, quarters: 2, translate: { x: -2, y: 1, z: 4.5 },
    rotate: { z: -TAU / 4 }, color: EYE, stroke: 0.5, backface: false,
  });
  eye.copy({ translate: { x: 2, y: 1, z: 4.5 } });
  new Zdog.Ellipse({
    addTo: head, diameter: 3, quarters: 2, translate: { y: 2.5, z: 4.5 },
    rotate: { z: TAU / 4 }, closed: true, color: '#FDB', stroke: 0.5, fill: true, backface: false,
  });
}

/** Builds the figure as the tutorial has it after `step` (0-based) parts were added. */
function build(addTo: Zdog.Anchor, step: number): void {
  const root = new Zdog.Anchor({ addTo, translate: { y: step >= 5 ? 2 : 0 } });
  if (step < 2) {
    const head = new Zdog.Shape({ addTo: root, stroke: 12, color: GOLD });
    if (step === 1) face(head);
    return;
  }
  const hipX = 3;
  const hips = new Zdog.Shape({ addTo: root, path: [{ x: -hipX }, { x: hipX }], stroke: 4, color: PURPLE });
  const spine = new Zdog.Anchor({ addTo: hips, rotate: { x: step >= 6 ? TAU / 8 : 0 } });
  const chest = new Zdog.Shape({
    addTo: spine, path: [{ x: -1.5 }, { x: 1.5 }], translate: { y: -6.5 }, stroke: 9, color: '#C25',
  });
  face(new Zdog.Shape({ addTo: chest, stroke: 12, translate: { y: -9.5 }, color: GOLD }));

  if (step >= 3) {
    const leg = new Zdog.Shape({
      addTo: hips, path: [{ y: 0 }, { y: 12 }], translate: { x: -hipX },
      rotate: { x: step >= 5 ? TAU / 4 : 0 }, color: PURPLE, stroke: 4,
    });
    const foot = new Zdog.RoundedRect({
      addTo: leg, width: 2, height: 4, cornerRadius: 1, translate: { y: 14, z: 2 },
      rotate: { x: TAU / 4 }, color: '#C25', fill: true, stroke: 4,
    });
    if (step < 5) {
      leg.copyGraph({ translate: { x: hipX } });
    } else {
      const standLeg = leg.copy({ translate: { x: hipX }, rotate: { x: -TAU / 8 } });
      foot.copy({ addTo: standLeg, rotate: { x: -TAU / 8 } });
    }
  }

  if (step >= 4) {
    const swung = step >= 7;
    const armSize = 6;
    const upperArm = new Zdog.Shape({
      addTo: chest, path: [{ y: 0 }, { y: armSize }], translate: { x: -5, y: -2 },
      rotate: { x: swung ? -TAU / 4 : 0 }, color: PURPLE, stroke: 4,
    });
    const forearm = new Zdog.Shape({
      addTo: upperArm, path: [{ y: 0 }, { y: armSize }], translate: { y: armSize },
      rotate: { x: swung ? TAU / 8 : 0 }, color: GOLD, stroke: 4,
    });
    new Zdog.Shape({ addTo: forearm, translate: { y: armSize, z: 1 }, stroke: 6, color: GOLD });
    upperArm.copyGraph({ translate: { x: 5, y: -2 }, rotate: { x: swung ? TAU / 4 : 0 } });
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look around. Step through the tutorial.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 5,
    dragRotate: true,
  });

  let step = stage.preview ? 0 : STEPS.length - 1;
  let world: Zdog.Anchor;
  const show = (n: number): void => {
    step = (n + STEPS.length) % STEPS.length;
    world?.remove();
    world = new Zdog.Anchor({ addTo: illo });
    build(world, step);
    illo.zoom = stage.zoom * (step < 2 ? 9 : 4.8);
    if (!stage.preview) {
      illo.rotate.y = step >= 5 ? -TAU / 8 : 0;
      illo.rotate.x = 0;
    }
    if (caption) caption.textContent = `${step + 1} / ${STEPS.length}  ${STEPS[step]![0]}\n${STEPS[step]![1]}`;
  };

  let caption: HTMLElement | null = null;
  if (stage.bar) {
    button(stage.bar, 'previous', () => show(step - 1));
    button(stage.bar, 'next', () => show(step + 1));
    caption = readout(stage.bar);
  } else {
    stage.every(1500, () => show(step + 1));
  }
  show(step);

  stage.loop((_dt, t) => {
    if (stage.preview) illo.rotate.y = -TAU / 8 + 0.4 * Math.sin(t * 0.9);
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
