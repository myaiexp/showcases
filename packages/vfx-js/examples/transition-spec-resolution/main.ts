// run options over container options, and what params the class gets
import { Glitch, Swipe } from '@vfx-js/transitions';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { DEFAULT_SLIDES } from '../../shared/slides.ts';
import { trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, vfx, box } = await trKit(el, ctx);
  let ctor = '';
  // Probes: the same classes, but they report the params core hands the constructor.
  class ProbeGlitch extends Glitch {
    constructor(params?: ConstructorParameters<typeof Glitch>[0]) {
      super(params);
      ctor = `new Glitch(${JSON.stringify(params ?? {})})`;
    }
  }
  class ProbeSwipe extends Swipe {
    constructor(params?: ConstructorParameters<typeof Swipe>[0]) {
      super(params);
      ctor = `new Swipe(${JSON.stringify(params ?? {})})`;
    }
  }
  const t = vfx.addTransition(box, { transition: ProbeGlitch, params: { amount: 2, speed: 1 }, duration: 0.9 });

  const CASES = [
    { label: 'show(i)', opts: () => ({}) },
    { label: 'show(i, { params: { speed: 3 } })', opts: () => ({ params: { speed: 3 } }) },
    { label: 'show(i, { transition: Swipe })', opts: () => ({ transition: ProbeSwipe }) },
    { label: 'show(i, { transition: Glitch, params: { speed: 3 } })', opts: () => ({ transition: ProbeGlitch, params: { speed: 3 } }) },
    { label: 'show(i, { duration: 0.3 })', opts: () => ({ duration: 0.3 }) },
  ];
  let i = 0;
  const go = (c: (typeof CASES)[number]): void => {
    i = (i + 1) % DEFAULT_SLIDES.length;
    ctor = 'constructor not called: the instance is reused';
    void t.show(i, c.opts());
    // For a static spec the transition is bound before show() returns.
    stage.say(`${c.label}: ${ctor}`);
  };

  stage.say("container: Glitch, params { amount: 2, speed: 1 }, duration 0.9 s");
  if (stage.bar) {
    for (const c of CASES) button(stage.bar, c.label, () => go(c));
  } else {
    let n = 0;
    stage.every(2600, () => go(CASES[n++ % CASES.length]!));
  }
  return () => stage.dispose();
};

export default mount;
